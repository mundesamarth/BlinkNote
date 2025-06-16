import { handleCheckoutSessionCompleted, handleSubscriptionDeleted } from "@/lib/payments";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const POST = async (req: NextRequest) => {
  const payload = await req.text();
  let sig = req.headers.get("stripe-signature");

  let event;
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  try {
    event = stripe.webhooks.constructEvent(payload, sig!, endpointSecret);
    const sessionId = event.data.object.id;
    switch (event.type) {
      case "checkout.session.completed":
        console.log("Checkout session completed");
        const session = await stripe.checkout.sessions.retrieve(sessionId, {
          expand: ["line_items"],
        });
        await handleCheckoutSessionCompleted({ session, stripe });
        break;
      case "customer.subscription.deleted":
        console.log("Customer subscription deleted");
        const subscription = event.data.object;
        const subscriptionId = event.data.object.id;

        console.log(subscription);

        await handleSubscriptionDeleted({ subscriptionId,stripe });

        break;
      default:
        console.log(` ${event.type}`);
        break;
    }
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to trigger webhook", err },
      { status: 400 }
    );
  }
  return NextResponse.json({
    status: "success",
  });
};
