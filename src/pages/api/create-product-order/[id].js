import { v4 as uuidv4 } from 'uuid';

export async function POST({request, params}) {

  const id = params.id;
  const body = await request.json();
  const product = body.product;
  const email = body.email;

  const yookassa_shop_id = import.meta.env.YM_ID;
  const yookassa_secret_key = import.meta.env.YM_KEY;

  const auth_string = `${yookassa_shop_id}:${yookassa_secret_key}`;
  const auth_bytes = Buffer.from(auth_string).toString('base64');
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Basic ${auth_bytes}`,
    'Idempotence-Key': uuidv4()
  };

  const payments_data = {
    'amount': {
      'value': `${product.price}.00`,
      'currency': 'RUB'
    },
    'capture': true,
    'confirmation': {
      'type': 'redirect',
      'return_url': 'https://vndteam.ru/market/success'
    },
    'description': `Заказ №${id}`
  };

  const response = await fetch('https://api.yookassa.ru/v3/payments', {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(payments_data)
  });
  const responseJson = await response.text();

  const webhookUrl = `https://discord.com/api/webhooks/1130466139235958955/JPBpbvPLM7C2VaNbUeMwHhf_SOwy_FbvDLAOG1n_xQHVcyeZiCqr_Rl15io7ggfV5h1-`;
  const data = {
    content: `Новый заказ: ${id}\nНазвание: ${product.name}`,
  };
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };
  await fetch(webhookUrl, options);
  return new Response(responseJson);
}

