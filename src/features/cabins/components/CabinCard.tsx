/* "use client";

import Image from "next/image";
import { Cabin } from "../types/cabin";

type Props = {
  cabin: Cabin;
};

const CabinCard = ({ cabin }: Props) => (
  <div
    key={cabin._id}
    className="w-full sm:w-[374px] p-4 border rounded-lg shadow-md"
    //className="w-full sm:w-[500px] p-4 border rounded-lg shadow-md"
  >
    <div className="w-full flex justify-center mb-4 aspect-[16/9]">
      <Image
        src={cabin.mainImage}
        alt={cabin.name}
        width={340}
        height={250}
        //width={440}
        //height={350}
      />
    </div>
    <h2 className="text-xl font-semibold">{cabin.name}</h2>
    <p className="text-gray-600 text-sm overflow-hidden text-ellipsis line-clamp-2 min-h-[3rem]">
      {cabin.description}
    </p>
    <div className="mt-auto">
      <p className="mt-2 text-green-600 font-bold">
        ${cabin.pricePerNight.toLocaleString()} por noche
      </p>
      <p className="text-sm text-gray-500">
        Capacidad: {cabin.maxGuests} personas - {cabin.rooms} habs -{" "}
        {cabin.bathrooms} baños
      </p>
    </div>
  </div>
);

export default CabinCard; */



/* "use client";

import Image from "next/image";
import { Cabin } from "../types/cabin";

type Props = {
  cabin: Cabin;
};

const CabinCard = ({ cabin }: Props) => (
  <div
    key={cabin._id}
    className="relative w-full sm:w-[374px] aspect-[4/3] overflow-hidden rounded-xl group cursor-pointer"
  >
    <Image
      src={cabin.mainImage}
      alt={cabin.name}
      fill
      className="object-cover transition-transform duration-300 group-hover:scale-105"
    />

    
    <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/70 to-transparent text-white">
      <h2 className="text-lg font-semibold">{cabin.name}</h2>
      <p className="text-sm text-gray-200 line-clamp-2">{cabin.description}</p>
      <p className="text-sm text-green-400 font-bold mt-1">
        ${cabin.pricePerNight.toLocaleString()} por noche
      </p>
      <p className="text-xs text-gray-300 mt-1">
        Capacidad: {cabin.maxGuests} personas · {cabin.rooms} habs · {cabin.bathrooms} baños
      </p>
    </div>
  </div>
);

export default CabinCard; */




/* "use client";

import Image from "next/image";
import { Cabin } from "../types/cabin";

type Props = {
  cabin: Cabin;
};

const CabinCard = ({ cabin }: Props) => (
  <div
    key={cabin._id}
    className="flex flex-col sm:flex-row gap-4 items-start w-full border-b border-gray-200 py-4"
  >
    <div className="relative w-full sm:w-60 h-40 flex-shrink-0 rounded-lg overflow-hidden">
      <Image
        src={cabin.mainImage}
        alt={cabin.name}
        fill
        className="object-cover"
      />
    </div>

    <div className="flex flex-col justify-between flex-grow">
      <div>
        <h2 className="text-xl font-semibold">{cabin.name}</h2>
        <p className="text-gray-600 text-sm mt-1 line-clamp-2">
          {cabin.description}
        </p>
      </div>

      <div className="mt-2">
        <p className="text-green-600 font-bold">
          ${cabin.pricePerNight.toLocaleString()} por noche
        </p>
        <p className="text-sm text-gray-500">
          Capacidad: {cabin.maxGuests} personas · {cabin.rooms} habs · {cabin.bathrooms} baños
        </p>
      </div>
    </div>
  </div>
);

export default CabinCard; */




/* "use client";

import Image from "next/image";
import { Cabin } from "../types/cabin";

type Props = {
  cabin: Cabin;
};

const CabinCard = ({ cabin }: Props) => (
  <div
    key={cabin._id}
    className="w-full sm:w-[374px] flex flex-col gap-2"
  >
    <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden">
      <Image
        src={cabin.mainImage}
        alt={cabin.name}
        fill
        className="object-cover transition-transform duration-300 hover:scale-105"
      />
    </div>

    <div className="mt-2 flex flex-col gap-1">
      <h2 className="text-lg font-semibold">{cabin.name}</h2>
      <p className="text-gray-600 text-sm line-clamp-2 min-h-[3rem]">{cabin.description}</p>

      <div className="flex flex-col text-sm text-gray-500">
        <span>
          Capacidad: {cabin.maxGuests} personas · {cabin.rooms} habs · {cabin.bathrooms} baños
        </span>
        <span className="text-green-700 font-bold">
          ${cabin.pricePerNight.toLocaleString()} / noche
        </span>
      </div>
    </div>
  </div>
);

export default CabinCard; */




/* "use client";

import Image from "next/image";
import { Cabin } from "../types/cabin";

type Props = {
  cabin: Cabin;
};

const CabinCard = ({ cabin }: Props) => (
  <div
    key={cabin._id}
    className="w-full sm:w-[374px] bg-white rounded-xl overflow-hidden shadow transition hover:shadow-lg border-t-4 border-green-500"
  >
   
    <div className="relative w-full aspect-[16/10]">
      <Image
        src={cabin.mainImage}
        alt={cabin.name}
        fill
        className="object-cover"
      />
    </div>

    
    <div className="p-4 flex flex-col gap-2">
      <h2 className="text-xl font-bold text-gray-800">{cabin.name}</h2>
      <p className="text-gray-600 text-sm line-clamp-2 min-h-[3rem]">{cabin.description}</p>

      <div className="text-sm text-gray-500">
        Capacidad: {cabin.maxGuests} pers · {cabin.rooms} habs · {cabin.bathrooms} baños
      </div>

      <div className="text-green-600 font-semibold text-base mt-auto">
        ${cabin.pricePerNight.toLocaleString()} / noche
      </div>
    </div>
  </div>
);

export default CabinCard; */




/* "use client";

import Image from "next/image";
import { Cabin } from "../types/cabin";

type Props = {
  cabin: Cabin;
};

const CabinCard = ({ cabin }: Props) => (
  <div
    key={cabin._id}
    className="flex flex-col sm:flex-row w-full max-w-4xl border rounded-xl overflow-hidden shadow hover:shadow-md transition"
  >
    
    <div className="relative w-full sm:w-1/2 aspect-[16/10] sm:aspect-auto">
      <Image
        src={cabin.mainImage}
        alt={cabin.name}
        fill
        className="object-cover"
      />
    </div>

    
    <div className="flex flex-col justify-between p-4 sm:w-1/2 gap-2">
      <div>
        <h2 className="text-xl font-bold text-gray-800">{cabin.name}</h2>
        <p className="text-gray-600 text-sm line-clamp-3 min-h-[4.5rem]">{cabin.description}</p>
      </div>

      <div className="text-sm text-gray-500">
        🧍 {cabin.maxGuests} pers · 🛏️ {cabin.rooms} habs · 🚿 {cabin.bathrooms} baños
      </div>

      <div className="text-right text-green-600 font-semibold text-lg">
        ${cabin.pricePerNight.toLocaleString()} / noche
      </div>
    </div>
  </div>
);

export default CabinCard;
 */



/* "use client";

import Image from "next/image";
import { Cabin } from "../types/cabin";

type Props = {
  cabin: Cabin;
};

const CabinCard = ({ cabin }: Props) => (
  <div
    key={cabin._id}
    className="w-full sm:w-[350px] bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300"
  >
   
    <div className="relative h-[200px] overflow-hidden group">
      <Image
        src={cabin.mainImage}
        alt={cabin.name}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-105"
      />
    </div>

    <div className="p-4 flex flex-col gap-2">
      <h2 className="text-lg font-semibold text-gray-800">{cabin.name}</h2>
      <p className="text-gray-600 text-sm line-clamp-2 min-h-[3rem]">
        {cabin.description}
      </p>

      <div className="text-sm text-gray-500">
        🧍 {cabin.maxGuests} pers · 🛏 {cabin.rooms} habs · 🚿 {cabin.bathrooms} baños
      </div>

      <p className="text-right text-green-600 font-bold text-base mt-2">
        ${cabin.pricePerNight.toLocaleString()} / noche
      </p>
    </div>
  </div>
);

export default CabinCard; */




/* "use client";

import Image from "next/image";
import { Cabin } from "../types/cabin";

type Props = {
  cabin: Cabin;
};

const CabinCard = ({ cabin }: Props) => (
  <div
    key={cabin._id}
    className="w-full sm:w-[350px] bg-white rounded-xl overflow-hidden cursor-pointer"
  >
    <div className="relative h-[200px] overflow-hidden group">
      <Image
        src={cabin.mainImage}
        alt={cabin.name}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-110"
      />
    </div>

    <div className="p-4 flex flex-col gap-2">
      <h2 className="text-lg font-semibold text-gray-800">{cabin.name}</h2>
      <p className="text-gray-600 text-sm line-clamp-2 min-h-[3rem]">
        {cabin.description}
      </p>

      <div className="text-sm text-gray-500">
        🧍 {cabin.maxGuests} pers · 🛏 {cabin.rooms} habs · 🚿 {cabin.bathrooms} baños
      </div>

      <p className="text-right text-green-600 font-bold text-base mt-2">
        ${cabin.pricePerNight.toLocaleString()} / noche
      </p>
    </div>
  </div>
);

export default CabinCard; */




/* "use client";

import Image from "next/image";
import { Cabin } from "../types/cabin";

type Props = {
  cabin: Cabin;
};

const CabinCard = ({ cabin }: Props) => (
  <div
    key={cabin._id}
    className="w-full sm:w-[350px] bg-white rounded-xl overflow-hidden relative group cursor-pointer"
  >
    
    <div className="relative w-full h-[200px] sm:h-[250px]">
      <Image
        src={cabin.mainImage}
        alt={cabin.name}
        layout="fill"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
    </div>

    
    <div className="p-4 bg-white bg-opacity-90 transition-all duration-300">
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

export default CabinCard; */




// Sin warnings de imagenes en la consola
/* "use client";

import Image from "next/image";
import { Cabin } from "../types/cabin";

type Props = {
  cabin: Cabin;
};

const CabinCard = ({ cabin }: Props) => (
  <div
    key={cabin._id}
    className="w-full sm:w-[350px] bg-white rounded-xl overflow-hidden relative group cursor-pointer"
  >
    <div className="relative w-full h-[200px] sm:h-[250px]">
      <Image
        src={cabin.mainImage}
        alt={cabin.name}
        fill
        priority // ✅ Solo si está visible al cargar
        sizes="(max-width: 640px) 100vw, 350px" // ✅ Tamaño que tendrá la imagen según el ancho de pantalla
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
    </div>

    <div className="p-4 bg-white bg-opacity-90 transition-all duration-300">
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

export default CabinCard; */




/* "use client";

import Image from "next/image";
import { Cabin } from "../types/cabin";

type Props = {
  cabin: Cabin;
};

const CabinCard = ({ cabin }: Props) => (
  <div
    key={cabin._id}
    className="w-full sm:w-[350px] bg-white rounded-xl overflow-hidden relative cursor-pointer"
  >
    <div className="relative w-full h-[200px] sm:h-[250px] group">
      <Image
        src={cabin.mainImage}
        alt={cabin.name}
        fill
        priority
        sizes="(max-width: 640px) 100vw, 350px"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
    </div>

    <div className="p-4 bg-white bg-opacity-90 transition-all duration-300">
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

export default CabinCard; */




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
