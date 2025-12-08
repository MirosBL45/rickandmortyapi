import { Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import { ROUTES } from "./router.constants";

import LoginPage from "../pages/LoginPage/LoginPage";
import CharacterListPage from "../pages/CharacterListPage/CharacterListPage";
import FavoritesPage from "../pages/FavoritesPage/FavoritesPage";
import ProtectedLayout from "../pages/ProtectedLayout/ProtectedLayout";

export const RouteList = [
  {
    path: ROUTES.LOGIN,
    element: <LoginPage />,
  },
  {
    path: ROUTES.CHARACTER_LIST,
    element: (
      <ProtectedRoute>
        <ProtectedLayout>
          <CharacterListPage />
        </ProtectedLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: ROUTES.FAVORITES,
    element: (
      <ProtectedRoute>
        <ProtectedLayout>
          <FavoritesPage />
        </ProtectedLayout>
      </ProtectedRoute>
    ),
  },

  // Default redirect
  {
    path: ROUTES.DEFAULT,
    element: <Navigate to={ROUTES.LOGIN} replace />,
  },
];
