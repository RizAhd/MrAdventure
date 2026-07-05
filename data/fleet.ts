export type Vehicle = {
  name: string;
  image: string;
  capacity: string;
  note: string;
};

// Taxi / transport fleet first (the main service), then safari & rental vehicles.
export const fleet: Vehicle[] = [
  { name: "Toyota Prius", image: "/fleet/taxi-prius.jpg", capacity: "1–3 passengers", note: "Comfortable A/C hybrid car — ideal for airport runs and city trips." },
  { name: "Honda Fit Shuttle", image: "/fleet/fit-shuttle.jpg", capacity: "1–4 passengers", note: "Roomy hybrid wagon with extra space for luggage." },
  { name: "Toyota HiAce 7-Seater", image: "/fleet/hiace-7.jpg", capacity: "1–7 passengers", note: "Comfortable A/C van for families and small groups." },
  { name: "Toyota HiAce 14-Seater", image: "/fleet/hiace-14.jpg", capacity: "1–14 passengers", note: "High-roof commuter van for larger groups and island tours." },
  { name: "Toyota Coaster Bus", image: "/fleet/coaster.jpg", capacity: "Up to 27", note: "Mini-coach for big groups, weddings and multi-day tours." },
  { name: "Safari Jeep", image: "/fleet/safari-jeep.jpg", capacity: "1–6 guests", note: "4x4 open jeep for national-park game drives." },
  { name: "Scooter", image: "/fleet/scooter.jpg", capacity: "2 riders", note: "Automatic scooters for easy self-drive exploring." },
  { name: "Tuk Tuk", image: "/fleet/tuktuk.jpg", capacity: "1–3 riders", note: "The classic three-wheeler — self-drive or with a driver." },
  { name: "Bicycle", image: "/fleet/bicycle.jpg", capacity: "1 rider", note: "Well-serviced bikes for relaxed local rides." },
];
