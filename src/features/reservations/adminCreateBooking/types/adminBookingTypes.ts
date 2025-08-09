export interface IAdminCreateBooking {
  cabinId: string;
  userId?: string;
  startDate: string;
  endDate: string;
  numberOfGuests: number;
  message?: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
}
