import { create } from 'zustand';  // Primero, importamos `create` de Zustand.
import axios from 'axios';  // Vamos a usar axios para hacer peticiones al backend
import { toast } from 'react-toastify';


// Definimos el tipo de los datos que guardaremos en el store
interface User {
  id: string;
  name: string;
  role: string;
}

// El tipo del estado del store (authStore)
interface AuthState {
  user: User | null;  // El usuario puede ser un objeto o `null` si no está logueado
  isLoggedIn: boolean;  // Si el usuario está logueado o no
  fetchUser: () => Promise<void>;  // Función para obtener el perfil del usuario
  login: (user: User) => void;  // Función para iniciar sesión
  logout: () => void;  // Función para cerrar sesión

  setUser: (user: User | null) => void;
  setIsLoggedIn: (value: boolean) => void;
}

// Creamos el store
export const useAuthStore = create<AuthState>((set) => ({
  user: null,  // Inicialmente el usuario es null
  isLoggedIn: false,  // Inicialmente no está logueado
  fetchUser: async () => {  // Función que hace la petición al backend para obtener el perfil
    try {
      // Hacemos la petición al backend (suponiendo que tienes una API de usuario en /api/user-profile)
      const res = await axios.get(`http://localhost:5000/api/users/user-profile`, { withCredentials: true });
      set({ user: res.data, isLoggedIn: true });  // Si es exitoso, actualizamos el estado
    } catch (error) {
      console.error('No hay sesión activa', error);
      set({ user: null, isLoggedIn: false });  // Si hay un error (ej. no está logueado), ponemos el estado como no logueado
    }
  },
  login: (user) => set({ user, isLoggedIn: true }), // ← implementar función login
  /* logout: () => {  // Función para cerrar sesión
    set({ user: null, isLoggedIn: false });  // Limpiamos el estado cuando el usuario hace logout
  }, */
  logout: async (): Promise<void> => {
    try {
      await axios.post('http://localhost:5000/api/auth/logout', {}, { withCredentials: true }); // o tu ruta real
    } catch (error) {
      console.error("Error cerrando sesión en el backend", error);
    } finally {
      set({ user: null, isLoggedIn: false });

      toast.success("Sesión cerrada correctamente");

    }
  },
  setUser: (user) => set({ user }),
  setIsLoggedIn: (value) => set({ isLoggedIn: value }),
}));
