import http from "../lib/http";
import { getToken } from "@/services/auth-service";
import { Plan } from "@/types/plan";
import { PlanResponse } from "@/types/finances";

const getOne = async (id: String) => {
  return await http.get<PlanResponse>(`/plans/${id}`, {
    headers: {
      Authorization: `Bearer ${await getToken()}`,
    },
  });
};

const getMany = async () => {
  return await http.get<Plan[]>('/plans', {
    headers: {
      Authorization: `Bearer ${await getToken()}`,
    },
  });
};

const createOne = async (payload) => {
  return await http.post<{plan: Plan}>('/plans', payload, {
    headers: {
      Authorization: `Bearer ${await getToken()}`,
    }
  })
}

export { getOne, getMany, createOne };
