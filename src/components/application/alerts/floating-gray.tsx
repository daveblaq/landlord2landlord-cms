import * as Alerts from "@/components/application/alerts/alerts";

export const AlertFloatingGrayDemo = () => (
    <Alerts.AlertFloating
        color="gray"
        title="We've just released a new feature"
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid pariatur, ipsum dolor."
        confirmLabel="View changes"
    />
);
