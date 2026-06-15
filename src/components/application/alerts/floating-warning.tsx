import * as Alerts from "@/components/application/alerts/alerts";

export const AlertFloatingWarningDemo = () => (
    <Alerts.AlertFloating
        color="warning"
        title="Just to let you know this might be a problem"
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid pariatur, ipsum dolor."
        confirmLabel="Learn more"
    />
);
