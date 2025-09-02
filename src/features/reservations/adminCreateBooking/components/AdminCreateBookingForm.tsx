/* //Componente original que andaba re bien antes de los tests
"use client";

import React, { useState, useEffect, useRef } from "react";
import { createAdminBooking } from "../services/createBookingService";
import { IAdminCreateBooking } from "../types/adminBookingTypes";
import axios from "axios";
import AvailabilityCalendar from "@/features/cabins/cabinDetail/components/AvailabilityCalendar";
import { Button } from "@mui/material";
import { toast } from "react-toastify";

interface AdminCreateBookingFormProps {
  cabinId: string;
  setSection: (section: string) => void;
}

const AdminCreateBookingForm: React.FC<AdminCreateBookingFormProps> = ({
  cabinId,
  setSection,
}) => {
  const [formData, setFormData] = useState<IAdminCreateBooking>({
    cabinId,
    startDate: "",
    endDate: "",
    numberOfGuests: 1,
    message: "",
    clientName: "",
    clientEmail: "",
    clientPhone: "",
  });

  const [error, setError] = useState<string | null>(null);
  //const [success, setSuccess] = useState(false);
  const [cabinName, setCabinName] = useState<string>("");

  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  //const [, setShowCalendarButton] = useState(true);

  const [showCalendar, setShowCalendar] = useState(false);

  // Ref para el contenedor del calendario (scrollIntoView)
  const calendarContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchCabinName = async () => {
      try {
        const response = await axios.get(
          `/api-proxy/api/cabins/cabinDetail/${cabinId}`
        );
        setCabinName(response.data.name);
      } catch (error) {
        console.error("Error al obtener el nombre de la cabaña:", error);
        setCabinName("Nombre no disponible");
      }
    };

    fetchCabinName();
  }, [cabinId]);

  useEffect(() => {
    setFormData((prev) => ({ ...prev, cabinId }));
  }, [cabinId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    //setSuccess(false);

    try {
      await createAdminBooking({
        ...formData,
        startDate: startDate || "",
        endDate: endDate || "",
      });

      //setSuccess(true);
      toast.success("✅ Reserva creada con éxito", { autoClose: 3000 });

      setFormData({
        cabinId,
        startDate: "",
        endDate: "",
        numberOfGuests: 1,
        message: "",
        clientName: "",
        clientEmail: "",
        clientPhone: "",
      });
      setStartDate(null);
      setEndDate(null);
      // Redirigir a la vista de reservas en dashboard después de 3s
      setTimeout(() => {
        setSection("allBookings");
      }, 3000);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message || "Error de red");
      } else if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Error desconocido");
      }
    }
  };

  useEffect(() => {
    const main = document.getElementById("dashboard-scroll-container");
    if (main) main.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const changeDates = () => {
    setStartDate(null);
    setEndDate(null);
    setShowCalendar(false);
  };

  // Cuando showCalendar pasa a true, hacemos scroll hacia el contenedor del calendario
  useEffect(() => {
    if (showCalendar && calendarContainerRef.current) {
      // requestAnimationFrame para asegurar que el DOM ya esté pintado
      requestAnimationFrame(() => {
        calendarContainerRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      });
    }
  }, [showCalendar]);

  return (
    <form
      onSubmit={handleSubmit}
      className="relative space-y-4 flex flex-col max-w-xl mx-auto bg-white dark:bg-gray-800 text-black dark:text-white p-6 rounded-xl shadow-md"
    >
      <button
        type="button"
        onClick={() => setSection("cabinDetail")}
        className="absolute text-sm md:text-base text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors mb-2"
      >
        ← Volver
      </button>

      <h2 className="text-xl font-semibold pt-6">
        Crear reserva para: <span className="text-blue-600">{cabinName}</span>
      </h2>

      <div>
        <label htmlFor="clientName" className="block font-medium mb-1">
          Nombre y apellido del cliente
        </label>
        <input
          type="text"
          id="clientName"
          name="clientName"
          value={formData.clientName}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-900 text-black dark:text-white"
        />
      </div>

      <div>
        <label htmlFor="clientEmail" className="block font-medium mb-1">
          Email del cliente
        </label>
        <input
          type="email"
          id="clientEmail"
          name="clientEmail"
          value={formData.clientEmail}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-900 text-black dark:text-white"
        />
      </div>

      <div>
        <label htmlFor="clientPhone" className="block font-medium mb-1">
          Teléfono del cliente
        </label>
        <input
          type="tel"
          id="clientPhone"
          name="clientPhone"
          value={formData.clientPhone}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-900 text-black dark:text-white"
        />
      </div>

      <div>
        <label className="block font-medium mb-1">
          Seleccionar fechas de entrada y salida
        </label>

        
        <div
          className="p-4 border-2 rounded-lg space-y-4"
          ref={calendarContainerRef}
        >
          {!startDate && !endDate ? (
            <>
              <AvailabilityCalendar
                cabinId={cabinId}
                setStartDate={setStartDate}
                setEndDate={setEndDate}
                //setShowCalendarButton={setShowCalendarButton}
                setShowCalendar={setShowCalendar}
                showCalendar={showCalendar}
              />
              <p className="text-center text-red-500">
                No hay fechas seleccionadas
              </p>
            </>
          ) : (
            <>
              <div className="flex justify-center">
                <Button
                  variant="contained"
                  color="inherit"
                  onClick={changeDates}
                >
                  Borrar fechas
                </Button>
              </div>
            </>
          )}
        </div>
      </div>

      {startDate && endDate && (
        <>
          <div>
            <label htmlFor="startDate" className="block mb-1 font-medium">
              Fecha de entrada
            </label>
            <input
              type="text"
              name="startDate"
              id="startDate"
              value={
                startDate
                  ? new Date(startDate).toLocaleDateString("es-AR", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })
                  : ""
              }
              readOnly
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-gray-100 dark:bg-gray-900 text-black dark:text-white cursor-not-allowed"
            />
          </div>

          <div>
            <label htmlFor="endDate" className="block mb-1 font-medium">
              Fecha de salida
            </label>
            <input
              type="text"
              name="endDate"
              id="endDate"
              value={
                endDate
                  ? new Date(endDate).toLocaleDateString("es-AR", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })
                  : ""
              }
              readOnly
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-gray-100 dark:bg-gray-900 text-black dark:text-white cursor-not-allowed"
            />
          </div>
        </>
      )}

      <div>
        <label htmlFor="numberOfGuests" className="block mb-1 font-medium">
          Cantidad de huéspedes
        </label>
        <input
          type="number"
          name="numberOfGuests"
          id="numberOfGuests"
          min={1}
          value={formData.numberOfGuests}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-900 text-black dark:text-white"
        />
      </div>

      <div>
        <label htmlFor="message" className="block mb-1 font-medium">
          Mensaje (opcional)
        </label>
        <textarea
          name="message"
          id="message"
          placeholder="Agregá una nota si lo deseás..."
          value={formData.message}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-900 text-black dark:text-white"
        />
      </div>

      {error && <p className="text-red-600 dark:text-red-400">{error}</p>}

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded font-semibold"
      >
        Crear reserva
      </button>
    </form>
  );
};

export default AdminCreateBookingForm;  */






"use client";

import React, { useState, useEffect, useRef } from "react";
import { createAdminBooking } from "../services/createBookingService";
import { IAdminCreateBooking } from "../types/adminBookingTypes";
import axios from "axios";
import AvailabilityCalendar from "@/features/cabins/cabinDetail/components/AvailabilityCalendar";
import { Button } from "@mui/material";
import { toast } from "react-toastify";

interface AdminCreateBookingFormProps {
  cabinId: string;
  setSection: (section: string) => void;
}

const AdminCreateBookingForm: React.FC<AdminCreateBookingFormProps> = ({
  cabinId,
  setSection,
}) => {
  const [formData, setFormData] = useState<IAdminCreateBooking>({
    cabinId,
    startDate: "",
    endDate: "",
    numberOfGuests: 1,
    message: "",
    clientName: "",
    clientEmail: "",
    clientPhone: "",
  });

  const [error, setError] = useState<string | null>(null);
  //const [success, setSuccess] = useState(false);
  const [cabinName, setCabinName] = useState<string>("");
  //const [, setShowCalendarButton] = useState(true);
  
  const [showCalendar, setShowCalendar] = useState(false);

  // Ref para el contenedor del calendario (scrollIntoView)
  const calendarContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchCabinName = async () => {
      try {
        const response = await axios.get(
          `/api-proxy/api/cabins/cabinDetail/${cabinId}`
        );
        setCabinName(response.data.name);
      } catch (error) {
        console.error("Error al obtener el nombre de la cabaña:", error);
        setCabinName("Nombre no disponible");
      }
    };

    fetchCabinName();
  }, [cabinId]);

  useEffect(() => {
    setFormData((prev) => ({ ...prev, cabinId }));
  }, [cabinId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Verificación final de que las fechas están presentes
    if (!formData.startDate || !formData.endDate) {
      setError("Por favor, seleccione una fecha de entrada y salida.");
      return;
    }

    try {
      await createAdminBooking({
        ...formData,
        numberOfGuests: Number(formData.numberOfGuests),
      });

      toast.success("✅ Reserva creada con éxito", { autoClose: 3000 });
      setFormData({
        cabinId,
        startDate: "",
        endDate: "",
        numberOfGuests: 1,
        message: "",
        clientName: "",
        clientEmail: "",
        clientPhone: "",
      });
      setTimeout(() => {
        setSection("allBookings");
      }, 3000);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message || "Error de red");
      } else if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Error desconocido");
      }
    }
  };

  useEffect(() => {
    const main = document.getElementById("dashboard-scroll-container");
    if (main) main.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const changeDates = () => {
    setFormData((prev) => ({
      ...prev,
      startDate: "",
      endDate: "",
    }));
    setShowCalendar(false);
  };

  // Cuando showCalendar pasa a true, hacemos scroll hacia el contenedor del calendario
  useEffect(() => {
    if (showCalendar && calendarContainerRef.current) {
      // requestAnimationFrame para asegurar que el DOM ya esté pintado
      requestAnimationFrame(() => {
        calendarContainerRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      });
    }
  }, [showCalendar]);

  return (
    <form
      onSubmit={handleSubmit}
      className="relative space-y-4 flex flex-col max-w-xl mx-auto bg-white dark:bg-gray-800 text-black dark:text-white p-6 rounded-xl shadow-md"
    >
      <button
        type="button"
        onClick={() => setSection("cabinDetail")}
        className="absolute text-sm md:text-base text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors mb-2"
      >
        ← Volver
      </button>

      <h2 className="text-xl font-semibold pt-6">
        Crear reserva para: <span className="text-blue-600">{cabinName}</span>
      </h2>

      <div>
        <label htmlFor="clientName" className="block font-medium mb-1">
          Nombre y apellido del cliente
        </label>
        <input
          type="text"
          id="clientName"
          name="clientName"
          value={formData.clientName}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-900 text-black dark:text-white"
        />
      </div>

      <div>
        <label htmlFor="clientEmail" className="block font-medium mb-1">
          Email del cliente
        </label>
        <input
          type="email"
          id="clientEmail"
          name="clientEmail"
          value={formData.clientEmail}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-900 text-black dark:text-white"
        />
      </div>

      <div>
        <label htmlFor="clientPhone" className="block font-medium mb-1">
          Teléfono del cliente
        </label>
        <input
          type="tel"
          id="clientPhone"
          name="clientPhone"
          value={formData.clientPhone}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-900 text-black dark:text-white"
        />
      </div>

      <div>
        <label className="block font-medium mb-1">
          Seleccionar fechas de entrada y salida
        </label>

        {/* ← Aquí está el contenedor que scrollea */}
        <div
          className="p-4 border-2 rounded-lg space-y-4"
          ref={calendarContainerRef}
        >
          {!formData.startDate && !formData.endDate ? (
            <>
              <AvailabilityCalendar
                cabinId={cabinId}
                setStartDate={(newStartDate) => setFormData((prev) => ({
                    ...prev,
                    startDate:
                      typeof newStartDate === "function"
                        ? newStartDate(prev.startDate) || ""
                        : newStartDate || "",
                  }))}
                setEndDate={(newEndDate) => setFormData((prev) => ({
                    ...prev,
                    endDate:
                      typeof newEndDate === "function"
                        ? newEndDate(prev.endDate) || ""
                        : newEndDate || "",
                  }))}
                //setShowCalendarButton={setShowCalendarButton}
                setShowCalendar={setShowCalendar}
                showCalendar={showCalendar}
              />
              <p className="text-center text-red-500">
                No hay fechas seleccionadas
              </p>
            </>
          ) : (
            <>
              <div className="flex justify-center">
                <Button
                  variant="contained"
                  color="inherit"
                  onClick={changeDates}
                >
                  Borrar fechas
                </Button>
              </div>
            </>
          )}
        </div>
      </div>

      {formData.startDate && formData.endDate && (
        <>
          <div>
            <label htmlFor="startDate" className="block mb-1 font-medium">
              Fecha de entrada
            </label>
            <input
              type="text"
              name="startDate"
              id="startDate"
              value={
                formData.startDate
                  ? new Date(formData.startDate).toLocaleDateString("es-AR", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })
                  : ""
              }
              readOnly
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-gray-100 dark:bg-gray-900 text-black dark:text-white cursor-not-allowed"
            />
          </div>

          <div>
            <label htmlFor="endDate" className="block mb-1 font-medium">
              Fecha de salida
            </label>
            <input
              type="text"
              name="endDate"
              id="endDate"
              value={
                formData.endDate
                  ? new Date(formData.endDate).toLocaleDateString("es-AR", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })
                  : ""
              }
              readOnly
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-gray-100 dark:bg-gray-900 text-black dark:text-white cursor-not-allowed"
            />
          </div>
        </>
      )}

      <div>
        <label htmlFor="numberOfGuests" className="block mb-1 font-medium">
          Cantidad de huéspedes
        </label>
        <input
          type="number"
          name="numberOfGuests"
          id="numberOfGuests"
          min={1}
          value={formData.numberOfGuests}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-900 text-black dark:text-white"
        />
      </div>

      <div>
        <label htmlFor="message" className="block mb-1 font-medium">
          Mensaje (opcional)
        </label>
        <textarea
          name="message"
          id="message"
          placeholder="Agregá una nota si lo deseás..."
          value={formData.message}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-900 text-black dark:text-white"
        />
      </div>

      {error && <p className="text-red-600 dark:text-red-400">{error}</p>}

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded font-semibold"
      >
        Crear reserva
      </button>
    </form>
  );
};

export default AdminCreateBookingForm;
