import { getOne } from "@/services/plan-service";

export async function GET(req: Request, { params } : { params: { id: string } }) {
  try {
    const { data } = await getOne(params.id);

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: error.response.data.message }),
      {
        status: 500,
      },
    );
  }
}
