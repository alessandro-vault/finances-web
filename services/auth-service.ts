import http from "../lib/http";

export interface LoginResponse {
  token: string;
}

export const login = async (username: string, password: string) =>
  await http.post<LoginResponse>("/auth/login", { username, password });

interface RegisterRequest {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
}

interface RegisterResponse {
  id: string;
  name: string;
  username: string;
  createdAt: string;
}
export const register = async (payload: RegisterRequest) =>
  await http.post<RegisterResponse>("/auth/clients/register", payload);
