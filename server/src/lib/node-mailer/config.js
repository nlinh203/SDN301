import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.NODEMAILER_USERNAME,
    pass: process.env.NODEMAILER_PASSWORD
  }
});

export const connectNodemailer = () => {
  transporter.verify(function (error) {
    if (error) console.log(error);
    else console.log('Nodemailer connect successful!');
  });
};

export const sendMail = async ({ to, subject, text, html, attachments = [] }) => {
  let mailOptions = {
    from: process.env.NODEMAILER_USERNAME,
    to,
    subject,
    text,
    html: html
      ? `<!DOCTYPE html>
          <html>
          <head>
          <style>
            body { font-family: Arial, sans-serif; }
            .container { width: 100%; max-width: 1000px; margin: auto; padding: 20px; 
              border: 1px solid #ddd; border-radius: 4px; }
          </style>
          </head>
          <body>
          <div class="container">
            ${html}
          </div>
          </body>
          </html>`
      : undefined,
    attachments
  };

  const attr = { to, subject, content: html || text };

  try {
    let info = await transporter.sendMail(mailOptions);
    return { ...attr, status: 1, mess: info.response };
  } catch (error) {
    return { ...attr, status: 2, mess: error.code };
  }
};
