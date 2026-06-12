import { useState, useEffect, useRef } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getMovies } from "../api/movie";
import MovieCard from "../components/MovieCard";

interface VoteOption {
  label: string;
  min?: number;
  max?: number;
}

const VOTE_OPTIONS: VoteOption[] = [
  { label: "전체 별점" },
  ...Array.from({ length: 9 }, (_, i) => ({
    label: `${i + 1}점대`,
    min: i + 1,
    max: i + 1.99,
  })),
];

const MovieListPage = () => {
  const [voteFilter, setVoteFilter] = useState<VoteOption>(VOTE_OPTIONS[0]);
  const observerRef = useRef<HTMLDivElement>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["movies", voteFilter],
      queryFn: ({ pageParam }) =>
        getMovies(pageParam, voteFilter.min, voteFilter.max),
      initialPageParam: 1,
      getNextPageParam: (lastPage) =>
        lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
    });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 },
    );

    if (observerRef.current) observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const movies = data?.pages.flatMap((page) => page.results) ?? [];

  return (
    <div className="bg-zinc-950 min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold mb-2 tracking-tight">
          Movie Explorer
        </h1>
        <p className="text-zinc-500 text-sm mb-8">인기 영화를 둘러보세요</p>

        {/* 필터 */}
        <div className="flex gap-2 mb-8 flex-wrap">
          {VOTE_OPTIONS.map((option) => (
            <button
              key={option.label}
              onClick={() => setVoteFilter(option)}
              className={`text-sm px-4 py-1.5 rounded-full border transition-colors ${
                voteFilter.label === option.label
                  ? "bg-white text-zinc-900 border-white font-semibold"
                  : "border-zinc-700 text-zinc-400 hover:border-zinc-400 hover:text-white"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>

        {/* 영화 그리드 */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>

        <div ref={observerRef} className="h-10 mt-8" />
        {isFetchingNextPage && (
          <p className="text-center text-zinc-600 text-sm py-4">
            불러오는 중...
          </p>
        )}
      </div>
    </div>
  );
};

export default MovieListPage;
