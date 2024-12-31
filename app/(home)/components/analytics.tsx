import * as motion from "motion/react-client";
import { container, fadeInUp } from "./animations";

const analyticsFeatures = [
  "Real-time click tracking",
  "Geographic distribution",
  "Device analytics",
  "Referrer tracking",
  "Custom date ranges",
  "Export capabilities",
];

export function Analytics() {
  return (
    <section className="container mx-auto px-4 py-10" id="analytics">
      <motion.div 
        className="grid md:grid-cols-2 gap-12 items-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={container}
      >
        <motion.div variants={fadeInUp}>
          <h2 className="text-3xl font-bold mb-6">Detailed Analytics for Data-Driven Decisions</h2>
          <p className="text-muted-foreground mb-8">
            Get comprehensive insights into your link performance. Track clicks, analyze geographic data, and understand user behavior to optimize your marketing strategy.
          </p>
          <ul className="space-y-4">
            {analyticsFeatures.map((feature, index) => (
              <li key={index} className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-primary" />
                {feature}
              </li>
            ))}
          </ul>
        </motion.div>
        <motion.div 
          variants={fadeInUp}
          className="rounded-xl bg-card text-card-foreground shadow border-2 p-6"
        >
          <div className="aspect-[4/3] flex items-center justify-center text-muted-foreground">
            Analytics Chart Placeholder
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
} 