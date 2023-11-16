import { createToPlan } from "@/services/plan-payments-service";

export async function POST(req: Request, { params } : { params: { id: string } }) {
  try {
    const { data } = await createToPlan(params.id);

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error: any) {
    console.log(error);
    return new Response(
      JSON.stringify({ error: error.response.data.message }),
      {
        status: 500,
      },
    );
  }
}
