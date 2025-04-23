import axiosInstance from '@/services/axiosInstance';
import { LoginResponse, LoginRequest } from '../types/loginTypes'

export const getUser = async (
  values: LoginRequest
) => {
    const res = await axiosInstance.post<LoginResponse>('http://localhost:5000/api/auth/login',
        values,
        {
          withCredentials: true, // para que se guarden las cookies
        }
      );
  return res.data;
};
