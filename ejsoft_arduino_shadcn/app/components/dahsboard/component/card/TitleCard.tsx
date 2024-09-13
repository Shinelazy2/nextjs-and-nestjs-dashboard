import { CardData } from "@/app/types/dashboard.type";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CardItemProps {
  title: string;
  value: (data: CardData) => string;
  icon: string;
  description: (data: CardData) => string;
  cardData: CardData | undefined;
}

export function CardItem({
  title,
  value,
  icon,
  description,
  cardData,
}: CardItemProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="h-4 w-4 text-muted-foreground">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{cardData && value(cardData)}</div>
        <div className="text-xs text-muted-foreground">
          {cardData && description(cardData)}
        </div>
      </CardContent>
    </Card>
  );
}
