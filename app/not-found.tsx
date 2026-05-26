import { NavLink } from "@/components/layout/NavLink";
import { Container } from "@/components/shared/Container";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center bg-cream-50 px-5 py-24 text-center">
      <Container className="max-w-lg">
        <p className="font-heading text-sm font-medium tracking-[0.25em] text-gold-600 uppercase">
          404
        </p>
        <h1 className="font-heading mt-4 text-4xl text-navy-950 sm:text-5xl">
          Page not found
        </h1>
        <p className="mt-4 text-lg text-charcoal-700">
          The page you’re looking for may have moved, or never existed. Let’s get you
          back home.
        </p>
        <NavLink
          href="/"
          className="mt-10 inline-flex rounded-full bg-navy-950 px-8 py-3.5 text-sm font-semibold text-cream-50 transition hover:bg-navy-900"
        >
          Return home
        </NavLink>
      </Container>
    </section>
  );
}
