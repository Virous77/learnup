import { Resend } from 'resend';
import LearnUpEmail from '.';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (password: string, type: string) => {
  const data = await resend.emails.send({
    from: process.env.EMAIL!,
    to: process.env.SEND_TO!,
    subject: 'Welcome to !',
    react: LearnUpEmail({ password, type }),
  });

  if (!data.error) {
    return true;
  } else {
    return false;
  }
};
