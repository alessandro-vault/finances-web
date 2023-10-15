import http from "../lib/http";

interface LoginResponse {
  token: string;
}
export const login = async (username: string, password: string) => {
  return await http.post<LoginResponse>("/auth/login", { username, password });
};
