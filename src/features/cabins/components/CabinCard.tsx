"use client";

import Image from "next/image";
import { Cabin } from "../types/cabin";
import { useRouter } from "next/navigation";

type Props = {
  cabin: Cabin;
};

const CabinCard = ({ cabin }: Props) => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/cabins/${cabin._id}`)}
      className="w-full xs:w-[350px] bg-white rounded-xl overflow-hidden relative cursor-pointer transition-shadow hover:shadow-md"
    >
      
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
