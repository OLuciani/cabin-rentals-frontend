// Página de listado de cabañas disponibles para alquiler.
//
// Esta vista renderiza el componente `CabinsPageClient`, que contiene toda la lógica de búsqueda, filtrado y visualización de cabañas.
// Se utiliza `Suspense` para mostrar un fallback mientras se cargan los datos de forma asíncrona.
// Toda la funcionalidad está modularizada en la carpeta `features/cabins`.

import { Suspense } from "react";
import CabinsPageClient from "../../features/cabins/components/CabinsPageClient";

export default function CabinsPage() {
  return (
    <Suspense fallback={<div className="p-4 text-center">Cargando cabañas...</div>}>
      {/* Componente modularizado que maneja la lógica y presentación del listado de cabañas */}
      <CabinsPageClient />
    </Suspense>
  );
}
