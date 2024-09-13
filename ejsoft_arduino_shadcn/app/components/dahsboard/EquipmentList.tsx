import { useRecoilState, useRecoilValue } from "recoil";
import {
  selectedEquipmentIdState,
  searchTermState,
  filteredEquipmentListSelector,
} from "@/app/store/dashboardAtoms";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

export function EquipmentList() {
  const [selectedEquipmentId, setSelectedEquipmentId] = useRecoilState(
    selectedEquipmentIdState
  );
  const [searchTerm, setSearchTerm] = useRecoilState(searchTermState);
  const filteredEquipmentList = useRecoilValue(filteredEquipmentListSelector);

  const handleEquipmentSelect = (equipmentId: string) => {
    setSelectedEquipmentId(equipmentId);
    // Note: You might need to fetch new data here or use a Recoil effect
  };

  return (
    <Card className="flex-[0.3]">
      <CardHeader className="pb-2">
        <CardTitle className="flex justify-between items-center">
          <div>Equipment List</div>
        </CardTitle>
        <CardDescription>
          <div className="flex items-center gap-2 pt-2">
            <Input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search />
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-2">
        {filteredEquipmentList.length > 0 ? (
          <ScrollArea className="h-[400px] pr-4">
            <ul className="space-y-2">
              {filteredEquipmentList.map((equipment) => (
                <li
                  key={equipment.equipmentId}
                  className={`flex items-center justify-between p-3 border rounded-md hover:bg-gray-50 transition-colors duration-150 cursor-pointer ${
                    equipment.equipmentId === selectedEquipmentId
                      ? "bg-blue-100 font-bold"
                      : ""
                  }`}
                  onClick={() => handleEquipmentSelect(equipment.equipmentId)}
                >
                  <div className="flex items-center">
                    <div>
                      <p className="font-medium">{equipment.equipmentId}</p>
                      <p className="text-sm text-gray-500">
                        {equipment.equipmentType}
                      </p>
                    </div>
                  </div>
                  <span className="font-medium text-blue-600">
                    {equipment.equipmentName || "N/A"}
                  </span>
                </li>
              ))}
            </ul>
          </ScrollArea>
        ) : (
          <p className="text-center text-gray-500">
            No equipment data available.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
