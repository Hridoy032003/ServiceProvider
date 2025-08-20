import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);


export const sendVerificationEmail = async (email: string, token: string) => {
  try {
    await resend.emails.send({
    from: 'onboarding@resend.dev', 
    to: email,
    subject: 'Your Verification Code',
    html: `<p>Your one-time password is: <strong>${token}</strong></p>`,
  })

  } catch (error) {
    console.log("error to send tit to your email", error);
    
  }
};