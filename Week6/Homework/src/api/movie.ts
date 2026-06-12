import instance from "./axios";
import type { MovieListResponse, MovieDetail } from "../types/movie";

export const getMovies = async (
  page: number,
  voteMin?: number,
  voteMax?: number,
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

export const createGuestSession = async (): Promise<string> => {
  const res = await instance.get<{ guest_session_id: string }>(
    "/authentication/guest_session/new",
  );
  return res.data.guest_session_id;
};

export const postRating = async (
  movieId: number,
  rating: number,
  guestSessionId: string,
): Promise<void> => {
  await instance.post(
    `/movie/${movieId}/rating`,
    { value: rating },
    { params: { guest_session_id: guestSessionId } },
  );
};

export const deleteRating = async (
  movieId: number,
  guestSessionId: string,
): Promise<void> => {
  await instance.delete(`/movie/${movieId}/rating`, {
    params: { guest_session_id: guestSessionId },
  });
};

export const getRatedMovies = async (
  guestSessionId: string,
): Promise<MovieListResponse> => {
  const res = await instance.get<MovieListResponse>(
    `/guest_session/${guestSessionId}/rated/movies`,
  );
  return res.data;
};
