export interface Cabin {
    name: string;
    description: string;
    mainImage: string;
    images: string[];
    maxGuests: number;
    rooms: number;
    pricePerNight: number;
    bathrooms: number;
    amenities: string[];
    hasGrill: boolean;
    hasGarage: boolean;
    hasSwimmingPool: boolean;
    location: string;
  }
  
  export interface CabinDetailProps {
    cabin?: Cabin;
    openModal?: (index: number) => void;
    isModalOpen?: boolean;
    currentImageIndex?: number;
    images?: string[] | null;
    closeModal?: React.MouseEventHandler<HTMLButtonElement> | undefined;
    prevImage?: () => void;
    nextImage?: () => void;
    src?: string | HTMLImageElement
  }