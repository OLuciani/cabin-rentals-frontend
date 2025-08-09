import { BookingResponse } from "../../allBookings/types/allBookingsTypes";

export interface DeleteBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  booking: BookingResponse;
}