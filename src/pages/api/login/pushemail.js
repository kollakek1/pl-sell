import nodemailer from 'nodemailer'
import { createClient } from 'redis';

export async function POST({ request }) {

    const client = createClient({
        password: import.meta.env.REDIS_PASSWORD,
        socket: {
            host: import.meta.env.REDIS_HOST,
            port: 11772
        }
    });

    await client.connect();


    const body = await request.text();
    const { userEmail } = JSON.parse(body);

    const randomNumber = Math.floor(Math.random() * 89999) + 10000;
    await client.set(userEmail, randomNumber);
    await client.quit();

    const transporter = nodemailer.createTransport({
    service: 'yandex',
    auth: {
        user: import.meta.env.EMAIL_LOGIN,
        pass: import.meta.env.EMAIL_PASSWORD
    }
    })

    const mailOptions = {
    from: import.meta.env.EMAIL_LOGIN,
    to: userEmail,
    subject: 'Ваш проверочный код',
    html: `
        <h1>Ваш проверочный код:</h1>
        <p>${randomNumber}</p>
    `
    }

    const send = () => {
    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            reject(error)
        }
        resolve(info)
        })
    })
    }

    await send()

    return new Response('OK')
}