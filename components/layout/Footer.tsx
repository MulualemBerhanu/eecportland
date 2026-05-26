import Link from "next/link";
import { Camera, MessageCircle, Play } from "lucide-react";
import { BrandLogo } from "@/components/layout/BrandLogo";
import { NavLink } from "@/components/layout/NavLink";
import { mainNav } from "@/components/layout/nav-links";
import { Container } from "@/components/shared/Container";
import { siteConfig } from "@/lib/site";

const social = [
  { href: siteConfig.social.facebook, label: "Facebook", icon: MessageCircle },
  { href: siteConfig.social.youtube, label: "YouTube", icon: Play },
  { href: siteConfig.social.instagram, label: "Instagram", icon: Camera },
] as const;

export function Footer() {
  return (
    <footer className="bg-footer-premium relative overflow-hidden border-t border-white/10 text-cream-100">
      <div
        className="pointer-events-none absolute -right-[20%] top-0 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.12),transparent_68%)] blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_75%_50%_at_15%_95%,rgba(28,46,69,0.22),transparent_55%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-500/25 to-transparent"
        aria-hidden
      />
      <Container className="relative py-16 sm:py-20">
        <div className="grid gap-14 lg:grid-cols-[1.25fr_1fr_1fr] lg:gap-12 lg:divide-x lg:divide-white/10">
          <div className="lg:pr-10">
            <NavLink href="/" className="group inline-flex w-full max-w-[24rem]">
              <BrandLogo variant="footer" />
            </NavLink>
            <p className="mt-4 font-heading text-2xl tracking-tight text-cream-50 sm:text-[1.65rem]">
              {siteConfig.name}
            </p>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-cream-200/88">
              {siteConfig.description}
            </p>
            <div className="mt-8 flex gap-3">
              {social.map(({ href, label, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex size-11 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-cream-100 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-gold-400/35 hover:bg-white/12 hover:shadow-[0_12px_32px_-12px_rgba(0,0,0,0.45)]"
                  aria-label={label}
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>
          <div className="lg:px-10">
            <p className="text-xs font-semibold tracking-[0.22em] text-gold-400/95 uppercase">
              Quick links
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              {mainNav.slice(0, 6).map((item) => (
                <li key={item.href}>
                  <NavLink
                    href={item.href}
                    className="inline-block text-cream-200/90 transition duration-300 hover:translate-x-1 hover:text-cream-50"
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:pl-10">
            <p className="text-xs font-semibold tracking-[0.22em] text-gold-400/95 uppercase">
              Gather with us
            </p>
            <ul className="mt-6 space-y-4 text-sm text-cream-200/88">
              <li>
                <span className="block font-medium text-cream-50">{siteConfig.serviceTime}</span>
                <span className="mt-1 block text-cream-300/85">{siteConfig.fridayGathering}</span>
              </li>
              <li className="border-t border-white/10 pt-4">
                <span className="block font-medium text-cream-50">Address</span>
                {siteConfig.address.full}
              </li>
              <li>
                <span className="block font-medium text-cream-50">Email</span>
                <a
                  className="underline-offset-4 transition hover:text-cream-50 hover:underline"
                  href={`mailto:${siteConfig.contact.email}`}
                >
                  {siteConfig.contact.email}
                </a>
              </li>
              <li>
                <span className="block font-medium text-cream-50">Phone</span>
                <a
                  className="underline-offset-4 transition hover:text-cream-50 hover:underline"
                  href={`tel:${siteConfig.contact.phoneTel}`}
                >
                  {siteConfig.contact.phone}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-16 flex flex-col gap-5 border-t border-white/10 pt-10 text-sm text-cream-300/90 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.shortName}. All rights
            reserved.
          </p>
          <div className="flex flex-wrap gap-6">
            <NavLink
              href="/privacy"
              className="transition hover:text-cream-50 hover:underline hover:underline-offset-4"
            >
              Privacy
            </NavLink>
            <NavLink
              href="/terms"
              className="transition hover:text-cream-50 hover:underline hover:underline-offset-4"
            >
              Terms
            </NavLink>
          </div>
        </div>
        <div className="mt-10 border-t border-white/10 pt-10">
          <p className="text-center font-heading text-sm italic leading-relaxed text-gold-400/90 sm:text-[0.9375rem]">
            “Oh come, let us sing to the Lord; let us make a joyful noise to the rock
            of our salvation.” (Psalm 95:1)
          </p>
        </div>
      </Container>
    </footer>
  );
}
