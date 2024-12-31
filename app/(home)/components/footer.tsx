const footerSections = [
  {
    title: "Product",
    links: ["Features", "Pricing", "Analytics", "API"],
  },
  {
    title: "Company",
    links: ["About", "Blog", "Careers", "Contact"],
  },
  {
    title: "Resources",
    links: ["Documentation", "Help Center", "Status", "Security"],
  },
  {
    title: "Legal",
    links: ["Privacy", "Terms", "Cookie Policy", "Licenses"],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 className="font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      className="text-muted-foreground hover:text-foreground transition-colors"
                      href="#"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-muted-foreground">
              © 2024 LinkPro. All rights reserved.
            </div>
            <div className="flex space-x-6">
              <a className="text-muted-foreground hover:text-foreground transition-colors" href="#">
                Twitter
              </a>
              <a className="text-muted-foreground hover:text-foreground transition-colors" href="#">
                LinkedIn
              </a>
              <a className="text-muted-foreground hover:text-foreground transition-colors" href="#">
                GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 