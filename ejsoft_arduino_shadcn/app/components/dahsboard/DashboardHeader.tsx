import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import CustomMenu from "./component/menu/CustomMenu";

export function DashboardHeader() {
  return (
    <header className="sticky top-0 z-10 bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <CustomMenu />
          <nav className="hidden md:flex space-x-2 ml-4">
            <Button variant="ghost">Overview</Button>
            <Button variant="ghost">Tasks</Button>
            <Button variant="ghost">Playground</Button>
            <Button variant="ghost">Settings</Button>
          </nav>
        </div>
        <div className="flex items-center">
          <Input placeholder="Search..." className="w-64 mr-2" />
          <Button size="icon" variant="ghost">
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}
