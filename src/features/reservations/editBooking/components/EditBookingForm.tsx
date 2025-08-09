/* "use client";

import React, { useState, useEffect } from "react";
import {
  EditBookingFormProps,
  EditBookingPayload,
} from "../types/editBookingTypes";
import { useEditBooking } from "../hooks/useEditBooking";
//import { BookingResponse } from "../../allBookings/types/allBookingsTypes";
import { getBookingById } from "../../bookingDetail/services/getBookingById";

const EditBookingForm: React.FC<EditBookingFormProps> = ({
  bookingId,
  onBack,
}) => {
  const [formData, setFormData] = useState<EditBookingPayload | null>(null);
  const { editBooking, loading, error, success } = useEditBooking(bookingId);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const { data } = await getBookingById(bookingId);
        setFormData({
          clientName: data.clientName,
          clientEmail: data.clientEmail,
          clientPhone: data.clientPhone,
          startDate: data.startDate,
          endDate: data.endDate,
          numberOfGuests: data.numberOfGuests,
          status: data.status,
          paymentStatus: data.paymentStatus,
          message: data.message || "",
        });
      } catch (e) {
        console.log("Error al obtener la reserva: ", e);
        console.error("Error al obtener la reserva");
      }
    };

    fetchBooking();
  }, [bookingId]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    if (!formData) return;
    const { name, value } = e.target;
    setFormData((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;
    await editBooking(formData);
  };

  if (!formData) return <p>Cargando datos de la reserva...</p>;

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Editar Reserva</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="clientName"
          value={formData.clientName}
          onChange={handleChange}
          placeholder="Nombre"
          className="w-full p-2 border rounded"
        />
        <input
          name="clientEmail"
          value={formData.clientEmail}
          onChange={handleChange}
          placeholder="Email"
          className="w-full p-2 border rounded"
        />
        <input
          name="clientPhone"
          value={formData.clientPhone}
          onChange={handleChange}
          placeholder="Teléfono"
          className="w-full p-2 border rounded"
        />
        <input
          type="date"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="date"
          name="endDate"
          value={formData.endDate}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          name="numberOfGuests"
          value={formData.numberOfGuests}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="pending">Pendiente</option>
          <option value="confirmed">Confirmada</option>
          <option value="cancelled">Cancelada</option>
        </select>
        <select
          name="paymentStatus"
          value={formData.paymentStatus}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="unpaid">No pagado</option>
          <option value="paid">Pagado</option>
        </select>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Mensaje"
          className="w-full p-2 border rounded"
        />
        <div className="flex justify-between items-center">
          <button
            type="button"
            onClick={onBack}
            className="text-gray-600 hover:underline"
          >
            Volver
          </button>
          <button
            type="submit"
            className="bg-primary text-white px-4 py-2 rounded"
            disabled={loading}
          >
            {loading ? "Guardando..." : "Guardar cambios"}
          </button>
        </div>
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-600">Reserva actualizada</p>}
      </form>
    </div>
  );
};

export default EditBookingForm; */

"use client";

import React, { useState, useEffect } from "react";
import {
  EditBookingFormProps,
  EditBookingPayload,
} from "../types/editBookingTypes";
import { useEditBooking } from "../hooks/useEditBooking";
//import { BookingResponse } from "../../allBookings/types/allBookingsTypes";
import { getBookingById } from "../../bookingDetail/services/getBookingById";

const EditBookingForm: React.FC<EditBookingFormProps> = ({
  bookingId,
  onBack,
}) => {
  const [formData, setFormData] = useState<EditBookingPayload | null>(null);
  const { editBooking, loading, error, success } = useEditBooking(bookingId);

  const formatDate = (isoDate: string) => {
    return isoDate.split("T")[0]; // Devuelve este formato "2025-08-30"
  };

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const res = await getBookingById(bookingId);
        setFormData({
          clientName: res.data.clientName,
          clientEmail: res.data.clientEmail,
          clientPhone: res.data.clientPhone,
          //startDate: res.data.startDate,
          //endDate: res.data.endDate,
          startDate: formatDate(res.data.startDate),
          endDate: formatDate(res.data.endDate),
          numberOfGuests: res.data.numberOfGuests,
          status: res.data.status,
          paymentStatus: res.data.paymentStatus,
          message: res.data.message || "",
        });
      } catch (e) {
        console.log("Error al obtener la reserva: ", e);
        console.error("Error al obtener la reserva");
      }
    };

    fetchBooking();
  }, [bookingId]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    if (!formData) return;
    const { name, value } = e.target;
    setFormData((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;
    await editBooking(formData);
  };

  if (!formData)
    return <p className="text-center mt-6">Cargando datos de la reserva...</p>;

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
      <button
        onClick={onBack}
        className="text-sm md:text-base text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors mb-4"
      >
        ← Volver
      </button>

      <h2 className="text-xl font-bold mb-6 text-center">Editar Reserva</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Nombre del cliente</label>
          <input
            name="clientName"
            value={formData.clientName}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Email</label>
          <input
            name="clientEmail"
            value={formData.clientEmail}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Teléfono</label>
          <input
            name="clientPhone"
            value={formData.clientPhone}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">Fecha de entrada</label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Fecha de salida</label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>

        <div>
          <label className="block font-medium mb-1">
            Cantidad de huéspedes
          </label>
          <input
            type="number"
            name="numberOfGuests"
            value={formData.numberOfGuests}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">
              Estado de la reserva
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="pending">Pendiente</option>
              <option value="confirmed">Confirmada</option>
              <option value="cancelled">Cancelada</option>
            </select>
          </div>

          <div>
            <label className="block font-medium mb-1">Estado del pago</label>
            <select
              name="paymentStatus"
              value={formData.paymentStatus}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="unpaid">No pagado</option>
              <option value="paid">Pagado</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block font-medium mb-1">Mensaje</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Mensaje del cliente (opcional)"
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="flex justify-between items-center mt-6">
          {/* <button
            type="button"
            onClick={onBack}
            className="text-gray-600 hover:underline"
          >
            Volver
          </button> */}
          <button
            type="submit"
            className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark transition"
            disabled={loading}
          >
            {loading ? "Guardando..." : "Guardar cambios"}
          </button>
        </div>

        {error && <p className="text-red-500 mt-2">{error}</p>}
        {success && <p className="text-green-600 mt-2">Reserva actualizada</p>}
      </form>
    </div>
  );
};

export default EditBookingForm;
