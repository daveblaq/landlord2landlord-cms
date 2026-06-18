import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import axios, { AxiosError } from "axios";

vi.mock("../utils/storage", () => ({
    getAuthToken: vi.fn().mockResolvedValue(null),
    clearAuthData: vi.fn().mockResolvedValue(undefined),
}));

// Import after vi.mock so the module gets the mocked storage
import apiClient, { serializeParams } from "./client";
import { clearAuthData } from "../utils/storage";
import { API_EVENTS } from "./events";

const mockDispatchEvent = vi.fn();

function make401Error() {
    const err = new AxiosError("Request failed with status code 401", "ERR_BAD_REQUEST");
    err.response = {
        status: 401,
        data: { message: "Unauthorized" },
        headers: {},
        config: { headers: axios.defaults.headers } as any,
        statusText: "Unauthorized",
    };
    return err;
}

describe("apiClient response interceptor", () => {
    let savedAdapter: typeof apiClient.defaults.adapter;

    beforeEach(() => {
        vi.stubGlobal("window", { dispatchEvent: mockDispatchEvent });
        mockDispatchEvent.mockClear();
        vi.mocked(clearAuthData).mockClear().mockResolvedValue(undefined);
        savedAdapter = apiClient.defaults.adapter;
    });

    afterEach(async () => {
        apiClient.defaults.adapter = savedAdapter;
        vi.unstubAllGlobals();
        // Flush pending microtasks so isHandling401 finally-block resets before next test
        await new Promise((r) => setTimeout(r, 0));
    });

    it("clears auth and dispatches auth:expired on 401", async () => {
        apiClient.defaults.adapter = () => Promise.reject(make401Error());

        await apiClient.get("/test").catch(() => {});

        // Wait for clearAuthData().finally() to flush
        await vi.waitFor(() => expect(clearAuthData).toHaveBeenCalledOnce());

        const events = mockDispatchEvent.mock.calls.map((c) => (c[0] as Event).type);
        expect(events).toContain(API_EVENTS.AUTH_EXPIRED);
    });

    it("does not dispatch auth:expired twice for concurrent 401s", async () => {
        apiClient.defaults.adapter = () => Promise.reject(make401Error());

        await Promise.allSettled([
            apiClient.get("/a"),
            apiClient.get("/b"),
        ]);

        await vi.waitFor(() => expect(clearAuthData).toHaveBeenCalledOnce());

        const authExpiredCount = mockDispatchEvent.mock.calls.filter(
            (c) => (c[0] as Event).type === API_EVENTS.AUTH_EXPIRED,
        ).length;
        expect(authExpiredCount).toBe(1);
    });

    it("dispatches api:online on successful response", async () => {
        apiClient.defaults.adapter = () =>
            Promise.resolve({
                status: 200,
                data: {},
                headers: {},
                config: { headers: axios.defaults.headers } as any,
                statusText: "OK",
            });

        await apiClient.get("/test");

        const events = mockDispatchEvent.mock.calls.map((c) => (c[0] as Event).type);
        expect(events).toContain(API_EVENTS.ONLINE);
    });
});

describe("serializeParams", () => {
    it("serializes arrays as repeated params", () => {
        const result = serializeParams({ type: ["Property Enquiry", "Mortgage Lead"] });
        expect(result).toBe("type=Property+Enquiry&type=Mortgage+Lead");
    });

    it("skips undefined, null, and empty string values", () => {
        const result = serializeParams({ a: undefined, b: null, c: "", d: "keep" });
        expect(result).toBe("d=keep");
    });

    it("passes scalar values through as strings", () => {
        const result = serializeParams({ page: 1, limit: 20, status: "New" });
        expect(result).toBe("page=1&limit=20&status=New");
    });

    it("serializes a single-element array as one repeated param", () => {
        const result = serializeParams({ type: ["Mortgage Lead"] });
        expect(result).toBe("type=Mortgage+Lead");
    });
});
