import * as Alerts from "@/components/application/alerts/alerts";

export const AlertFullWidthErrorDemo = () => (
    <Alerts.AlertFullWidth
        color="error"
        title="There was a problem with that action"
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
