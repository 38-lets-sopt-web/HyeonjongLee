import { BrowserRouter, Routes, Route } from "react-router-dom";
import MovieListPage from "./pages/MovieListPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MovieListPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
