export interface EditBookingPayload {
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  startDate: string;
  endDate: string;
  numberOfGuests: number;
  status: string;
  paymentStatus: string;
  message?: string;
}

export interface EditBookingFormProps {
  bookingId: string;
  onBack: () => void;
}