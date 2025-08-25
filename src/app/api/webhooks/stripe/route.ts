import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { db } from '@/utils/db';
import Stripe from 'stripe';


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  const body = await req.text();
const signature = (await headers()).get('stripe-signature') as string;
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (error) {
   
    console.error('Error verifying Stripe signature:', error);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }


  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const checkoutSession = event.data.object as Stripe.Checkout.Session;

        if (!checkoutSession.customer) {
            console.error('No customer ID found in Stripe checkout session.');
            throw new Error('Customer ID is missing.');
        }

        const user = await db.user.findUnique({
          where: {
            email: checkoutSession?.customer_details?.email as string,
          },
        });

        if (!user) {
          console.error(`No user found with email from checkout session.`);
          throw new Error('User not found.');
        }

        await db.user.update({
          where: {
            id: user.id,
          },
          data: {
            hasAccess: true,
            stripeCustomerId: checkoutSession.customer as string,
          },
        });
       
        break;
      }

      case 'customer.subscription.deleted':
      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = subscription.customer as string;

        const user = await db.user.findUnique({
            where: {
                stripeCustomerId: customerId as string,
            }
        });

        if (!user) {
            console.error(`No user found with Stripe customer ID: ${customerId}`);
            throw new Error('User with given customer ID not found.');
        }
        
        const hasAccess = subscription.status === 'active' || subscription.status === 'trialing';

        await db.user.update({
          where: {
            stripeCustomerId: customerId,
          },
          data: {
            hasAccess: hasAccess,
          },
        });
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }
    return NextResponse.json({ received: true });
    
  } catch (error) {
    console.error('Error processing Stripe event:', error);
    return NextResponse.json({ error: 'Error processing Stripe event' }, { status: 400 });
  }
  


}