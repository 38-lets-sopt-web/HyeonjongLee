import { useNavigate } from "react-router-dom";
import type { Movie } from "../types/movie";

interface MovieCardProps {
  movie: Movie;
}

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const MovieCard = ({ movie }: MovieCardProps) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/${movie.id}`)}
      className="cursor-pointer rounded-lg overflow-hidden bg-white shadow hover:scale-105 hover:shadow-lg transition-transform duration-200"
    >
      <img
        src={`${IMAGE_BASE_URL}${movie.poster_path}`}
        alt={movie.title}
        className="w-full h-64 object-cover"
      />
      <div className="p-3">
        <h3 className="font-bold text-sm truncate">{movie.title}</h3>
        <p className="text-xs text-gray-500 mt-1">{movie.release_date}</p>
        <p className="text-xs text-gray-600 mt-2 line-clamp-3">{movie.overview}</p>
      </div>
    </div>
  );
};

export default MovieCard;
