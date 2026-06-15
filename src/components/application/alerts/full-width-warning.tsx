import * as Alerts from "@/components/application/alerts/alerts";

export const AlertFullWidthWarningDemo = () => (
    <Alerts.AlertFullWidth
        color="warning"
        title="Just to let you know this might be a problem"
        description={
            <>
                Lorem ipsum dolor sit amet{" "}
                <a href="#" className="underline-offset-3">
                    consectetur
                </a>
                .
            </>
        }
        confirmLabel="Learn more"
    />
);
