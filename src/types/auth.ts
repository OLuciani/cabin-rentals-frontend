import type { User } from './User';

// Tipo del estado del store
export interface AuthState {
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