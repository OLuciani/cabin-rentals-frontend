// Componente `CabinHeader`
//
// Muestra la imagen principal, el nombre, la ubicación y la descripción de una cabaña.
// Incluye un botón para reservar la cabaña y permite abrir un modal para visualizar la imagen en grande.
// Este componente es parte del feature `cabins/cabinDetail` y se usa en la página de detalle de cabaña.

"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { CabinDetailProps } from "../types/cabinDetailTypes";
import { Button } from "@mui/material";
import { useAuthStore } from "@/store/useAuthStore";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import AvailabilityCalendar from "./AvailabilityCalendar";

const CabinHeader: React.FC<CabinDetailProps> = ({
  cabin,
  openModal,
  handleReserveClick,
  onEditClick,
  onShowCalendar,
  onCreateBooking,
  onDeleteCabin,
}) => {
  const { user } = useAuthStore();

  const pathname = usePathname();
  const isInDashboard = pathname.startsWith("/dashboardAppAdmin");

  const searchParams = useSearchParams();
  const router = useRouter();

  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  //const [showCalendarButton, setShowCalendarButton] = useState(true);
  const [showCalendar, setShowCalendar] = useState(false);

  // 📌 Referencia para el scroll al calendario
  const calendarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setStartDate(searchParams.get("startDate"));
    setEndDate(searchParams.get("endDate"));
  }, [searchParams]);

  // 📌 Cuando se abre el calendario, hacer scroll automático
  useEffect(() => {
    if (showCalendar && calendarRef.current) {
      calendarRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [showCalendar]);

  const onBackOfBooking = () => {
    setStartDate(null);
    setEndDate(null);
    setShowCalendar(false);

    // Esto borra las fechas de la URL
    const params = new URLSearchParams(searchParams.toString());
    params.set("startDate", "");
    params.set("endDate", "");
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="space-y-6">
      {cabin && (
        <>
          <div className="flex justify-center">
            <div
              className={`w-full sm:w-[70%] overflow-hidden rounded-lg cursor-pointer group`}
            >
              <Image
                src={cabin.mainImage}
                alt={cabin.name}
                width={1000}
                height={667}
                priority
                className="w-full h-auto rounded-lg transition-transform duration-500 group-hover:scale-105 object-cover"
                onClick={() => openModal && openModal(0)}
              />
            </div>
          </div>

          <div
            className="w-full flex flex-col justify-center items-center gap-4 md:flex-row md:flex-wrap md:justify-evenly"
            ref={calendarRef} // 📌 Ref para scroll
          >
            {!isInDashboard && !startDate && !endDate &&  (
              <AvailabilityCalendar
                cabinId={cabin._id}
                setStartDate={setStartDate}
                setEndDate={setEndDate}
                //setShowCalendarButton={setShowCalendarButton}
                onDateRangeSetInUrl={(startDateStr, endDateStr) => {
                  const params = new URLSearchParams(searchParams.toString());
                  params.set("startDate", startDateStr);
                  params.set("endDate", endDateStr);
                  router.replace(`${pathname}?${params.toString()}`);
                }}
                setShowCalendar={setShowCalendar}
                showCalendar={showCalendar}
              />
            )}

            {!isInDashboard && startDate && endDate && (
              <div className="flex flex-col justify-center items-center space-y-4 border-[2px] py-4 px-8 rounded-lg">
                <div className="flex justify-center animate-fade-in-up">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleReserveClick}
                    className="w-64 mt-4"
                  >
                    Reservar esta cabaña
                  </Button>
                </div>

                <div className="w-full flex flex-col justify-center items-center space-y-2">
                  <p className="text-center font-semibold">
                    Fechas seleccionadas:
                  </p>
                  <div>
                    <p className="text-sm text-gray-600 mb-2">
                      Fecha de entrada:{" "}
                      <span className="font-semibold">
                        {new Date(startDate).toLocaleDateString()}
                      </span>
                    </p>
                    <p className="text-sm text-gray-600 mb-2">
                      Fecha de salida:{" "}
                      <span className="font-semibold">
                        {new Date(endDate).toLocaleDateString()}
                      </span>
                    </p>
                  </div>
                </div>
                <Button
                  onClick={onBackOfBooking}
                  variant="contained"
                  color="inherit"
                  className="w-64 mt-4"
                >
                  BORRAR FECHAS
                </Button>
              </div>
            )}

            {user?.role === "admin" && isInDashboard && (
              <>
                <div>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={onShowCalendar}
                    className="w-64 mt-4"
                  >
                    Ver calendario
                  </Button>
                </div>

                <div>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={onCreateBooking}
                    className="w-64 mt-4"
                  >
                    Crear reserva manual
                  </Button>
                </div>

                <div>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={onEditClick}
                    className="w-64 mt-4"
                  >
                    Editar esta cabaña
                  </Button>
                </div>

                <div>
                  <Button
                    variant="contained"
                    color="warning"
                    onClick={onDeleteCabin}
                    className="w-64 mt-4"
                  >
                    Eliminar esta cabaña
                  </Button>
                </div>
              </>
            )}
          </div>

          <div className="text-center space-y-1">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
              {cabin.name}
            </h1>
            <p className="text-gray-500 font-semibold text-base dark:text-gray-400">
              {cabin.location}
            </p>
          </div>
          <p className="text-center text-gray-700 leading-relaxed dark:text-gray-300">
            {cabin.description}
          </p>
        </>
      )}
    </div>
  );
};

export default CabinHeader;

