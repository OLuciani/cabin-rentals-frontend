"use client";

// Componente visual que representa una tarjeta individual de cabaña (`CabinCard`).
//
// Muestra una imagen principal, nombre, descripción, capacidad y precio por noche.
// Al hacer clic en la tarjeta, redirige al detalle de la cabaña.
// Utilizado en listados de cabañas, como en la vista `CabinsPageClient`.

import Image from "next/image";
import { Cabin } from "../types/cabinBasic";
import { useRouter } from "next/navigation";

type Props = {
  cabin: Cabin;
  onClick?: () => void; 
};

const CabinCard = ({ cabin, onClick }: Props) => {
  const router = useRouter();

  return (
    <div
      // Redirige a la página de detalle al hacer clic
      onClick={() => {
        if (onClick) {
          onClick(); // 👈 usa el callback si está definido
        } else {
          router.push(`/cabins/${cabin._id}`); // 👈 navegación por defecto
        }
      }}
      className="w-full xs:w-[350px] bg-white rounded-xl shadow-md overflow-hidden relative cursor-pointer transition-shadow hover:shadow-lg"
    >
      {/* Imágen principal de la cabaña */}
      <div className="relative w-full h-[200px] sm:h-[250px] group">
        <Image
          src={cabin.mainImage}
          alt={cabin.name}
          fill
          sizes="(max-width: 640px) 100vw, 350px"
          placeholder="blur"
          blurDataURL="/images/placeholder.jpg"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Contenido textual: nombre, descripción, info, precio */}
      <div className="p-4 h-[170px] bg-white bg-opacity-90 transition-all duration-300">
        <h2 className="text-lg font-semibold text-gray-900">{cabin.name}</h2>
        <p className="text-sm text-gray-500 mt-1 line-clamp-2 min-h-[2rem]">
          {cabin.description}
        </p>
        <div className="mt-3 text-gray-600 text-sm">
          🧍 {cabin.maxGuests} pers · 🛏 {cabin.rooms} habs · 🚿 {cabin.bathrooms} baños
        </div>
        <p className="text-right text-green-600 font-bold mt-2 text-base">
          ${cabin.pricePerNight.toLocaleString()} / noche
        </p>
      </div>
    </div>
  );
};

export default CabinCard;
