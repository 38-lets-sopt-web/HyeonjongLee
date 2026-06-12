import { BrowserRouter, Routes, Route } from "react-router-dom";
import MovieListPage from "./pages/MovieListPage";
import MovieDetailPage from "./pages/MovieDetailPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MovieListPage />} />
        <Route path="/:movieId" element={<MovieDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
