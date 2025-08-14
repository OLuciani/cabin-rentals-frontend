// Esta página es un mockup por el momento

import React from "react";

const UserCurrentReservations = () => {
  // Datos de ejemplo, reemplazar con la API más adelante
  const reservation = {
    cabinName: "Cabaña La Tranquila",
    startDate: new Date("2025-08-20"),
    endDate: new Date("2025-08-23"),
    totalPrice: 300,
    paidAmount: 150, // pago parcial
    paymentStatus: "partial", // unpaid, paid, partial
    guests: 4,
  };

  const remainingAmount = reservation.totalPrice - reservation.paidAmount;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl text-center mt-4 mb-6">Reservas vigentes</h1>

      <div className="border p-4 rounded-lg shadow-md space-y-4">
        <h2 className="text-xl font-semibold">{reservation.cabinName}</h2>
        <p>
          <strong>Fechas:</strong>{" "}
          {reservation.startDate.toLocaleDateString()} -{" "}
          {reservation.endDate.toLocaleDateString()}
        </p>
        <p>
          <strong>Huéspedes:</strong> {reservation.guests}
        </p>
        <p>
          <strong>Total:</strong> ${reservation.totalPrice.toFixed(2)}
        </p>
        <p>
          <strong>Pagado:</strong> ${reservation.paidAmount.toFixed(2)}
        </p>
        <p>
          <strong>Saldo restante:</strong> ${remainingAmount.toFixed(2)}
        </p>

        {reservation.paymentStatus !== "paid" && (
          <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">
            Pagar saldo pendiente
          </button>
        )}
      </div>
    </div>
  );
};

export default UserCurrentReservations;
