/* import { create } from 'zustand'; // Zustand para el store
import axios from 'axios'; // Axios para peticiones HTTP
import { toast } from 'react-toastify'; // Toast para mostrar notificaciones

// Tipo para representar al usuario
interface User {
  id: string;
  name: string;
  role: string;
}

// Tipo del estado del store
interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
  isLoadingUser: boolean;

  fetchUser: () => Promise<void>;
  login: (user: User) => void;
  logout: () => Promise<void>;
  setUser: (user: User | null) => void;
  setIsLoggedIn: (value: boolean) => void;
  setIsLoadingUser: (value: boolean) => void;
}

// Store Zustand para autenticación
export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoggedIn: false,
  isLoadingUser: true,

  // Obtener perfil del usuario desde el backend
  fetchUser: async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/users/user-profile', {
        withCredentials: true,
      });
      set({ user: res.data, isLoggedIn: true });
    } catch {
      if (process.env.NODE_ENV === 'development') {
        console.log('No hay sesión activa (esto es normal si el usuario no ha iniciado sesión)');
      }
      set({ user: null, isLoggedIn: false });
    } finally {
      set({ isLoadingUser: false }); // ✅ termina carga
    }
  },

  // Iniciar sesión (ej. después del login exitoso)
  login: (user) => set({ user, isLoggedIn: true }),

  // Cerrar sesión, incluyendo petición al backend
  logout: async () => {
    try {
      await axios.post('http://localhost:5000/api/auth/logout', {}, { withCredentials: true });
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
 */



import { create } from 'zustand'; // Zustand para el store
import axios from 'axios'; // Axios para peticiones HTTP
import { toast } from 'react-toastify'; // Toast para mostrar notificaciones

// Tipo para representar al usuario
interface User {
  id: string;
  name: string;
  lastName: string;
  email: string;
  role: string;
}

// Tipo del estado del store
interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
  isLoadingUser: boolean;

  fetchUser: () => Promise<void>;
  login: (user: User) => void;
  logout: () => Promise<void>;
  setUser: (user: User | null) => void;
  setIsLoggedIn: (value: boolean) => void;
  setIsLoadingUser: (value: boolean) => void;
}

// Store Zustand para autenticación
export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoggedIn: false,
  isLoadingUser: true,

  // Obtener perfil del usuario desde el backend
  fetchUser: async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/users/user-profile', {
        withCredentials: true,
      });
      set({ user: res.data, isLoggedIn: true });
    } catch {
      if (process.env.NODE_ENV === 'development') {
        console.log('No hay sesión activa (esto es normal si el usuario no ha iniciado sesión)');
      }
      set({ user: null, isLoggedIn: false });
    } finally {
      set({ isLoadingUser: false }); // ✅ termina carga
    }
  },

  // Iniciar sesión (ej. después del login exitoso)
  login: (user) => set({ user, isLoggedIn: true }),

  // Cerrar sesión, incluyendo petición al backend
  logout: async () => {
    try {
      await axios.post('http://localhost:5000/api/auth/logout', {}, { withCredentials: true });
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
