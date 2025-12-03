import { Navigate } from "react-router-dom";
import React from "react";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const isLoggedIn = localStorage.getItem("loggedIn") === "true";

  return isLoggedIn ? <>{children}</> : <Navigate to="/login" replace />;
}
