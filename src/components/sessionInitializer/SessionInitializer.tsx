'use client'; 

import { useEffect } from 'react';
import { useAuthStore } from '@/store/useAuthStore';

export default function SessionInitializer() {
  const fetchUser = useAuthStore((state) => state.fetchUser);

  useEffect(() => {
    fetchUser();  // Intenta obtener el usuario cuando la app se carga
    console.log("Se ejecutó el componente SessionInitializer.tsx")
  }, [fetchUser]);

  return null; // Este componente no necesita renderizar nada
}