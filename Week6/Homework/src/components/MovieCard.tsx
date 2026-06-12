import { useNavigate } from "react-router-dom";
import type { Movie } from "../types/movie";
import { POSTER_BASE_URL } from "../constants/image";

interface MovieCardProps {
  movie: Movie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/${movie.id}`)}
      className="cursor-pointer group relative rounded-lg overflow-hidden bg-zinc-900"
    >
      <img
        src={`${POSTER_BASE_URL}${movie.poster_path}`}
        alt={movie.title}
        className="w-full aspect-[2/3] object-cover group-hover:scale-105 transition-transform duration-300"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
        <h3 className="font-semibold text-sm text-white truncate">
          {movie.title}
        </h3>
        <p className="text-xs text-zinc-400 mt-0.5">{movie.release_date}</p>
        <p className="text-xs text-zinc-300 mt-1 line-clamp-2">
          {movie.overview}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;
