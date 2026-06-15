import * as Alerts from "@/components/application/alerts/alerts";

export const AlertFullWidthSuccessDemo = () => (
    <Alerts.AlertFullWidth
        color="success"
        title="Successfully updated profile"
        description={
            <>
                Lorem ipsum dolor sit amet{" "}
                <a href="#" className="underline-offset-3">
                    consectetur
                </a>
                .
            </>
        }
        confirmLabel="View changes"
    />
);
