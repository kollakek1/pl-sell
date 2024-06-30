
import { connectToRedis } from '../../../lib/redis';
import { getTransporter } from '../../../lib/nodemailer';

export async function POST({ request }) {
    const redisClient = await connectToRedis();
    const body = await request.text();
    const { userEmail } = JSON.parse(body);

    const randomNumber = Math.floor(Math.random() * 89999) + 10000;
    await redisClient.set(userEmail, randomNumber);

    const transporter = getTransporter();

    const mailOptions = {
        from: import.meta.env.EMAIL_LOGIN,
        to: userEmail,
        subject: 'Ваш проверочный код',
        html: `
            <h1>Ваш проверочный код:</h1>
            <p>${randomNumber}</p>
        `
    };

    await new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                reject(error);
            }
            resolve(info);
        });
    });

    return new Response('OK');
}
