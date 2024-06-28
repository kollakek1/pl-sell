import { MongoClient } from 'mongodb';

export async function POST({ request }) {
  const body = await request.text();
  const { server, plugin, site, launcher, autoDesign, serverType, price, userEmail, userName, serverDescription, pluginDescription, siteDescription, launcherDescription } = JSON.parse(body);

  const uri = import.meta.env.MONGODB_URI;
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  let result;

  try {
    await client.connect();
    const db = client.db('vndteam');
    const orders = db.collection('orders');

    result = await orders.insertOne({
      server,
      plugin,
      site,
      launcher,
      autoDesign,
      serverType,
      price,
      userEmail,
      userName,
      serverDescription,
      pluginDescription,
      siteDescription,
      launcherDescription,
      createdAt: new Date(),
    });

    console.log('Inserted document with ID:', result.insertedId);
  } finally {
    await client.close();
  }

  const webhookUrl = import.meta.env.DS_WEBHOOK_URI;
  const webhookData = {
    content: `||@here||`,
    embeds: [
      {
        title: "Новый заказ",
        description: [
          `Продукты: ${server ? 'сервер' : ''} ${plugin ? 'плагин' : ''} ${site ? 'сайт' : ''} ${launcher ? 'лаунчер' : ''}`,
          `${site ? `Дизайн для автодоната: ${autoDesign}` : ''}`,
          `${site ? `Детали продукта(сайт): ${siteDescription}` : ''}`,
          `${server ? `Тип сервера: ${serverType}` : ''}`,
          `${server ? `Детали продукта(сервер): ${serverDescription}` : ''}`,
          `${plugin ? `Детали продукта(плагин): ${pluginDescription}` : ''}`,
          `${launcher ? `Детали продукта(лаунчер): ${launcherDescription}` : ''}`,
          `Цена: ${price}₽`,
          `ID: ${result.insertedId}`,
          `Заказчик: ${userName} (${userEmail})`
        ].filter(Boolean).join('\n\n'),
        color: 5814783
      }
    ],
  };

  await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(webhookData),
  });

  return new Response(JSON.stringify(result));
}
