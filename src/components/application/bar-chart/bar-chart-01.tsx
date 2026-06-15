import { Bar, CartesianGrid, Label, Legend, BarChart as RechartsBarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ChartLegendContent, ChartTooltipContent } from "@/components/application/charts/charts-base";
import { useBreakpoint } from "@/hooks/use-breakpoint";

const barData = [
    {
        month: new Date(2025, 0, 1),
        A: 300,
        B: 200,
        C: 350,
    },
    {
        month: new Date(2025, 1, 1),
        A: 320,
        B: 300,
        C: 300,
    },
    {
        month: new Date(2025, 2, 1),
        A: 300,
        B: 200,
        C: 240,
    },
    {
        month: new Date(2025, 3, 1),
        A: 240,
        B: 300,
        C: 280,
    },
    {
        month: new Date(2025, 4, 1),
        A: 320,
        B: 280,
        C: 100,
    },
    {
        month: new Date(2025, 5, 1),
        A: 330,
        B: 300,
        C: 130,
    },
    {
        month: new Date(2025, 6, 1),
        A: 300,
        B: 200,
        C: 100,
    },
    {
        month: new Date(2025, 7, 1),
        A: 350,
        B: 300,
        C: 200,
    },
    {
        month: new Date(2025, 8, 1),
        A: 300,
        B: 200,
        C: 100,
    },
    {
        month: new Date(2025, 9, 1),
        A: 200,
        B: 300,
        C: 280,
    },
    {
        month: new Date(2025, 10, 1),
        A: 240,
        B: 300,
        C: 300,
    },
    {
        month: new Date(2025, 11, 1),
        A: 200,
        B: 400,
        C: 350,
    },
];

export const BarChart = () => {
    const isDesktop = useBreakpoint("lg");

    const colors: Record<string, string> = {
        A: "text-utility-brand-700",
        B: "text-utility-brand-500",
        C: "text-utility-gray-200",
    };

    return (
        <ResponsiveContainer className="h-60!">
            <RechartsBarChart
                data={barData}
                className="text-tertiary [&_.recharts-text]:text-xs"
                margin={{
                    left: 4,
                    right: 0,
                    top: isDesktop ? 12 : 6,
                    bottom: 18,
                }}
            >
                <CartesianGrid vertical={false} stroke="currentColor" className="text-utility-gray-100" />

                <Legend
                    verticalAlign="top"
                    align="right"
                    layout={isDesktop ? "vertical" : "horizontal"}
                    content={<ChartLegendContent className="-translate-y-2" />}
                />

                <XAxis
                    fill="currentColor"
                    axisLine={false}
                    tickLine={false}
                    tickMargin={11}
                    interval="preserveStartEnd"
                    dataKey="month"
                    tickFormatter={(value) => value.toLocaleDateString(undefined, { month: "short" })}
                >
                    <Label value="Month" fill="currentColor" className="!text-xs font-medium" position="bottom" />
                </XAxis>

                <YAxis
                    fill="currentColor"
                    axisLine={false}
                    tickLine={false}
                    interval="preserveStartEnd"
                    tickFormatter={(value) => Number(value).toLocaleString()}
                >
                    <Label
                        value="Active users"
                        fill="currentColor"
                        className="!text-xs font-medium"
                        style={{ textAnchor: "middle" }}
                        angle={-90}
                        position="insideLeft"
                    />
                </YAxis>

                <Tooltip
                    content={<ChartTooltipContent />}
                    formatter={(value) => Number(value).toLocaleString()}
                    labelFormatter={(value) => value.toLocaleDateString(undefined, { month: "short", year: "numeric" })}
                    cursor={{
                        className: "fill-utility-gray-200/20",
                    }}
                />

                <Bar
                    isAnimationActive={false}
                    className={colors["A"]}
                    dataKey="A"
                    name="Series 1"
                    type="monotone"
                    stackId="a"
                    fill="currentColor"
                    maxBarSize={isDesktop ? 32 : 16}
                />
                <Bar
                    isAnimationActive={false}
                    className={colors["B"]}
                    dataKey="B"
                    name="Series 2"
                    type="monotone"
                    stackId="a"
                    fill="currentColor"
                    maxBarSize={isDesktop ? 32 : 16}
                />
                <Bar
                    isAnimationActive={false}
                    className={colors["C"]}
                    dataKey="C"
                    name="Series 3"
                    type="monotone"
                    stackId="a"
                    fill="currentColor"
                    maxBarSize={isDesktop ? 32 : 16}
                    radius={[6, 6, 0, 0]}
                />
            </RechartsBarChart>
        </ResponsiveContainer>
    );
};
