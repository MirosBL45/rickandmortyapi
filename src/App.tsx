import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { CharacterContext } from "./context/CharacterContext";
import { characterStore } from "./store/CharacterStore";

import ProtectedLayout from "./pages/ProtectedLayout/ProtectedLayout";
import LoginPage from "./pages/LoginPage/LoginPage";
import CharacterListPage from "./pages/CharacterListPage/CharacterListPage";
import FavoritesPage from "./pages/FavoritesPage/FavoritesPage";

import ProtectedRoute from "./utils/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <CharacterContext.Provider value={characterStore}>
        <Routes>
          {/* Login page */}
          <Route path="/login" element={<LoginPage />} />

          {/* Protected character list page */}
          <Route
            path="/character-list"
            element={
              <ProtectedRoute>
                <ProtectedLayout>
                  <CharacterListPage />
                </ProtectedLayout>
              </ProtectedRoute>
            }
          />

          {/* Protected Favorites page */}
          <Route
            path="/favorites"
            element={
              <ProtectedRoute>
                <ProtectedLayout>
                  <FavoritesPage />
                </ProtectedLayout>
              </ProtectedRoute>
            }
          />

          {/* Default redirect */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </CharacterContext.Provider>
    </BrowserRouter>
  );
}

export default App;
