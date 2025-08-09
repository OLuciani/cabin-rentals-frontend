export interface BookingResponse {
  id: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  cabinId: string;
  cabinName: string;
  userId: string;
  startDate: string;
  endDate: string;
  reservedNights: number;
  numberOfGuests: number;
  message: string;
  status: string;
  paymentStatus: string;
  totalPrice: number;
  confirmationCode: string;
  createdAt: string;
  updatedAt: string;
}

export interface AllBookingsProps {
  onSelectBooking: (id: string) => void;
  setSection: (section: string) => void;
}