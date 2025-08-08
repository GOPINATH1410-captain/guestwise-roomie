import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dashboard } from "@/components/Dashboard";
import { RoomGrid } from "@/components/RoomGrid";
import { RoomStatus } from "@/components/RoomCard";
import { mockRooms } from "@/data/mockRooms";
import { useToast } from "@/hooks/use-toast";
import { Building2, BarChart3, Grid3X3 } from "lucide-react";

const Index = () => {
  const [rooms, setRooms] = useState(mockRooms);
  const { toast } = useToast();

  const handleStatusChange = (roomId: string, newStatus: RoomStatus) => {
    setRooms(prevRooms =>
      prevRooms.map(room =>
        room.id === roomId ? { ...room, status: newStatus } : room
      )
    );

    const room = rooms.find(r => r.id === roomId);
    toast({
      title: "Room Status Updated",
      description: `Room ${room?.number} is now ${newStatus}`,
    });
  };

  const handleViewDetails = (roomId: string) => {
    const room = rooms.find(r => r.id === roomId);
    toast({
      title: "Room Details",
      description: `Viewing details for Room ${room?.number}`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b">
        <div className="container flex h-16 items-center px-4">
          <div className="flex items-center gap-2">
            <Building2 className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-semibold">GuestWise Roomie</h1>
          </div>
        </div>
      </div>

      <div className="container px-4 py-6">
        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="rooms" className="flex items-center gap-2">
              <Grid3X3 className="h-4 w-4" />
              Room Management
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="dashboard" className="mt-6">
            <Dashboard rooms={rooms} />
          </TabsContent>
          
          <TabsContent value="rooms" className="mt-6">
            <RoomGrid 
              rooms={rooms} 
              onStatusChange={handleStatusChange}
              onViewDetails={handleViewDetails}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;