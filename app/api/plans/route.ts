import { getMany } from "@/services/plan-service";

export async function GET(req: Request) {
  try {
    const { data } = await getMany();

    return new Response(JSON.stringify({ plans: data }), { status: 200 });
  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: error.response.data.message }),
      {
        status: 500,
      },
    );
  }
}
