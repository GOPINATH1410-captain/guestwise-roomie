import { Room, RoomCard, RoomStatus } from "./RoomCard";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";

interface RoomGridProps {
  rooms: Room[];
  onStatusChange: (roomId: string, status: RoomStatus) => void;
  onViewDetails: (roomId: string) => void;
}

export function RoomGrid({ rooms, onStatusChange, onViewDetails }: RoomGridProps) {
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredRooms = rooms.filter(room => {
    const matchesStatus = statusFilter === "all" || room.status === statusFilter;
    const matchesSearch = 
      room.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      room.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (room.guest?.name || "").toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesStatus && matchesSearch;
  });

  const statusCounts = rooms.reduce((acc, room) => {
    acc[room.status] = (acc[room.status] || 0) + 1;
    return acc;
  }, {} as Record<RoomStatus, number>);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Room Management</h2>
          <p className="text-muted-foreground">
            Monitor and manage all hotel rooms
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search rooms..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-[300px]"
            />
          </div>
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Rooms ({rooms.length})</SelectItem>
              <SelectItem value="available">Available ({statusCounts.available || 0})</SelectItem>
              <SelectItem value="occupied">Occupied ({statusCounts.occupied || 0})</SelectItem>
              <SelectItem value="maintenance">Maintenance ({statusCounts.maintenance || 0})</SelectItem>
              <SelectItem value="cleaning">Cleaning ({statusCounts.cleaning || 0})</SelectItem>
              <SelectItem value="checkout">Check-out ({statusCounts.checkout || 0})</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Badge variant="outline" className="bg-available/10 text-available border-available/20">
          Available: {statusCounts.available || 0}
        </Badge>
        <Badge variant="outline" className="bg-occupied/10 text-occupied border-occupied/20">
          Occupied: {statusCounts.occupied || 0}
        </Badge>
        <Badge variant="outline" className="bg-maintenance/10 text-maintenance border-maintenance/20">
          Maintenance: {statusCounts.maintenance || 0}
        </Badge>
        <Badge variant="outline" className="bg-cleaning/10 text-cleaning border-cleaning/20">
          Cleaning: {statusCounts.cleaning || 0}
        </Badge>
        <Badge variant="outline" className="bg-checkout/10 text-checkout border-checkout/20">
          Check-out: {statusCounts.checkout || 0}
        </Badge>
      </div>

      {filteredRooms.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No rooms found matching your criteria.</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredRooms.map((room) => (
            <RoomCard
              key={room.id}
              room={room}
              onStatusChange={onStatusChange}
              onViewDetails={onViewDetails}
            />
          ))}
        </div>
      )}
    </div>
  );
}