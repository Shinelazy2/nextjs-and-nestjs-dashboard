import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TemperatureHumidityChart } from "./TemperatureHumidityChart";
import { ChartData } from "chart.js";

interface ChartCardProps {
  chartType: "monthly" | "daily" | "realtime";
  handleChartTypeChange: (type: "monthly" | "daily" | "realtime") => void;
  chartData: ChartData<"line", number[], string>;
}

export default function ChartCard({
  chartType,
  handleChartTypeChange,
  chartData,
}: ChartCardProps) {
  return (
    <Card className="flex-[0.7]">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle>Temperature and Humidity Chart</CardTitle>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleChartTypeChange("realtime")}
            className={chartType === "realtime" ? "bg-blue-100" : ""}
          >
            실시간
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleChartTypeChange("daily")}
            className={chartType === "daily" ? "bg-blue-100" : ""}
          >
            일자별
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleChartTypeChange("monthly")}
            className={chartType === "monthly" ? "bg-blue-100" : ""}
          >
            월별
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="w-full h-[300px]">
          <TemperatureHumidityChart chartData={chartData} />
        </div>
      </CardContent>
    </Card>
  );
}
