
import { connectToMongo } from '../../lib/mongodb';

export async function POST({ request }) {
  const body = await request.text();
  const { server, plugin, site, launcher, autoDesign, serverType, price, userEmail, userName, tgName, serverDescription, pluginDescription, siteDescription, launcherDescription } = JSON.parse(body);
  const status = 'В обработке';

  const { db } = await connectToMongo();
  const orders = db.collection('orders');

  let result;

  try {
    result = await orders.insertOne({
      status,
      server,
      plugin,
      site,
      launcher,
      autoDesign,
      serverType,
      price,
      tgName,
      userEmail,
      userName,
      serverDescription,
      pluginDescription,
      siteDescription,
      launcherDescription,
      createdAt: new Date(),
    });

    console.log('Inserted document with ID:', result.insertedId);
  } catch (error) {
    console.error('Error inserting document:', error);
    return new Response(JSON.stringify({ error: 'Failed to create order' }), { status: 500 });
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
          `Заказчик: ${userName} (${userEmail})`,
          `Телеграм: ${tgName}`,
        ].filter(Boolean).join('\n\n'),
        color: 5814783
      }
    ],
  };

  try {
    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(webhookData),
    });
  } catch (error) {
    console.error('Error sending webhook:', error);
  }

  return new Response(JSON.stringify(result));
}
