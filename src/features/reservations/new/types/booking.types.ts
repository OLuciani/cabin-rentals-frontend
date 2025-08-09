export interface BookingFormData {
    cabinId: string;
    userId: string;
    startDate: Date;
    endDate: Date;
    numberOfGuests: number;
    message?: string;
  }
  