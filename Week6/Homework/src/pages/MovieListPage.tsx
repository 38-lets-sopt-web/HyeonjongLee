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

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ["movies", voteFilter],
    queryFn: ({ pageParam }) => getMovies(pageParam, voteFilter.min, voteFilter.max),
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
      { threshold: 0.1 }
    );

    if (observerRef.current) observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const movies = data?.pages.flatMap((page) => page.results) ?? [];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Movie Explorer</h1>
      <select
        value={voteFilter.label}
        onChange={(e) => {
          const selected = VOTE_OPTIONS.find((o) => o.label === e.target.value);
          if (selected) setVoteFilter(selected);
        }}
        className="mb-6 border border-gray-300 rounded px-3 py-2 text-sm"
      >
        {VOTE_OPTIONS.map((option) => (
          <option key={option.label} value={option.label}>
            {option.label}
          </option>
        ))}
      </select>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      <div ref={observerRef} className="h-10 mt-8" />
      {isFetchingNextPage && (
        <p className="text-center text-gray-500 text-sm">불러오는 중...</p>
      )}
    </div>
  );
};

export default MovieListPage;
