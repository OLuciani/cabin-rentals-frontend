"use client";

import React from "react";
import { DeleteCabinModalProps } from "../types/deleteCabinTypes";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";

const DeleteCabinModal: React.FC<DeleteCabinModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  cabinName,
}) => {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Confirmar eliminación</DialogTitle>
      <DialogContent>
        ¿Estás seguro de que querés eliminar la cabaña <strong>{cabinName}</strong>?
        Esta acción no se puede deshacer.
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancelar
        </Button>
        <Button onClick={onConfirm} color="error" variant="contained">
          Eliminar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteCabinModal;
