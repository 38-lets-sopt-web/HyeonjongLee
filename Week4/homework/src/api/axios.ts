import axios from "axios";

const instance = axios.create({
  baseURL: "https://sopt-server.p-e.kr/api/v1",
});

export default instance;
