import { Button } from "@/components/ui/button";

interface SubHeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function SubHeader({ activeTab, onTabChange }: SubHeaderProps) {
  return (
    <div className="flex space-x-2 border-b">
      <Button
        variant="ghost"
        className={`px-4 py-2 -mb-px ${
          activeTab === "Main" ? "border-b-2 border-blue-500" : ""
        }`}
        onClick={() => onTabChange("Main")}
      >
        Main
      </Button>
      <Button
        variant="ghost"
        className={`px-4 py-2 -mb-px ${
          activeTab === "Details" ? "border-b-2 border-blue-500" : ""
        }`}
        onClick={() => onTabChange("Details")}
      >
        Details
      </Button>
    </div>
  );
}
