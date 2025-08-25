"use client";


import { use, useState } from "react";
import { Button } from "../ui/button";

import { loadStripe } from "@stripe/stripe-js"; 
import Link from "next/link";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

interface Subscribe {
 userId: string;
  userEmail: string;
}

export default function SubscribeButton({
userId,
  userEmail
}: Subscribe) {
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckout = async () => {
    setIsLoading(true);

    try {
      
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({  userEmail }), 
      });

      if (!response.ok) {
        throw new Error("Failed to create checkout session");
      }

      const { sessionId } = await response.json();

    
      const stripe = await stripePromise;
      if (stripe) {
        const { error } = await stripe.redirectToCheckout({ sessionId });
        if (error) {
          console.error("Stripe redirect error:", error);
       
        }
      }
    } catch (error) {
      console.error("Error in handleCheckout:", error)
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Link href={`/serviceProvider/suscription/${userId}`}>
      <Button onClick={handleCheckout} disabled={isLoading}>
        {isLoading ? "Loading..." : "Subscribe Now"}
      </Button>
    </Link>
  );
}
