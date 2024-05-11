
import Stripe from "stripe"
import {  NextResponse } from 'next/server';
import { db } from "../../../../lib/db";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16"
})

export async function POST(req) {
  const body = await req.json();
  const { productId, email } = body;

  if (!productId || !email) {
    return NextResponse.json({ error: 'Product ID and email are required.' }, { status: 400 });
  }

  let user = await db.user.findUnique({ where: { email } });
  let customer = user?.stripeCustomerId;

  // Create a new customer if not exists
  if (!customer) {
    const stripeCustomer = await stripe.customers.create({ email });
    customer = stripeCustomer.id;
    // Update or create user with new Stripe customer ID
    user = user
      ? await db.user.update({ where: { email }, data: { stripeCustomerId: customer } })
      : await db.user.create({ data: { email, stripeCustomerId: customer } });
  }

  try {
    const checkoutSession = await stripe.checkout.sessions.create({
      mode: 'subscription',
      customer,
      line_items: [{ price: productId, quantity: 1 }],
      success_url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/cancel`,
      allow_promotion_codes: true
    });

    return NextResponse.json({ sessionId: checkoutSession.id });
  } catch (error) {
    console.error('Stripe error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
