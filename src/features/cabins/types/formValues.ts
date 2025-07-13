export interface FormValues {
  name: string;
  description: string;
  location: string;
  pricePerNight: number;
  maxGuests: number;
  rooms: number;
  bathrooms: number;
  amenities: string[];
  hasGrill: boolean;
  hasGarage: boolean;
  hasSwimmingPool: boolean;
  mainImage: File | null;
  images: (File | null)[];
}
