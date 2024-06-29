import fetch from 'node-fetch';

export default async function POST(request) {
  const body = await request.text();
  const { telegram, name } = JSON.parse(body);
  const webhookUrl = `https://discord.com/api/webhooks/1145392285905357828/jXQQhQhQ5_QQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQ_W77777777777777777777777777777777777`; // Замени на свой вебхук дискорда
  const data = {
    content: `Новый заказ: ${name}\nTelegram: ${telegram}`,
  };
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };
  await fetch(webhookUrl, options);
  return new Response('OK');
}

