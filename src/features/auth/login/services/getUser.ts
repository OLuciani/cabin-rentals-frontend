// Servicio que realiza la petición de inicio de sesión al backend.
//
// Envía los datos del formulario (email y contraseña) al endpoint de login.
// Si las credenciales son correctas, el backend responde con la información del usuario.
// Se utiliza `withCredentials: true` para que el navegador almacene las cookies (token, etc.)

import axiosInstance from '@/services/axiosInstance';
import { LoginResponse, LoginRequest } from '../types/loginTypes'

// Función asincrónica que envía las credenciales de login al servidor.
export const getUser = async (
  values: LoginRequest
) => {
    const res = await axiosInstance.post<LoginResponse>('/api-proxy/api/auth/login',
        values,
        {
          withCredentials: true, // para que se guarden las cookies
        }
      );
  return res.data;
};
