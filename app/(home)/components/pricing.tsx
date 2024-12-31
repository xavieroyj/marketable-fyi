import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import * as motion from "motion/react-client";
import { container } from "./animations";

const plans = [
  {
    name: "Free",
    price: "$0",
    description: "Perfect for personal use",
    features: [
      "Up to 50 links/month",
      "Basic analytics",
      "Standard support",
      "24h click history",
    ],
  },
  {
    name: "Pro",
    price: "$0",
    description: "For growing businesses",
    features: [
      "Unlimited links",
      "Custom domains",
      "Advanced analytics",
      "Priority support",
      "Custom slugs",
      "Team collaboration",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "$0",
    description: "For large organizations",
    features: [
      "Everything in Pro",
      "Multiple custom domains",
      "API access",
      "SSO integration",
      "24/7 dedicated support",
      "SLA guarantee",
    ],
  },
];

export function Pricing() {
  return (
    <section className="container mx-auto px-4" id="pricing">
      <motion.div 
        className="text-center mb-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold mb-4">Simple, Transparent Pricing</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Choose the plan that best fits your needs. All plans include our core features.
        </p>
      </motion.div>
      <motion.div 
        className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={container}
      >
        {plans.map((plan, index) => (
          <motion.div
            key={index}
            className={`rounded-xl bg-card text-card-foreground shadow border-2 transition-all duration-300 hover:-translate-y-1 flex flex-col ${
              plan.popular ? "border-primary" : ""
            }`}
          >
            <div className="flex-1">
              <div className="flex flex-col space-y-1.5 p-6">
                {plan.popular && (
                  <div className="text-primary text-sm font-medium mb-2">Most Popular</div>
                )}
                <h3 className="font-semibold leading-none tracking-tight">{plan.name}</h3>
                <div className="flex items-baseline mt-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground ml-2">/month</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">{plan.description}</p>
              </div>
              <div className="p-6 pt-0">
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3">
                      <Check className="h-4 w-4 text-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="p-6">
              <Button
                className="w-full"
                variant={plan.popular ? "default" : "outline"}
              >
                Get Started
              </Button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
} 