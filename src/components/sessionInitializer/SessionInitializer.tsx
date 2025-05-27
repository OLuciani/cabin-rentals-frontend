'use client'; 

import { useEffect } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { useAuthFromCookies } from "@/hooks/useAuthFromCookies"; 

export default function SessionInitializer() {
  const fetchUser = useAuthStore((state) => state.fetchUser);

  // Este hook lee las cookies y setea el estado inicial para persistencia cuando se refresca una pagina por ejemplo.
  useAuthFromCookies();

  useEffect(() => {
    fetchUser();  // Intenta obtener el usuario cuando la app se carga
  }, [fetchUser]);

  return null; // Este componente no necesita renderizar nada
}