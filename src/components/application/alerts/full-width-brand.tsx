import * as Alerts from "@/components/application/alerts/alerts";

export const AlertFullWidthBrandDemo = () => (
    <Alerts.AlertFullWidth
        color="brand"
        title="We've just released a new feature"
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
