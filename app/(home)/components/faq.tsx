import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import * as motion from "motion/react-client";
import { container, fadeInUp } from "./animations";

const faqs = [
  {
    question: "What is LinkPro?",
    answer: "LinkPro is a professional URL shortening service that allows you to create branded, memorable short links for your content. It includes features like custom domains, analytics, and API access.",
  },
  {
    question: "Can I use my own domain?",
    answer: "Yes! Our Pro and Enterprise plans allow you to use your own custom domain for branded short links. You can also use our premium domains if you don't have your own.",
  },
  {
    question: "What's included in the free plan?",
    answer: "We provide comprehensive analytics including click tracking, geographic location data, device information, referrer sources, and custom campaign tracking.",
  },
  {
    question: "Is there an API available?",
    answer: "Yes, we offer a robust API for Pro and Enterprise users. This allows you to integrate link shortening directly into your applications and workflows.",
  },
  {
    question: "How secure are the shortened links?",
    answer: "We use bank-level encryption and security measures to protect your links and data. All links are monitored for malicious content and spam.",
  },
];

export function FAQ() {
  return (
    <section className="container mx-auto px-4 py-20" id="faq">
      <motion.div
        className="max-w-4xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={container}
      >
        <motion.div className="text-center mb-16" variants={fadeInUp}>
          <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions about LinkPro&apos;s features and capabilities.
          </p>
        </motion.div>

        <motion.div variants={fadeInUp}>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </motion.div>
    </section>
  );
} 