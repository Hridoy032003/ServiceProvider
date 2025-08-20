import { db } from '@/utils/db';
import { NextResponse } from 'next/server';
import { hash } from 'bcrypt';
import crypto from 'crypto';
import { sendVerificationEmail } from '@/lib/mail';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    if (!email) {
      return NextResponse.json({ message: 'Email is required' }, { status: 400 });
    }

    const otp = crypto.randomInt(100000, 999999).toString();
    const hashedOtp = await hash(otp, 10);
    const expires = new Date(new Date().getTime() + 10 * 60 * 1000); 

   
    await db.verificationToken.upsert({
      where: { identifier: email },
      update: { token: hashedOtp, expires },
      create: { identifier: email, token: hashedOtp, expires },
    });

    await sendVerificationEmail(email, otp);
console.log('OTP sent successfully at api site');
    return NextResponse.json({ message: 'OTP sent successfully' }, { status: 200 });

  } catch (error) {
    console.error("OTP Route Error:", error);
 
    return NextResponse.json({ message: 'Failed to send OTP. Please try again later.' }, { status: 500 });
  }
}