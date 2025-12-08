import { BrowserRouter, Routes, Route } from "react-router-dom";

import { CharacterContext } from "./module/characters/character.context";
import { characterStore } from "./module/characters/characters.store";

import { RouteList } from "./routes/RouteList";

function App() {
  return (
    <BrowserRouter>
      <CharacterContext.Provider value={characterStore}>
        <Routes>
          {RouteList.map((r) => (
            <Route key={r.path} path={r.path} element={r.element} />
          ))}
        </Routes>
      </CharacterContext.Provider>
    </BrowserRouter>
  );
}

export default App;
