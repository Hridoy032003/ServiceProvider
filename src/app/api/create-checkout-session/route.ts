import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  try {
    
    const { priceId, userEmail } = await req.json();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      customer_email: userEmail, 
      line_items: [
        {
      
          quantity: 1,
        },
      ],
      
      success_url: `/serviceProvider`,
      
    });


    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error('Error creating Stripe session:', error);
    return NextResponse.json({ error: 'Could not create checkout session' }, { status: 500 });
  }
}