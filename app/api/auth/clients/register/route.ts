import { register } from "@/services/auth-service";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const response = await register(data);

    return new Response(JSON.stringify(response.data), { status: 201 });
  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: error.response.data.message }),
      {
        status: 500,
      },
    );
  }
}
