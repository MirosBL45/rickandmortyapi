import { Navigate } from "react-router-dom";
import React from "react";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

// Todo: protected route ide u /src/components , ili jos bolje,cesto je praksa da sve za rutiranje ubacimo u /src/routes/

// cesto u routes imamo RouteList + router.constants.ts ( pogledati primer na nekom drugom projektu )

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const isLoggedIn = localStorage.getItem("loggedIn") === "true";

  return isLoggedIn ? <>{children}</> : <Navigate to="/login" replace />;
}
