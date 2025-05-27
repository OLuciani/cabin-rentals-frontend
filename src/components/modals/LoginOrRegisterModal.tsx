"use client";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { useRouter } from "next/navigation";

interface AuthRequiredModalProps {
  open: boolean;
  onClose: () => void;
}

const LoginOrRegisterModal = ({ open, onClose }: AuthRequiredModalProps) => {
  const router = useRouter();

  const handleLogin = () => {
    onClose();
    router.push("/login");
  };

  const handleRegister = () => {
    onClose();
    router.push("/register");
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-gray-600 hover:text-black"
      >
        ✕
      </button>

      <DialogTitle>Iniciar sesión requerida</DialogTitle>
      <DialogContent>
        <p>
          Para reservar esta cabaña, primero necesitás iniciar sesión o crear
          una cuenta.
        </p>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleLogin}>Iniciar sesión</Button>
        <Button onClick={handleRegister}>Crear cuenta</Button>
      </DialogActions>
    </Dialog>
  );
};

export default LoginOrRegisterModal;
