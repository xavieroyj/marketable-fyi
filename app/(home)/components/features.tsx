import { Link, Globe, ChartNoAxesColumn, Shield } from "lucide-react";
import * as motion from "motion/react-client";
import { container } from "./animations";

const features = [
  {
    icon: <Link className="h-6 w-6 text-primary" />,
    title: "Custom Short Links",
    description: "Create memorable, branded links that reflect your identity and enhance recognition.",
  },
  {
    icon: <Globe className="h-6 w-6 text-primary" />,
    title: "Custom Domains",
    description: "Use your own domain to maintain brand consistency and build trust with your audience.",
  },
  {
    icon: <ChartNoAxesColumn className="h-6 w-6 text-primary" />,
    title: "Advanced Analytics",
    description: "Track clicks, geographic data, devices, and referrers with detailed insights.",
  },
  {
    icon: <Shield className="h-6 w-6 text-primary" />,
    title: "Enterprise Security",
    description: "Bank-grade security with SSL encryption and advanced threat protection.",
  },
];

export function Features() {
  return (
    <section className="container mx-auto px-4" id="features">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold mb-4">Powerful Features for Growth</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Everything you need to manage, track, and optimize your links in one place.
        </p>
      </div>
      <motion.div 
        className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={container}
      >
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="rounded-xl bg-card text-card-foreground shadow border-2 hover:border-primary/50 transition-all duration-300 hover:-translate-y-1"
          >
            <div className="p-6 pt-6">
              <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="font-semibold text-xl mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
} 