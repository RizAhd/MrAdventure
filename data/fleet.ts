export type Vehicle = {
  name: string;
  image: string;
  note: string;
};

export const fleet: Vehicle[] = [
  { name: "Safari Jeep", image: "/fleet/safari-jeep.jpg", note: "4x4 open jeep for national-park game drives." },
  { name: "Scooter", image: "/fleet/scooter.jpg", note: "Automatic scooters for easy self-drive exploring." },
  { name: "Tuk Tuk", image: "/fleet/tuktuk.jpg", note: "The classic three-wheeler — self-drive or with a driver." },
  { name: "Bicycle", image: "/fleet/bicycle.jpg", note: "Well-serviced bikes for relaxed local rides." },
  { name: "Car — Toyota Prius", image: "/fleet/taxi-car.jpg", note: "Comfortable A/C hybrid for airport & city transfers." },
  { name: "SUV — Suzuki Fronx", image: "/fleet/taxi-suv.jpg", note: "Compact SUV for couples and small families." },
  { name: "Wagon — Honda Shuttle", image: "/fleet/taxi-wagon.jpg", note: "Spacious estate for extra luggage and long trips." },
  { name: "Van — Toyota HiAce", image: "/fleet/van.jpg", note: "Roomy van for groups, families and island tours." },
];
