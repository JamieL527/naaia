import Stripe from "stripe"
import { db } from "../../../lib/db"
import { NextResponse } from "next/server"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16",
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

const webhookHandler = async (req) => {
  try {
    const buf = await req.text();
    const sig = req.headers.get("stripe-signature");

    let event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);

    console.log("✅ Success:", event.id);

    switch (event.type) {
        case "customer.subscription.created":
          await handleSubscriptionCreated(event);
          break;
        case "invoice.payment_succeeded":
          await handleInvoicePaymentSucceeded(event);
          break;
        case "customer.subscription.deleted":
          await handleSubscriptionDeleted(event);
          break;
        default:
          console.warn(`Unhandled event type: ${event.type}`);
      }
  
      return NextResponse.json({ received: true });
    } catch (error) {
      console.error('Webhook error:', error);
      return new NextResponse(JSON.stringify({
        error: { message: "Webhook processing failed" },
      }), { status: 400 });
    }
  };

  const handleSubscriptionCreated = async (event) => {
    const subscription = event.data.object;
    const currentDate = new Date();
    const membershipExpiresAt = new Date();
    membershipExpiresAt.setFullYear(currentDate.getFullYear() + 1);
    const priceId = subscription.items.data[0].price.id;

    
    try {
          const activeUser = await db.user.update({
            where: { stripeCustomerId: subscription.customer },
            data: { 
                isActive: true,
                paymentDate:currentDate,
                membershipExpiresAt: membershipExpiresAt, 
                priceId: priceId,
               },
          });
          console.log("User activated and payment time updated.", activeUser);
      } catch (error) {
        console.error("Error updating user for subscription creation:", error);
      }
    };
 const handleInvoicePaymentSucceeded = async (event) => {
   const invoice = event.data.object;
   const paymentAmountInDollars = invoice.amount_paid / 100; 
   const customerId = invoice.customer;
      
   try {
        const activeUser = await db.user.update({
          where: { stripeCustomerId: customerId },
          data: {
            paymentAmount: paymentAmountInDollars,
            },
          });
          console.log("Stored payment amount for user:", activeUser);
        } catch (error) {
          console.error("Database operation failed:", error);
          throw error; 
        }
      };
 const handleSubscriptionDeleted = async (event) => {
   const subscription = event.data.object;

    try {
         const deactivatedUser = await db.user.update({
           where: { stripeCustomerId: subscription.customer },
           data: { isActive: false },
          });
          console.log("User deactivated:", deactivatedUser);
    }  catch (error) {
        console.error("Error updating user for subscription deletion:", error);
        
      }
    };

export { webhookHandler as POST };
