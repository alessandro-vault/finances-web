import { getProfile } from "@/services/clients-service";

export async function GET(_req: Request) {
  try {
    const response = await getProfile();

    return new Response(JSON.stringify(response.data) );
  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: "There was an error" }),
      {
        status: 500,
      },
    );
  }
}
