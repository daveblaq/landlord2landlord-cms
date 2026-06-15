import * as Alerts from "@/components/application/alerts/alerts";

export const AlertFloatingSuccessDemo = () => (
    <Alerts.AlertFloating
        color="success"
        title="We've just released a new feature"
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid pariatur, ipsum dolor."
        confirmLabel="View changes"
    />
);
