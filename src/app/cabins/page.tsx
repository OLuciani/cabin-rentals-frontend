"use client";

import Link from "next/link"; // Importa Link
import CabinCard from "../../features/cabins/components/CabinCard";
import { useCabins } from "../../features/cabins/hooks/useCabins";
import { CircularProgress } from "@mui/material";
import { useSearchParams } from "next/navigation";

const CabinsPage = () => {
  const searchParams = useSearchParams();
  const start = searchParams.get("start");
  const end = searchParams.get("end");

  //const { cabins, loading, error } = useCabins();
  const { cabins, loading, error } = useCabins(start ?? undefined, end ?? undefined);

  if (loading)
    return (
      <div className="flex flex-col justify-center items-center h-64 space-y-4">
        <p className="text-lg text-center">Esperando datos...</p>
        <CircularProgress />
      </div>
    );

  if (error) return <p className="p-4 text-red-600">{error}</p>;

  return (
    <div className="p-4">
      <h1 className="text-3xl text-center font-bold mb-6">Nuestras cabañas</h1>

      <div className="w-full flex flex-row flex-wrap justify-center gap-6">
        {cabins.map((cabin) => (
          <Link key={cabin._id} href={`/cabins/${cabin._id}`}>
            <CabinCard cabin={cabin} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CabinsPage;
