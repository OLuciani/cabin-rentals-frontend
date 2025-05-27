"use client";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

interface BookingSuccessModalProps {
  open: boolean;
  onClose: () => void;
  cabinName: string;
  checkInDate: string;
  checkOutDate: string;
  guests: number;
  confirmationCode: string;
}

const BookingSuccessModal = ({
  open,
  onClose,
  cabinName,
  checkInDate,
  checkOutDate,
  guests,
  confirmationCode,
}: BookingSuccessModalProps) => {
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("es-AR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };
  return (
    <Dialog open={open} onClose={onClose}>
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-gray-600 hover:text-black"
      >
        ✕
      </button>

      <DialogTitle>¡Reserva exitosa!</DialogTitle>
      <DialogContent>
        <p className="mb-2">Tu reserva fue confirmada correctamente.</p>
        <ul className="text-sm text-gray-700">
          <li>
            <strong>Cabaña:</strong> {cabinName}
          </li>
          <li>
            <strong>Entrada:</strong> {formatDate(checkInDate)}
          </li>
          <li>
            <strong>Salida:</strong> {formatDate(checkOutDate)}
          </li>
          <li>
            <strong>Huéspedes:</strong> {guests}
          </li>
          <li>
            <strong>Código de confirmación:</strong> {confirmationCode}
          </li>
        </ul>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained" color="primary">
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BookingSuccessModal;
