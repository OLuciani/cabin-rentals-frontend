export interface LoginResponse {
    message: string;
    user: {
      id: string;
      name: string;
      lastName: string;
      email: string;
      role: string;
    };
  }

export interface LoginRequest {
    email: string;
    password: string;
}