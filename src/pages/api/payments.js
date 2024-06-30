export async function POST({ request }) {
    const body = await request.text();
    console.log(body);

    return new Response('OK');
}