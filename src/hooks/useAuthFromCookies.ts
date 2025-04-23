// ejemplo de lectura en un useEffect en el layout o NavBar
import Cookies from "js-cookie";
import { useAuthStore } from "@/store/useAuthStore";
import { useEffect } from "react";

export function useAuthFromCookies() {
  const setUser = useAuthStore((state) => state.setUser);
  const setIsLoggedIn = useAuthStore((state) => state.setIsLoggedIn);

  useEffect(() => {
    const token = Cookies.get("token"); // o el nombre que usaste
    const user = Cookies.get("user"); // si guardás info del usuario

    if (token && user) {
      setIsLoggedIn(true);
      setUser(JSON.parse(user));
    }
  }, [setIsLoggedIn, setUser]);
}
