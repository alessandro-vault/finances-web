import http from "../lib/http";
import { getToken } from "@/services/auth-service";
import { Plan } from "@/types/plan";
import { Payment } from "@/types/payment";

const getManyFromPlan = async (planId: String) => {
  return await http.get<Payment[]>(`/plans/${planId}/payments`, {
    headers: {
      Authorization: `Bearer ${await getToken()}`,
    },
  });
};

const createToPlan = async (planId: String) => {
  return await http.post<{ payments: Plan[] }>(`/plans/${planId}/payments`,
    {},
    {
      headers: {
        Authorization: `Bearer ${await getToken()}`,
      },
    });
};

export { getManyFromPlan, createToPlan };
