"use client";
import React, { useState } from "react";
import { DashboardHeader } from "./DashboardHeader";
import DashboardBody from "./DashboardBody";
import MainHeader from "./component/header/MainHeader";
import { SubHeader } from "./component/subHeader/SubHeader";
import dayjs from "dayjs";
import { DateRange } from "react-day-picker";

export default function DashbaordMain() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: dayjs().toDate(),
    to: dayjs().add(7, "day").toDate(),
  });
  const [chartType, setChartType] = useState<"monthly" | "daily" | "realtime">(
    "daily"
  );
  const [activeTab, setActiveTab] = useState("Main");

  return (
    <div>
      <MainHeader
        dateRange={dateRange}
        chartType={chartType}
        setDateRange={setDateRange}
      />
      {/* SubHeader */}
      <SubHeader activeTab={activeTab} onTabChange={setActiveTab} />
      <DashboardBody
        dateRange={dateRange}
        chartType={chartType}
        setDateRange={setDateRange}
        setChartType={setChartType}
      />
      {/* footer */}
    </div>
  );
}
