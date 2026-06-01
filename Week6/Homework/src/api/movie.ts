import instance from "./axios";
import type { MovieListResponse, MovieDetail } from "../types/movie";

export const getMovies = async (
  page: number,
  voteMin?: number,
  voteMax?: number
): Promise<MovieListResponse> => {
  const res = await instance.get<MovieListResponse>("/discover/movie", {
    params: {
      page,
      sort_by: "popularity.desc",
      ...(voteMin !== undefined && { "vote_average.gte": voteMin }),
      ...(voteMax !== undefined && { "vote_average.lte": voteMax }),
    },
  });
  return res.data;
};

export const getMovieDetail = async (movieId: number): Promise<MovieDetail> => {
  const res = await instance.get<MovieDetail>(`/movie/${movieId}`);
  return res.data;
};
