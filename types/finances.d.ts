import { Plan } from "@/types/plan";

export interface RegisterRequest {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface RegisterResponse {
  id: string;
  name: string;
  username: string;
  createdAt: string;
}

export interface LoginResponse {
  token: string;
}

interface PlanResponse {
  plan: Plan;
}
