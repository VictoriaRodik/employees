import { JSX } from "react";
import { Navigate } from "react-router-dom";
import Alert from "@mui/material/Alert";

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const isExpired = Date.now() >= payload.exp * 1000;

    if (isExpired) {
      localStorage.removeItem("token");
      return <Navigate to="/login" replace />;
    }
  } catch (err) {
    localStorage.removeItem("token");
    const errorMessage =
      err instanceof Error ? err.message : "Token parsing error";
    return (
      <>
        <Alert severity="error">{errorMessage}</Alert>
        <Navigate to="/login" replace />
      </>
    );
  }

  return children;
};

export default RequireAuth;
