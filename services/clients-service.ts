import http from "@/lib/http"
import { getToken } from "@/services/auth-service";
import { ProfileResponse } from "@/types/finances"

const getProfile = async () => {
  return await http.get<ProfileResponse>('/auth/clients/profile', {
    headers: {
      Authorization: `Bearer ${await getToken()}`
    },
  });
}

export { getProfile }
