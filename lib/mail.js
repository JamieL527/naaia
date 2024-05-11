import nodemailer from 'nodemailer';
import * as handlebars from "handlebars";
import { resetTemplate } from "./templates/resetpassword";

export async function sendMail({ to, name, subject, body }) {
  const { SMTP_EMAIL, SMTP_PASSWORD } = process.env;

  const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: SMTP_EMAIL,
      pass: SMTP_PASSWORD,
    },
  });

  try {
    const testResult = await transport.verify();
    console.log(testResult);
  } catch (error) {
    console.error({ error });
    return;
  }

  try {
    const sendResult = await transport.sendMail({
      from: SMTP_EMAIL,
      to,
      subject,
      html: body,
    });
    console.log(sendResult);
  } catch (error) {
    console.log(error);
  }
}

export function compileResetTemplate(name, url) {
  const template = handlebars.compile(resetTemplate);
  const htmlBody = template({
    name,
    url,
  });
  return htmlBody;
}
