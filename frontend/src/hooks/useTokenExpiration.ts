import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useTokenExpiration = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const exp = payload.exp * 1000;
      const timeUntilLogout = exp - Date.now();

      if (timeUntilLogout <= 0) {
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        const timer = setTimeout(() => {
          localStorage.removeItem("token");
          navigate("/login");
        }, timeUntilLogout);

        return () => clearTimeout(timer);
      }
    } catch (err) {
      localStorage.removeItem("token");
      const errorMessage =
        err instanceof Error ? err.message : "Token parsing error";
      console.error(errorMessage);
      navigate("/login");
    }
  }, [navigate]);
};

export default useTokenExpiration;
