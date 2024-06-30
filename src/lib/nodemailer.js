import nodemailer from 'nodemailer';

let transporter;

export function getTransporter() {
    if (!transporter) {
        transporter = nodemailer.createTransport({
            service: 'yandex',
            auth: {
                user: import.meta.env.EMAIL_LOGIN,
                pass: import.meta.env.EMAIL_PASSWORD
            }
        });
        console.log('Nodemailer transporter created');
    }
    return transporter;
}