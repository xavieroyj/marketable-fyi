import { ArrowRight, Link } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import * as motion from "motion/react-client";
import { container, fadeInUp } from "./animations";

export function Hero() {
  return (
    <section className="container mx-auto px-4">
      <motion.div 
        className="flex flex-col items-center text-center space-y-8 py-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={container}
      >
        <motion.h1 
          className="text-4xl md:text-6xl font-bold leading-tight max-w-3xl"
          variants={fadeInUp}
        >
          Transform Your Links into{" "}
          <span className="bg-gradient-to-r from-purple-600 to-blue-600 text-transparent bg-clip-text">
            Powerful Tools
          </span>
        </motion.h1>
        <motion.p 
          className="font-light text-lg text-muted-foreground max-w-2xl"
          variants={fadeInUp}
        >
          Create short, branded links with detailed analytics and custom domains. Perfect for marketing, social media, and business growth.
        </motion.p>
        <motion.div 
          className="w-full max-w-2xl flex flex-col md:flex-row gap-4"
          variants={fadeInUp}
        >
          <div className="flex-1 relative">
            <Link className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input className="pl-10 h-12" placeholder="Paste your long URL here" />
          </div>
          <Button className="h-12 px-8">
            Shorten URL
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
} 