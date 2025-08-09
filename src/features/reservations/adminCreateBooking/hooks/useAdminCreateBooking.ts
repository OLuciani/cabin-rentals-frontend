import { useState } from "react";
import { createAdminBooking } from "../services/createBookingService";
import { IAdminCreateBooking } from "../types/adminBookingTypes";

export const useAdminCreateBooking = () => {
  const [loading, setLoading] = useState(false);

  const handleCreate = async (data: IAdminCreateBooking) => {
    setLoading(true);
    try {
      await createAdminBooking(data);
    } finally {
      setLoading(false);
    }
  };

  return { handleCreate, loading };
};
