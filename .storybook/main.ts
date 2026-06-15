import type { StorybookConfig } from "@storybook/react-vite";
import path from "path";
import { fileURLToPath } from "url";
import { mergeConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const config: StorybookConfig = {
    stories: [
        "../src/**/*.mdx",
        "../src/components/base/buttons/button.stories.tsx",
        "../src/components/base/badges/badges.stories.tsx",
        "../src/components/base/badges/badge-groups.stories.tsx",
        "../src/components/base/tags/tags.stories.tsx",
        "../src/components/base/toggle/toggle.stories.tsx",
        "../src/components/base/dropdown/dropdown.stories.tsx",
        "../src/components/base/select/select.stories.tsx",
        "../src/components/base/input/input.stories.tsx",
        "../src/components/base/pin-input/pin-input.stories.tsx",
        "../src/components/base/textarea/textarea.stories.tsx",
        "../src/components/base/text-editor/text-editor.stories.tsx",
        "../src/components/base/checkbox/checkbox.stories.tsx",
        "../src/components/base/avatar/avatar.stories.tsx",
        "../src/components/base/tooltip/tooltip.stories.tsx",
        "../src/components/base/radio-buttons/radio-buttons.stories.tsx",
        "../src/components/base/slider/slider.stories.tsx",
        "../src/components/base/progress-indicators/progress-indicators.stories.tsx",
        "../src/components/base/video-player/video-player.stories.tsx",
        "../src/components/base/buttons/social-button.stories.tsx",
        "../src/components/base/buttons/app-store-buttons.stories.tsx",
        "../src/components/base/buttons/button-utility.stories.tsx",
        "../src/components/base/button-group/button-group.stories.tsx",
        "../src/components/application/modals/modal.stories.tsx",
        "../src/components/application/carousel/carousel-base.stories.tsx",
        "../src/components/application/pagination/pagination.stories.tsx",
        "../src/components/application/tabs/tabs.stories.tsx",
        "../src/components/application/empty-state/empty-state.stories.tsx",
        "../src/components/application/file-upload/file-upload.stories.tsx",
        "../src/components/application/table/table.stories.tsx",
        "../src/components/application/loading-indicator/loading-indicator.stories.tsx",
        "../src/components/application/date-picker/date-picker.stories.tsx",
        "../src/components/application/breadcrumbs/breadcrumbs.stories.tsx",
        "../src/components/application/calendar/calendar.stories.tsx",
        "../src/components/application/progress-steps/progress-steps.stories.tsx",
        "../src/components/application/metrics/metrics.stories.tsx",
        "../src/components/application/code-snippet/code-snippet.stories.tsx",
        "../src/components/application/content-divider/content-divider.stories.tsx",
        "../src/components/application/command-menus/command-menu.stories.tsx",
        "../src/components/application/section-headers/section-headers.stories.tsx",
        "../src/components/application/section-footers/section-footer.stories.tsx",
        "../src/components/application/messaging/messaging.stories.tsx",
        "../src/components/application/activity-feed/activity-feed.stories.tsx",
        "../src/components/application/slideout-menus/slideout-menu.stories.tsx",
        "../src/components/application/card-headers/card-headers.stories.tsx",
        "../src/components/application/pie-charts/pie-charts.stories.tsx",
        "../src/components/application/radar-chart/radar-chart.stories.tsx",
        "../src/components/application/line-chart/line-chart.stories.tsx",
        "../src/components/application/bar-chart/bar-chart.stories.tsx",
        "../src/components/application/activity-guages/activity-guages.stories.tsx",
        "../src/components/application/alerts/alerts.stories.tsx",
        "../src/components/application/notifications/notifications.stories.tsx",
        "../src/components/application/inline-ctas/inline-ctas.stories.tsx",
        "../src/components/application/page-headers/page-headers.stories.tsx",
        "../src/components/application/app-navigation/header-navigation.stories.tsx",
        "../src/components/application/app-navigation/sidebar-navigation/sidebar-navigation.stories.tsx",
        "../src/components/foundations/featured-icon/featured-icon.stories.tsx",
        "../src/components/foundations/rating-badge.stories.tsx",
        "../src/components/shared-assets/qr-code.stories.tsx",
        "../src/components/shared-assets/illustrations/illustrations.stories.tsx",
    ],
    addons: [
        // "@chromatic-com/storybook", // Commented out due to ESM compatibility issues
        "@storybook/addon-vitest",
        "@storybook/addon-a11y",
        "@storybook/addon-docs",
        "@storybook/addon-onboarding",
        "@storybook/addon-themes",
    ],
    framework: "@storybook/react-vite",
    staticDirs: ["../public"],
    async viteFinal(config) {
        // @storybook/react-vite already includes React plugin with automatic JSX runtime
        // @ts-expect-error - logger exists at runtime but not in types
        const originalLogger = config.logger;

        return mergeConfig(config, {
            plugins: [tsconfigPaths()],
            optimizeDeps: {
                include: ["react", "react-dom", "@untitledui/icons", "@untitledui/file-icons"],
            },
            resolve: {
                alias: {
                    "@": path.resolve(__dirname, "../src"),
                },
            },
            esbuild: {
                jsx: "automatic",
            },
            build: {
                // Disable sourcemaps to avoid sourcemap resolution errors
                sourcemap: false,
            },
            // Suppress Vite's sourcemap error logging while preserving all logger methods
            customLogger: originalLogger
                ? {
                      ...originalLogger,
                      error: (msg: any, options?: any) => {
                          // Suppress sourcemap-related errors - they're not critical for production builds
                          const msgStr = typeof msg === "string" ? msg : String(msg);
                          if (
                              msgStr.includes("sourcemap") ||
                              msgStr.includes("Can't resolve original location") ||
                              msgStr.includes("Error when using sourcemap")
                          ) {
                              return;
                          }
                          originalLogger.error(msg, options);
                      },
                  }
                : undefined,
        });
    },
};
export default config;
