"use client";

// Componente principal del listado de cabañas (`CabinsPageClient`).
//
// Este componente recupera las cabañas desde el hook `useCabins` y procesa los filtros desde la URL
// (fechas, cantidad de huéspedes, habitaciones).
//
// - Si el usuario **no aplica filtros**, muestra **todas las cabañas**.
// - Si el usuario aplica filtros (como fechas, huéspedes, etc.), muestra solo las **cabañas disponibles**.
//
// También puede renderizar el componente `DateFilter` si no hay filtros activos.
// Se utiliza dentro de la página `src/app/cabins/page.tsx`.

//import Link from "next/link";
import CabinCard from "@/features/cabins/components/CabinCard";
import { useCabins } from "@/features/cabins/hooks/useCabins";
import { CircularProgress } from "@mui/material";
import { useSearchParams } from "next/navigation";
import DateFilter from "@/features/availability/components/DateFilter";

interface Props {
  onCabinClick?: (id: string) => void;
}

const CabinsPageDashboardClient: React.FC<Props> = ({ onCabinClick }) => {
  const searchParams = useSearchParams();

  // Parámetros de búsqueda (pueden venir desde filtros o URL directa)
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");
  const guests = searchParams.get("guests") ?? undefined;
  const rooms = searchParams.get("rooms") ?? undefined;

  // Formatea fechas a ISO si existen
  const start = startDate ? new Date(startDate).toISOString() : undefined;
  const end = endDate ? new Date(endDate).toISOString() : undefined;

  // Hook que obtiene las cabañas según filtros
  const { cabins, loading, error } = useCabins(start, end, guests, rooms);

  // Determina si mostrar el filtro de fechas en pantalla. Si el usuario utilizó el filtro de fechas
  // en el Home no renderiza el filtro en este componente.
  const showFilter = !startDate && !endDate && !guests && !rooms;

  const pageTitle = showFilter
    ? "Todas nuestras cabañas"
    : "Cabañas disponibles";

  // Estado de carga
  if (loading)
    return (
      <div className="flex flex-col justify-center items-center h-64 space-y-4">
        <p className="text-lg text-center">Esperando datos...</p>
        <CircularProgress />
      </div>
    );

  // Estado de error
  if (error) return <p className="p-4 text-red-600">{error}</p>;

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-md">
      <h1
        className={`text-3xl text-center font-bold ${
          !showFilter ? "mb-6" : "mb-0"
        }`}
      >
        {pageTitle}
      </h1>

      {/* Filtro de fechas solo si no hay filtros activos (si no se usó el filtro en el Home) */}
      {showFilter && (
        <div className="mb-3">
          <DateFilter />
        </div>
      )}

      {/* Lista de cabañas renderizadas en cards */}
      <div className="w-full flex flex-row flex-wrap justify-center gap-6">
        {cabins.map((cabin) => (
          <CabinCard
            key={cabin._id}
            cabin={cabin}
            onClick={() => onCabinClick?.(cabin._id)} // 👈 se lo pasás directamente
          />
        ))}
      </div>
    </div>
  );
};

export default CabinsPageDashboardClient;
