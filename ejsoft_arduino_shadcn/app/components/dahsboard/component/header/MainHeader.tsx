import React from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";
import { DateRange } from "react-day-picker";
import { useState, useEffect } from "react";

interface MainHeaderProps {
  dateRange: DateRange | undefined;
  setDateRange: (newDateRange: DateRange | undefined) => void;
  chartType: "realtime" | "daily" | "monthly";
}

export function MainHeader({
  dateRange,
  setDateRange,
  chartType,
}: MainHeaderProps) {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonths, setSelectedMonths] = useState<[number, number] | null>(
    null
  );

  useEffect(() => {
    if (chartType === "monthly" && !selectedMonths) {
      const currentMonth = new Date().getMonth();
      const startMonth = Math.max(0, currentMonth - 5); // 현재 달부터 5개월 전
      const endMonth = currentMonth;
      setSelectedMonths([startMonth, endMonth]);
      updateDateRange([startMonth, endMonth]);
    }
  }, [chartType]);

  const handleMonthChange = (month: number) => {
    setSelectedMonths((prev) => {
      if (!prev) {
        // 첫 선택
        const newSelection: [number, number] = [month, month];
        updateDateRange(newSelection);
        return newSelection;
      } else if (prev[0] === prev[1] && month !== prev[0]) {
        // 두 번째 선택 (범위 설정)
        const newSelection: [number, number] = [
          Math.min(prev[0], month),
          Math.max(prev[0], month),
        ];
        updateDateRange(newSelection);
        return newSelection;
      } else {
        // 새로운 선택 (기존 선택 초기화)
        const newSelection: [number, number] = [month, month];
        updateDateRange(newSelection);
        return newSelection;
      }
    });
  };

  const updateDateRange = (selection: [number, number]) => {
    const startOfPeriod = dayjs()
      .year(selectedYear)
      .month(selection[0])
      .startOf("month")
      .toDate();
    const endOfPeriod = dayjs()
      .year(selectedYear)
      .month(selection[1])
      .endOf("month")
      .toDate();
    setDateRange({ from: startOfPeriod, to: endOfPeriod });
  };

  const renderMonthPicker = () => {
    const months = [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      "12",
    ];

    return (
      <div className="grid grid-cols-3 gap-2 p-2 w-[300px]">
        {months.map((month, index) => (
          <Button
            key={month}
            variant="outline"
            size="sm"
            onClick={() => handleMonthChange(index)}
            className={cn(
              "w-full h-10",
              selectedMonths &&
                index >= selectedMonths[0] &&
                index <= selectedMonths[1]
                ? "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground"
                : "hover:bg-secondary"
            )}
          >
            {month}
          </Button>
        ))}
      </div>
    );
  };

  const renderDatePicker = () => {
    if (chartType === "realtime") {
      return null;
    }

    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !dateRange && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {dateRange?.from ? (
              chartType === "daily" ? (
                dateRange.to ? (
                  <>
                    {dayjs(dateRange.from).format("MMM DD, YYYY")} -{" "}
                    {dayjs(dateRange.to).format("MMM DD, YYYY")}
                  </>
                ) : (
                  dayjs(dateRange.from).format("MMM DD, YYYY")
                )
              ) : (
                dayjs(dateRange.from).format("MMMM YYYY")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          {chartType === "daily" ? (
            <Calendar
              className="flex w-[300px] justify-center"
              initialFocus
              mode="range"
              defaultMonth={dateRange?.from}
              selected={dateRange}
              onSelect={setDateRange}
              numberOfMonths={1}
            />
          ) : (
            <div>
              <div className="flex justify-between items-center p-2 w-[300px]">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedYear(selectedYear - 1)}
                >
                  &lt;
                </Button>
                <span className="text-sm font-medium">{selectedYear} Year</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedYear(selectedYear + 1)}
                >
                  &gt;
                </Button>
              </div>
              {renderMonthPicker()}
            </div>
          )}
        </PopoverContent>
      </Popover>
    );
  };

  return (
    <div className="flex justify-between items-center">
      <h1 className="text-3xl font-bold">EJsoft Dashboard</h1>
      <div className="flex space-x-2">
        {renderDatePicker()}
        <Button variant="outline">Download</Button>
      </div>
    </div>
  );
}

export default MainHeader;
