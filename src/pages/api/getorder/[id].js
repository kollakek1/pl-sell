const orders = [
  {
    id: 12312,
    status: "В работе",
    items: [
      {
        name: "Плагин",
        price: 780
      },
      {
        name: "Сервер",
        price: 1780
      }
    ]
  },
]

export async function GET({ params, request }) {
  const id = params.id;

  const order = orders.find(order => order.id === parseInt(id));
  if (order) {
    return new Response(JSON.stringify(order));
  } else {
    return new Response('Not found', { status: 404 });
  }
  
};
