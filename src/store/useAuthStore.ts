import { create } from 'zustand'; // Zustand para el store
import axios from 'axios'; // Axios para peticiones HTTP
import { toast } from 'react-toastify'; // Toast para mostrar notificaciones
import type { AuthState } from '../types/auth';

// Configuro Axios para enviar cookies automáticamente
axios.defaults.withCredentials = true;

// Store Zustand para autenticación
export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoggedIn: false,
  isLoadingUser: true,

  // Obtener perfil del usuario desde el backend
  fetchUser: async () => {
  set({ isLoadingUser: true }); // <- también asegurate de esto al principio
  try {
    const res = await axios.get("/api-proxy/api/users/user-profile", {
      withCredentials: true,
    });
    console.log("RESPUESTA DE SOLICITUD A USER-PROFILE: ", res.data);
    set({ user: res.data, isLoggedIn: true });
  } catch {
    if (process.env.NODE_ENV === "development") {
      console.log(
        "No hay sesión activa (esto es normal si el usuario no ha iniciado sesión)"
      );
    }
    set({ user: null, isLoggedIn: false });
  } finally {
    set({ isLoadingUser: false });
  }
},

  // Iniciar sesión (ej. después del login exitoso)
  login: (user) => set({ user, isLoggedIn: true }),

  // Cerrar sesión, incluyendo petición al backend
  logout: async () => {
    try {
      
      await axios.post('/api-proxy/api/auth/logout', {}, { withCredentials: true });
    } catch (error) {
      console.error('Error cerrando sesión en el backend', error);
    } finally {
      set({ user: null, isLoggedIn: false });
      toast.success('Sesión cerrada correctamente');
    }
  },

  // Setters individuales
  setUser: (user) => set({ user }),
  setIsLoggedIn: (value) => set({ isLoggedIn: value }),
  setIsLoadingUser: (value) => set({ isLoadingUser: value }),
}));