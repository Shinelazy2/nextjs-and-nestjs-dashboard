import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import api from "@/app/api/axios.config";
import { Search } from "lucide-react";
import dayjs from "dayjs";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { TemperatureHumidityChart } from "./component/chart/TemperatureHumidityChart";
import React from "react";
import { Calendar } from "@/components/ui/calendar";
import { DateRange } from "react-day-picker";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import ChartCard from "./component/chart/ChartCard";
import EquipmentList from "./component/equipment/EquipmentList";
import { CardItem } from "./component/card/TitleCard";
import { SubHeader } from "./component/subHeader/SubHeader";
import MainHeader from "./component/header/MainHeader";
import { CardGrid } from "./component/card/CardGird";

interface EquipmentInfo {
  equipmentId: string;
  groupId: string;
  equipmentType: string;
  modelNo: string | null;
  productNo: string | null;
  installDt: string | null;
  openDt: string | null;
  freeAsEndDt: string | null;
  closeReason: string | null;
  closeDt: string | null;
  regId: string;
  regDt: Date | string;
  modId: string | null;
  modDt: Date | null;
  equipmentName: string | null;
}

interface CardData {
  TEMP: number;
  HUM: number;
  DOOR: number;
  RISK: number;
  REG_DT: string;
}

interface ChartDataPoint {
  ID: string;
  TEMP: string;
  HUM: string;
  DOOR: string | null;
  RISK: string | null;
  REG_DT: string;
}

interface DashboardBodyProps {
  dateRange: DateRange | undefined;
  chartType: "monthly" | "daily" | "realtime";
  setDateRange: (dateRange: DateRange | undefined) => void;
  setChartType: (type: "monthly" | "daily" | "realtime") => void;
}

export default function DashboardBody({
  dateRange,
  chartType,
  setDateRange,
  setChartType,
}: DashboardBodyProps) {
  const [equipmentList, setEquipmentList] = useState<EquipmentInfo[]>([]);
  const [cardData, setCardData] = useState<CardData>();
  const [selectedEquipmentId, setSelectedEquipmentId] = useState<string | null>(
    null
  );

  const [chartData, setChartData] = useState<
    ChartData<"line", number[], string>
  >({
    labels: [],
    datasets: [],
  });
  const [searchTerm, setSearchTerm] = useState("");

  const fetchEquipmentList = async (): Promise<EquipmentInfo[]> => {
    try {
      const { data } = await api.get<EquipmentInfo[]>("/equipment/list");
      console.log("data", data);

      setEquipmentList(data);
      return data;
    } catch (error) {
      console.error("Error fetching equipment list:", error);
      setEquipmentList([]);
      return [];
    }
  };

  const fetchAverageEquipmentStatus = async (equipmentId: string) => {
    try {
      console.log("dateRange", dateRange);

      let endDate;
      let startDate;
      const today = dayjs();
      if (!cardData) {
        endDate = today.format("YYYY-MM-DD");
        startDate = today.subtract(30, "day").format("YYYY-MM-DD");
      } else {
        endDate = dayjs(dateRange?.to).format("YYYY-MM-DD");
        startDate = dayjs(dateRange?.from).format("YYYY-MM-DD");
      }

      const res = await api.get("/equipment/status", {
        params: {
          equipmentId,
          startDate,
          endDate,
        },
      });

      console.log("fetchAverageEquipmentStatus", res);
      if (res.status === 200) {
        setCardData(res.data);
        console.log("cardData", res);
      }
    } catch (error) {
      console.error("Error fetching equipment status:", error);
      setCardData(undefined);
    }
  };

  const fetchChartData = async (
    equipmentId: string,
    startDate: Date,
    endDate: Date,
    type: "monthly" | "daily" | "realtime"
  ) => {
    try {
      let endpoint: string;
      let res;
      const formattedStartDate = dayjs(startDate).format("YYYY-MM-DD");

      const formattedEndDate = dayjs(endDate).format("YYYY-MM-DD");
      console.log("type", type);

      switch (type) {
        case "monthly":
          endpoint = "/equipment/month";
          res = await api.get<ChartDataPoint[]>(endpoint, {
            params: {
              equipmentId,
              startDate: formattedStartDate,
              endDate: formattedEndDate,
            },
          });
          break;
        case "daily":
          endpoint = "/equipment/day";
          res = await api.get<ChartDataPoint[]>(endpoint, {
            params: {
              equipmentId,
              startDate: formattedStartDate,
              endDate: formattedEndDate,
            },
          });
          break;
        case "realtime":
          endpoint = "/equipment/realtime";
          res = await api.get<ChartDataPoint[]>(endpoint, {
            params: { equipmentId, minute: 30 },
          });
          break;
        default:
          throw new Error("Invalid chart type");
      }

      console.log("res", res);

      if (res.status === 200) {
        const data = res.data;

        setChartData({
          labels: data.map((item) => item.REG_DT),
          datasets: [
            {
              label: "Temperature",
              data: data.map((item) => parseFloat(item.TEMP)),
              borderColor: "rgb(255, 99, 132)",
              backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
            {
              label: "Humidity",
              data: data.map((item) => parseFloat(item.HUM)),
              borderColor: "rgb(53, 162, 235)",
              backgroundColor: "rgba(53, 162, 235, 0.5)",
            },
          ],
        });
      }
    } catch (error) {
      console.error("Error fetching chart data:", error);
    }
  };

  const handleEquipmentSelect = async (
    equipmentId: string,
    chartType: "monthly" | "daily" | "realtime"
  ) => {
    setSelectedEquipmentId(equipmentId);
    await fetchAverageEquipmentStatus(equipmentId);

    if (dateRange?.from && dateRange?.to) {
      await fetchChartData(
        equipmentId,
        dateRange.from,
        dateRange.to,
        chartType
      );
    }
  };

  const handleChartTypeChange = async (
    type: "monthly" | "daily" | "realtime"
  ) => {
    setChartType(type);
    if (selectedEquipmentId && dateRange?.from && dateRange?.to) {
      await fetchChartData(
        selectedEquipmentId,
        dateRange.from,
        dateRange.to,
        type
      );
    }
  };

  useEffect(() => {
    const init = async () => {
      const equipmentList = await fetchEquipmentList();
      if (equipmentList.length > 0 && dateRange?.from && dateRange?.to) {
        await handleEquipmentSelect(equipmentList[0].equipmentId, chartType);
      }
    };
    init();
  }, [dateRange, chartType]);

  const filteredEquipmentList = equipmentList.filter(
    (equipment) =>
      equipment.equipmentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      equipment.equipmentName
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      equipment.equipmentType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <CardGrid cardData={cardData} />
      <div className="grid grid-cols-1 gap-6">
        <div className="flex gap-6">
          {/* Chart */}
          <ChartCard
            chartType={chartType}
            handleChartTypeChange={handleChartTypeChange}
            chartData={chartData}
          />
          {/* Equipment List */}
          <EquipmentList
            filteredEquipmentList={filteredEquipmentList}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedEquipmentId={selectedEquipmentId}
            handleEquipmentSelect={handleEquipmentSelect}
            chartType={chartType}
          />
        </div>
      </div>
    </div>
  );
}
