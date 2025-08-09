"use client";

import Link from "next/link";
import CabinCard from "@/features/cabins/components/CabinCard";
import { useCabins } from "@/features/cabins/hooks/useCabins";
import { CircularProgress } from "@mui/material";
import { useSearchParams } from "next/navigation";
import DateFilter from "@/features/availability/components/DateFilter";

const CabinsPageClient = () => {
  const searchParams = useSearchParams();

  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");
  const guests = searchParams.get("guests") ?? undefined;
  const rooms = searchParams.get("rooms") ?? undefined;

  const start = startDate ? new Date(startDate).toISOString() : undefined;
  const end = endDate ? new Date(endDate).toISOString() : undefined;

  const { cabins, loading, error } = useCabins(start, end, guests, rooms);

  const showFilter = !startDate && !endDate && !guests && !rooms;

  const pageTitle = showFilter
    ? "Todas nuestras cabañas"
    : "Cabañas disponibles";

  if (loading)
    return (
      <div className="flex flex-col justify-center items-center h-64 space-y-4">
        <p className="text-lg text-center">Esperando datos...</p>
        <CircularProgress />
      </div>
    );

  if (error) return <p className="p-4 text-red-600">{error}</p>;

  return (
    <div className="w-full px-4 py-4">
      <h1 className={`text-3xl text-center font-bold ${!showFilter ? "mb-6" : "mb-0"}`}>
        {pageTitle}
      </h1>

      {showFilter && (
        <div className="mb-3">
          <DateFilter />
        </div>
      )}

      {/* Grid de cards con ancho uniforme */}
      <div className="flex flex-wrap justify-center gap-6">
        {cabins.map((cabin) => (
          <div key={cabin._id} className="w-full max-w-[350px]">
            <Link
              href={{
                pathname: `/cabins/${cabin._id}`,
                query: { startDate, endDate, guests, rooms },
              }}
              className="block w-full h-full" // Esto es importante
            >
              <CabinCard cabin={cabin} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CabinsPageClient;
