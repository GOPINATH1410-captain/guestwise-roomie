import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bed, Users, Wrench, Sparkles, DollarSign, TrendingUp } from "lucide-react";
import { Room, RoomStatus } from "./RoomCard";

interface DashboardProps {
  rooms: Room[];
}

interface StatsCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  className?: string;
  subtitle?: string;
}

function StatsCard({ title, value, icon, className, subtitle }: StatsCardProps) {
  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
      </CardContent>
    </Card>
  );
}

export function Dashboard({ rooms }: DashboardProps) {
  const statusCounts = rooms.reduce((acc, room) => {
    acc[room.status] = (acc[room.status] || 0) + 1;
    return acc;
  }, {} as Record<RoomStatus, number>);

  const totalRooms = rooms.length;
  const occupancyRate = Math.round(((statusCounts.occupied || 0) / totalRooms) * 100);
  const totalRevenue = rooms
    .filter(room => room.status === "occupied")
    .reduce((acc, room) => acc + room.price, 0);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Hotel Dashboard</h2>
        <p className="text-muted-foreground">
          Overview of room status and key metrics
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Rooms"
          value={totalRooms}
          icon={<Bed className="h-4 w-4 text-muted-foreground" />}
        />
        <StatsCard
          title="Occupied Rooms"
          value={statusCounts.occupied || 0}
          icon={<Users className="h-4 w-4 text-occupied" />}
          className="border-occupied/20"
          subtitle={`${occupancyRate}% occupancy rate`}
        />
        <StatsCard
          title="Daily Revenue"
          value={totalRevenue}
          icon={<DollarSign className="h-4 w-4 text-primary" />}
          className="border-primary/20"
          subtitle="From occupied rooms"
        />
        <StatsCard
          title="Maintenance"
          value={statusCounts.maintenance || 0}
          icon={<Wrench className="h-4 w-4 text-maintenance" />}
          className="border-maintenance/20"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-available/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available</CardTitle>
            <Bed className="h-4 w-4 text-available" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-available">{statusCounts.available || 0}</div>
            <Badge className="bg-available text-available-foreground mt-2">Ready for guests</Badge>
          </CardContent>
        </Card>

        <Card className="border-cleaning/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cleaning</CardTitle>
            <Sparkles className="h-4 w-4 text-cleaning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-cleaning">{statusCounts.cleaning || 0}</div>
            <Badge className="bg-cleaning text-cleaning-foreground mt-2">In progress</Badge>
          </CardContent>
        </Card>

        <Card className="border-checkout/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Check-out</CardTitle>
            <TrendingUp className="h-4 w-4 text-checkout" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-checkout">{statusCounts.checkout || 0}</div>
            <Badge className="bg-checkout text-checkout-foreground mt-2">Pending cleaning</Badge>
          </CardContent>
        </Card>

        <Card className="border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Efficiency</CardTitle>
            <TrendingUp className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{occupancyRate}%</div>
            <Badge className="bg-primary text-primary-foreground mt-2">Occupancy rate</Badge>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}