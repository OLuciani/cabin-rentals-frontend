import axiosInstance from '@/services/axiosInstance';
import { LoginResponse, LoginRequest } from '../types/loginTypes'

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
