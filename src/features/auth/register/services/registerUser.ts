/**
 * Servicio de registro de usuarios.
 *
 * Envía los datos del nuevo usuario al backend para crear una cuenta.
 * Utiliza `axiosInstance` para hacer la solicitud POST al endpoint de registro.
 */

import axiosInstance from '@/services/axiosInstance';
import { RegisterUserDTO, RegisteredUser } from '../types/userTypes';

export const registerUser = async (
  data: RegisterUserDTO
): Promise<RegisteredUser> => {
    const res = await axiosInstance.post('/api-proxy/api/users/register', data, {
    // withCredentials: true, // No es necesario en el registro porque no se manejan cookies aún
  });
  return res.data;
};
