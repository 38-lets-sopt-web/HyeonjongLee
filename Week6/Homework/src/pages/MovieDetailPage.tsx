import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  getMovieDetail,
  createGuestSession,
  postRating,
  deleteRating,
  getRatedMovies,
} from "../api/movie";
import { IMAGE_BASE_URL, POSTER_BASE_URL } from "../constants/image";

const getOrCreateGuestSession = async (): Promise<string> => {
  const existing = localStorage.getItem("guest_session_id");
  if (existing) return existing;
  const newId = await createGuestSession();
  localStorage.setItem("guest_session_id", newId);
  return newId;
};

const MovieDetailPage = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const [myRating, setMyRating] = useState<string>("");
  const [savedRating, setSavedRating] = useState<number | null>(null);
  const [message, setMessage] = useState<string>("");
  const [guestSessionId, setGuestSessionId] = useState<string>("");

  const { data: movie, isLoading } = useQuery({
    queryKey: ["movie", movieId],
    queryFn: () => getMovieDetail(Number(movieId)),
  });

  useEffect(() => {
    const init = async () => {
      const sessionId = await getOrCreateGuestSession();
      setGuestSessionId(sessionId);
      try {
        const rated = await getRatedMovies(sessionId);
        const found = rated.results.find((m) => m.id === Number(movieId));
        if (found && "rating" in found) {
          setSavedRating((found as { rating: number }).rating);
        }
      } catch {
        // 별점 없으면 무시
      }
    };
    init();
  }, [movieId]);

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-screen bg-zinc-950 text-zinc-400 text-sm">
        로딩 중...
      </div>
    );
  if (!movie) return null;

  const handleSaveRating = async () => {
    const rating = Number(myRating);
    if (rating < 0.5 || rating > 10) {
      setMessage("0.5 ~ 10.0 사이의 값을 입력해주세요.");
      return;
    }
    try {
      await postRating(Number(movieId), rating, guestSessionId);
      setSavedRating(rating);
      setMessage("저장되었습니다.");
    } catch {
      setMessage("저장에 실패했습니다.");
    }
  };

  const handleDeleteRating = async () => {
    try {
      await deleteRating(Number(movieId), guestSessionId);
      setSavedRating(null);
      setMyRating("");
      setMessage("별점이 삭제되었습니다.");
    } catch {
      setMessage("삭제에 실패했습니다.");
    }
  };

  const formatRuntime = (minutes: number) => {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return `${h}시간 ${m}분`;
  };

  const formatCurrency = (amount: number) => {
    if (amount === 0) return "—";
    return `$${amount.toLocaleString()}`;
  };

  return (
    <div className="bg-zinc-950 min-h-screen text-white">
      {/* 히어로 배경 */}
      <div className="relative overflow-hidden">
        <img
          src={`${IMAGE_BASE_URL}${movie.backdrop_path}`}
          alt={movie.title}
          className="w-full h-64 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
        <button
          onClick={() => navigate("/")}
          className="absolute top-6 left-6 text-sm text-zinc-300 hover:text-white flex items-center gap-2 transition-colors"
        >
          ← 목록으로 돌아가기
        </button>
      </div>

      {/* 포스터 + 기본 정보 */}
      <div className="max-w-4xl mx-auto px-8 -mt-16 relative z-10 flex gap-6 items-end mb-8">
        <img
          src={`${POSTER_BASE_URL}${movie.poster_path}`}
          alt={movie.title}
          className="w-32 rounded-lg shadow-2xl flex-shrink-0"
        />
        <div className="pb-1">
          <p className="text-zinc-400 text-sm mb-1">{movie.release_date}</p>
          <h1 className="text-3xl font-bold mb-3 leading-tight">
            {movie.title}
          </h1>
          <div className="flex flex-wrap gap-2 mb-3">
            {movie.genres.map((genre) => (
              <span
                key={genre.id}
                className="text-xs text-zinc-300 border border-zinc-600 px-2 py-0.5 rounded"
              >
                {genre.name}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-4 text-sm text-zinc-300">
            <span className="text-white font-semibold">
              ★ {movie.vote_average.toFixed(1)}
            </span>
            <span>{movie.vote_count.toLocaleString()}명 참여</span>
            <span>{formatRuntime(movie.runtime)}</span>
            <span className="border border-zinc-600 px-2 py-0.5 text-xs rounded">
              {movie.status}
            </span>
          </div>
        </div>
      </div>

      {/* 콘텐츠 */}
      <div className="max-w-4xl mx-auto px-8 py-10 flex flex-col gap-8">
        {/* 줄거리 */}
        <div>
          <h2 className="text-lg font-semibold mb-3 text-zinc-100">줄거리</h2>
          <p className="text-zinc-400 text-sm leading-relaxed">
            {movie.overview || "줄거리 정보가 없습니다."}
          </p>
        </div>

        <div className="h-px bg-zinc-800" />

        {/* 기본 정보 + 별점 */}
        <div className="grid grid-cols-2 gap-10">
          <div>
            <h2 className="text-lg font-semibold mb-4 text-zinc-100">
              기본 정보
            </h2>
            <dl className="flex flex-col gap-3 text-sm">
              {[
                { label: "원제", value: movie.original_title },
                { label: "원어", value: movie.original_language },
                {
                  label: "제작 국가",
                  value:
                    movie.production_countries.map((c) => c.name).join(", ") ||
                    "—",
                },
                {
                  label: "사용 언어",
                  value:
                    movie.spoken_languages.map((l) => l.name).join(", ") || "—",
                },
                { label: "예산", value: formatCurrency(movie.budget) },
                { label: "수익", value: formatCurrency(movie.revenue) },
              ].map(({ label, value }) => (
                <div key={label} className="flex gap-6">
                  <dt className="text-zinc-500 w-20 flex-shrink-0">{label}</dt>
                  <dd className="text-zinc-200">{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* 별점 */}
          <div>
            <h2 className="text-lg font-semibold mb-4 text-zinc-100">
              내 별점
            </h2>
            {savedRating !== null && (
              <p className="text-zinc-400 text-sm mb-3">
                현재{" "}
                <span className="text-white font-semibold">
                  {savedRating} / 10
                </span>
              </p>
            )}
            <input
              type="number"
              step="0.5"
              min="0.5"
              max="10"
              value={myRating}
              onChange={(e) => setMyRating(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-400 mb-3"
              placeholder="0.5 ~ 10.0"
            />
            <div className="flex gap-2">
              <button
                onClick={handleSaveRating}
                className="bg-white text-zinc-900 text-sm font-semibold px-5 py-2 rounded-lg hover:bg-zinc-200 transition-colors"
              >
                저장
              </button>
              {savedRating !== null && (
                <button
                  onClick={handleDeleteRating}
                  className="text-zinc-500 text-sm px-4 py-2 rounded-lg hover:text-zinc-300 transition-colors"
                >
                  삭제
                </button>
              )}
            </div>
            {message && <p className="text-zinc-400 text-xs mt-3">{message}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;
