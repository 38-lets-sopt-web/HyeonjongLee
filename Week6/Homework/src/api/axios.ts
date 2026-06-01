import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  params: {
    api_key: import.meta.env.VITE_TMDB_API_KEY,
    language: "ko-KR",
  },
});

export default instance;
