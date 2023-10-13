export async function GET() {
    console.log('GET /dashboard')

    return Response.json({ message: 'Hello from dashboard' })
}