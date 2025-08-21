import React from "react";
import { Github, Twitter, Linkedin } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className=" border-t py-6 md:py-8  lg:mt-30 bg-zinc-200">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0 text-center md:text-left">
            <h3 className="text-lg font-semibold">Sparkle and Shine</h3>
            <p className="text-sm text-muted-foreground">
              a application where you can book your service and register your company service.
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center mb-4 md:mb-0">
            <div className="mb-4 md:mb-0 md:mr-8 text-center">
              <h4 className="font-semibold mb-2">Quick Links</h4>
              <ul className="text-sm text-muted-foreground">
                <li className="mb-2">
                  <a href="/about" className="hover:underline">
                    About Us
                  </a>
                </li>
                <li className="mb-2">
                  <a href="/contact" className="hover:underline">
                    Contact
                  </a>
                </li>
                <li className="mb-2">
                  <a href="/faq" className="hover:underline">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>

            <div className="text-center">
              <h4 className="font-semibold mb-2">Legal</h4>
              <ul className="text-sm text-muted-foreground">
                <li className="mb-2">
                  <a href="/privacy" className="hover:underline">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="/terms" className="hover:underline">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground"
            >
              <Github className="h-6 w-6" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground"
            >
              <Twitter className="h-6 w-6" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground"
            >
              <Linkedin className="h-6 w-6" />
            </a>
          </div>
        </div>
        <div className="mt-8 border-t pt-6 text-center text-sm text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} Sparkle and Shine. All Rights
            Reserved by Hridoy.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
