import * as Alerts from "@/components/application/alerts/alerts";

export const AlertFloatingDefaultDemo = () => (
    <Alerts.AlertFloating
        color="default"
        title="We've just released a new feature"
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid pariatur, ipsum dolor."
        confirmLabel="View changes"
    />
);
