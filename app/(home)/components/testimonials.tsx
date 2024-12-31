import { Star } from "lucide-react";
import * as motion from "motion/react-client";
import { container, fadeInUp } from "./animations";
import Image from "next/image";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Marketing Director, TechCorp",
    image: "https://github.com/yusufhilmi.png",
    content:
      "LinkPro has transformed how we manage our marketing campaigns. The analytics are incredible!",
  },
  {
    name: "Michael Chen",
    role: "Social Media Manager, GrowthLabs",
    image: "https://github.com/furkanksl.png",
    content:
      "The custom domains feature helps maintain our brand identity across all channels.",
  },
  {
    name: "Emma Davis",
    role: "CEO, StartupX",
    image: "https://github.com/polymet-ai.png",
    content:
      "Best link management solution we've used. The ROI tracking is phenomenal.",
  },
];

export function Testimonials() {
  return (
    <section className="container mx-auto px-4 py-20 bg-secondary/10">
      <motion.div 
        className="text-center mb-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <h2 className="text-3xl font-bold mb-4">Trusted by Industry Leaders</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          See what our customers say about their experience with LinkPro.
        </p>
      </motion.div>
      <motion.div 
        className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={container}
      >
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            className="rounded-xl bg-card text-card-foreground shadow border-2 transition-all duration-300 hover:-translate-y-1"
          >
            <div className="p-6 pt-6">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-primary text-primary"
                  />
                ))}
              </div>
              <p className="mb-6 text-muted-foreground">{testimonial.content}</p>
              <div className="flex items-center gap-3">
                <div className="relative h-10 w-10 flex-none">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="rounded-full object-cover"
                    fill
                  />
                </div>
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
} 