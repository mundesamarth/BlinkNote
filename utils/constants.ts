import {  scale, Variants } from "motion/react";
import { isDev } from "./helpers";

export const pricingPlans = [
  {
    name: "Basic",
    price: 9,
    description: "Perfect for occasional use",
    items: [
      "5 PDF summaries per month",
      "Standard processing speed",
      "Email support",
    ],
    id: "basic",
    paymentLink: isDev
      ? "https://buy.stripe.com/test_fZu00l78VegLfC25fe9Ve00"
      : "https://buy.stripe.com/test_fZu00l78VegLfC25fe9Ve00",
    priceId: isDev ? "price_1RaZtdRwZU0VrcK9ThO2rHym" : "price_1RaZtdRwZU0VrcK9ThO2rHym",
  },
  {
    name: "Pro",
    price: 19,
    description: "For professionals and teams",
    items: [
      "Unlimited PDF summaries",
      "Priority processing",
      "24/7 priority support",
      "Markdown Export",
    ],
    id: "pro",
    paymentLink: isDev
      ? "https://buy.stripe.com/test_4gM00l0Kx1tZ75w7nm9Ve01"
      : "https://buy.stripe.com/test_4gM00l0Kx1tZ75w7nm9Ve01",
    priceId: isDev ? "price_1RaZuCRwZU0VrcK9aY1i2Xll" : "price_1RaZuCRwZU0VrcK9aY1i2Xll",
  },
];

export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

export const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring' ,
      damping: 15,
      stiffness: 50,
    }as const,
  },
};

