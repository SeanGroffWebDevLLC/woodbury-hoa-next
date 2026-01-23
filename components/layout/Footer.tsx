import Link from "next/link";
import { ExternalLink as ExternalLinkIcon, Mail, MapPin } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const quickLinks = [
  { href: "/documents", label: "Documents" },
  { href: "/calendar", label: "Calendar" },
  { href: "/contact", label: "Contact" },
  { href: "/dues", label: "Dues & Fees" },
  { href: "/news", label: "News" },
];

const externalLinks = {
  emergency: [
    { title: "Fire Department", url: "https://cjcfpd.org/" },
    { title: "Police Department", url: "https://cityofgrainvalley.org/police/" },
  ],
  government: [
    { title: "City of Grain Valley", url: "https://cityofgrainvalley.org/" },
    { title: "City Codes", url: "https://ecode360.com/GR3310" },
    { title: "Animal Control", url: "https://cityofgrainvalley.org/police/animal_control/" },
  ],
};

export function Footer() {
  return (
    <footer className="border-border bg-hoa-navy border-t text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="text-hoa-blue mb-4 text-lg font-semibold">
              Woodbury Estates HOA Phase 6
            </h3>
            <p className="mb-4 text-sm text-gray-300">Together We Thrive</p>
            <div className="space-y-2 text-sm text-gray-300">
              <div className="flex items-center gap-2">
                <Mail className="text-hoa-blue h-4 w-4" />
                <a
                  href="mailto:woodburyestateshoa.phase6@gmail.com"
                  className="hover:text-hoa-blue"
                >
                  woodburyestateshoa.phase6@gmail.com
                </a>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="text-hoa-blue h-4 w-4" />
                <span>Grain Valley, MO</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-hoa-blue mb-4 text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-hoa-blue text-sm text-gray-300">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-hoa-blue mb-4 text-lg font-semibold">Emergency Services</h3>
            <ul className="space-y-2">
              {externalLinks.emergency.map((link) => (
                <li key={link.url}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-hoa-blue flex items-center gap-1 text-sm text-gray-300"
                  >
                    {link.title}
                    <ExternalLinkIcon className="h-3 w-3" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-hoa-blue mb-4 text-lg font-semibold">Government Resources</h3>
            <ul className="space-y-2">
              {externalLinks.government.map((link) => (
                <li key={link.url}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-hoa-blue flex items-center gap-1 text-sm text-gray-300"
                  >
                    {link.title}
                    <ExternalLinkIcon className="h-3 w-3" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="bg-hoa-navy-light my-8" />

        <div className="flex flex-col items-center justify-between gap-4 text-center text-sm text-gray-400 md:flex-row md:text-left">
          <p>
            &copy; {new Date().getFullYear()} Woodbury Estates HOA Phase 6. All rights reserved.
          </p>
          <p className="text-hoa-blue-light">Together We Thrive</p>
        </div>
      </div>
    </footer>
  );
}
