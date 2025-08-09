// Tipo completo con TODO lo que devuelve el backend
export interface IBookedRange {
  from: string;
  to: string;
  reservedBy?: string;
}

export interface ICabin {
  _id: string;
  name: string;
  description: string;
  mainImage: string;
  images: string[];
  pricePerNight: number;
  maxGuests: number;
  rooms: number;
  bathrooms: number;
  amenities: string[];
  hasGrill: boolean;
  hasGarage: boolean;
  hasSwimmingPool: boolean;
  location: string;
  isActive: boolean;
  createdBy: string;
  bookedRanges: IBookedRange[];
  createdAt: string;
  updatedAt: string;
}

export type CabinFormData = {
  name: string;
  description: string;
  mainImage: string | File | null;
  images: (string | File | null)[];
  pricePerNight: number;
  maxGuests: number;
  rooms: number;
  bathrooms: number;
  amenities: string[];
  hasGrill: boolean;
  hasGarage: boolean;
  hasSwimmingPool: boolean;
  location: string;
};

