import http from "../lib/http";
import {
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from "@/types/finances";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export const login = async (username: string, password: string) =>
  await http.post<LoginResponse>("/auth/login", { username, password });

export const register = async (payload: RegisterRequest) =>
  await http.post<RegisterResponse>("/auth/clients/register", payload);

export const getToken = async () =>
  await getServerSession(authOptions).then((session) => session?.user?.token);
