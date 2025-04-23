import axiosInstance from '@/services/axiosInstance';
import { RegisterUserDTO, RegisteredUser } from '../types/userTypes';

export const registerUser = async (
  data: RegisterUserDTO
): Promise<RegisteredUser> => {
    const res = await axiosInstance.post('http://localhost:5000/api/users/register', data, {
    withCredentials: true,
  });
  return res.data;
};
