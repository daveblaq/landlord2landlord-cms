import * as Alerts from "@/components/application/alerts/alerts";

export const AlertFloatingErrorDemo = () => (
    <Alerts.AlertFloating
        color="error"
        title="There was a problem with that action"
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid pariatur, ipsum dolor."
        confirmLabel="Learn more"
    />
);