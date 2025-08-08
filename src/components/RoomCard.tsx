import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { User, Bed, Bath, Wifi, Car } from "lucide-react";
import { cn } from "@/lib/utils";

export type RoomStatus = "available" | "occupied" | "maintenance" | "cleaning" | "checkout";

export interface Room {
  id: string;
  number: string;
  type: string;
  status: RoomStatus;
  guest?: {
    name: string;
    checkIn: string;
    checkOut: string;
  };
  amenities: string[];
  price: number;
  floor: number;
}

interface RoomCardProps {
  room: Room;
  onStatusChange: (roomId: string, status: RoomStatus) => void;
  onViewDetails: (roomId: string) => void;
}

const statusConfig = {
  available: {
    label: "Available",
    className: "bg-available text-available-foreground",
    cardClass: "border-available/20 bg-gradient-to-br from-available/5 to-available/10"
  },
  occupied: {
    label: "Occupied",
    className: "bg-occupied text-occupied-foreground",
    cardClass: "border-occupied/20 bg-gradient-to-br from-occupied/5 to-occupied/10"
  },
  maintenance: {
    label: "Maintenance",
    className: "bg-maintenance text-maintenance-foreground",
    cardClass: "border-maintenance/20 bg-gradient-to-br from-maintenance/5 to-maintenance/10"
  },
  cleaning: {
    label: "Cleaning",
    className: "bg-cleaning text-cleaning-foreground",
    cardClass: "border-cleaning/20 bg-gradient-to-br from-cleaning/5 to-cleaning/10"
  },
  checkout: {
    label: "Check-out",
    className: "bg-checkout text-checkout-foreground",
    cardClass: "border-checkout/20 bg-gradient-to-br from-checkout/5 to-checkout/10"
  }
};

const amenityIcons = {
  wifi: Wifi,
  parking: Car,
  bath: Bath,
  bed: Bed
};

export function RoomCard({ room, onStatusChange, onViewDetails }: RoomCardProps) {
  const config = statusConfig[room.status];

  return (
    <Card className={cn(
      "transition-all duration-200 hover:shadow-lg cursor-pointer group",
      config.cardClass
    )}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-lg">Room {room.number}</h3>
            <p className="text-sm text-muted-foreground">{room.type} • Floor {room.floor}</p>
          </div>
          <Badge className={config.className}>
            {config.label}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {room.guest && (
          <div className="flex items-center gap-2 p-3 bg-background/50 rounded-md">
            <User className="h-4 w-4 text-muted-foreground" />
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{room.guest.name}</p>
              <p className="text-xs text-muted-foreground">
                {room.guest.checkIn} - {room.guest.checkOut}
              </p>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            {room.amenities.slice(0, 3).map((amenity) => {
              const Icon = amenityIcons[amenity as keyof typeof amenityIcons];
              return Icon ? (
                <Icon key={amenity} className="h-4 w-4 text-muted-foreground" />
              ) : null;
            })}
            {room.amenities.length > 3 && (
              <span className="text-xs text-muted-foreground">+{room.amenities.length - 3}</span>
            )}
          </div>
          <span className="font-semibold">${room.price}/night</span>
        </div>

        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={() => onViewDetails(room.id)}
          >
            Details
          </Button>
          {room.status === "occupied" && (
            <Button 
              size="sm" 
              className="flex-1"
              onClick={() => onStatusChange(room.id, "checkout")}
            >
              Check-out
            </Button>
          )}
          {room.status === "available" && (
            <Button 
              size="sm" 
              className="flex-1"
              onClick={() => onStatusChange(room.id, "occupied")}
            >
              Check-in
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}