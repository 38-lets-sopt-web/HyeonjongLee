import instance from "./axios";

export const postSignIn = async (loginId: string, password: string) => {
  const response = await instance.post("/auth/signin", { loginId, password });
  return response.data;
};

export const postSignUp = async (data: {
  loginId: string;
  password: string;
  name: string;
  email: string;
  age: number;
  part: "iOS" | "Android" | "Web" | "Server";
}) => {
  const response = await instance.post("/auth/signup", data);
  return response.data;
};
