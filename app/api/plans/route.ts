import { getMany } from "@/services/plan-service";

export async function GET(_req: Request) {
  try {
    const { data } = await getMany();

    return new Response(JSON.stringify({ plans: data }), { status: 200 });
  } catch (error: any) {
    if (error.errors) {
      return new Response(
        JSON.stringify({ error: error.errors[0].code }), { status: 500 }
      )
    }
    return new Response(
      JSON.stringify({ error: error.response.data.message }),
      {
        status: 500
      },
    );
  }
}
