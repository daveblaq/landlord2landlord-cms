import * as Alerts from "@/components/application/alerts/alerts";

export const AlertFloatingBrandDemo = () => (
    <div className="w-full">
        <Alerts.AlertFloating
            color="brand"
            title="We've just released a new feature"
            description="Lorem ipsum dolor sit amet consectetur adipisic<ing elit. Aliquid pariatur, ipsum dolor."
            confirmLabel="View changes"
        />
    </div>
);
