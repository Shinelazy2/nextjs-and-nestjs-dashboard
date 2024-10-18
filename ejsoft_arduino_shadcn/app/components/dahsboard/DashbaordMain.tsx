"use client";
import React, { useState } from "react";
import MainHeader from "./component/header/MainHeader";
import { SubHeader } from "./component/subHeader/SubHeader";
import DashboardBody from "./DashboardBody";
import dayjs from "dayjs";
import { DateRange } from "react-day-picker";

export default function DashboardMain() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: dayjs().toDate(),
    to: dayjs().add(7, "day").toDate(),
  });
  const [chartType, setChartType] = useState<"monthly" | "daily" | "realtime">(
    "daily"
  );
  const [activeTab, setActiveTab] = useState("Main");

  return (
    <div className="flex flex-col">
      <MainHeader
        dateRange={dateRange}
        chartType={chartType}
        setDateRange={setDateRange}
      />
      <SubHeader activeTab={activeTab} onTabChange={setActiveTab} />
      <DashboardBody
        activeTab={activeTab}
        dateRange={dateRange}
        chartType={chartType}
        setDateRange={setDateRange}
        setChartType={setChartType}
      />
      {/* footer component can be added here if needed */}
    </div>
  );
}
