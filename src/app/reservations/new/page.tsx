import { Suspense } from "react";
import NewBookingPageClient from "../../../features/reservations/new/components/NewBookingPageClient";

const NewBookingPage = () => {
  return (
    <Suspense fallback={<div className="p-4 text-center">Cargando formulario...</div>}>
      <NewBookingPageClient />
    </Suspense>
  );
};

export default NewBookingPage;
