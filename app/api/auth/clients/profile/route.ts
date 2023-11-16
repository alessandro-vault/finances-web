import { register } from "@/services/auth-service";
import { getProfile } from "@/services/clients-service";

export async function GET(req: Request) {
  try {
    const { data } = await getProfile();

    return new Response(JSON.stringify(data));
  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: error.response.data.message }),
      {
        status: 500,
      },
    );
  }
}
