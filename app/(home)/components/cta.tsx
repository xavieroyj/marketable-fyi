import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import * as motion from "motion/react-client";
import { container, fadeInUp } from "./animations";

export function CTA() {
  return (
    <section className="container mx-auto px-4 py-20">
      <motion.div 
        className="max-w-4xl mx-auto text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={container}
      >
        <motion.h2 
          className="text-4xl font-bold mb-6"
          variants={fadeInUp}
        >
          Ready to Transform Your Links?
        </motion.h2>
        <motion.p 
          className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
          variants={fadeInUp}
        >
          Join thousands of businesses using LinkPro to create powerful, trackable links
          that drive results.
        </motion.p>
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center"
          variants={fadeInUp}
        >
          <Button size="lg">
            Get Started Now
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button variant="outline" size="lg">
            View Demo
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
} 