import { Room } from "@/components/RoomCard";

export const mockRooms: Room[] = [
  {
    id: "1",
    number: "101",
    type: "Standard",
    status: "available",
    amenities: ["wifi", "bath", "bed"],
    price: 120,
    floor: 1
  },
  {
    id: "2",
    number: "102",
    type: "Standard",
    status: "occupied",
    guest: {
      name: "John Smith",
      checkIn: "2024-08-05",
      checkOut: "2024-08-10"
    },
    amenities: ["wifi", "bath", "bed"],
    price: 120,
    floor: 1
  },
  {
    id: "3",
    number: "103",
    type: "Standard",
    status: "cleaning",
    amenities: ["wifi", "bath", "bed"],
    price: 120,
    floor: 1
  },
  {
    id: "4",
    number: "201",
    type: "Deluxe",
    status: "available",
    amenities: ["wifi", "bath", "bed", "parking"],
    price: 180,
    floor: 2
  },
  {
    id: "5",
    number: "202",
    type: "Deluxe",
    status: "occupied",
    guest: {
      name: "Sarah Johnson",
      checkIn: "2024-08-06",
      checkOut: "2024-08-12"
    },
    amenities: ["wifi", "bath", "bed", "parking"],
    price: 180,
    floor: 2
  },
  {
    id: "6",
    number: "203",
    type: "Deluxe",
    status: "maintenance",
    amenities: ["wifi", "bath", "bed", "parking"],
    price: 180,
    floor: 2
  },
  {
    id: "7",
    number: "301",
    type: "Suite",
    status: "available",
    amenities: ["wifi", "bath", "bed", "parking"],
    price: 250,
    floor: 3
  },
  {
    id: "8",
    number: "302",
    type: "Suite",
    status: "occupied",
    guest: {
      name: "Michael Brown",
      checkIn: "2024-08-07",
      checkOut: "2024-08-15"
    },
    amenities: ["wifi", "bath", "bed", "parking"],
    price: 250,
    floor: 3
  },
  {
    id: "9",
    number: "303",
    type: "Suite",
    status: "checkout",
    guest: {
      name: "Emily Davis",
      checkIn: "2024-08-01",
      checkOut: "2024-08-08"
    },
    amenities: ["wifi", "bath", "bed", "parking"],
    price: 250,
    floor: 3
  },
  {
    id: "10",
    number: "401",
    type: "Presidential",
    status: "available",
    amenities: ["wifi", "bath", "bed", "parking"],
    price: 400,
    floor: 4
  },
  {
    id: "11",
    number: "104",
    type: "Standard",
    status: "occupied",
    guest: {
      name: "David Wilson",
      checkIn: "2024-08-06",
      checkOut: "2024-08-11"
    },
    amenities: ["wifi", "bath", "bed"],
    price: 120,
    floor: 1
  },
  {
    id: "12",
    number: "105",
    type: "Standard",
    status: "available",
    amenities: ["wifi", "bath", "bed"],
    price: 120,
    floor: 1
  }
];