import Image from "next/image";
import type { LogoData } from "@/app/lib/get-logos";

interface HeroProps {
  logo: LogoData | null;
}

export function Hero({ logo }: HeroProps) {
  return (
    <section className="from-hoa-navy via-hoa-navy-light to-hoa-blue relative overflow-hidden bg-gradient-to-br py-16 md:py-24">
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
      <div className="relative container mx-auto px-4">
        <div className="flex flex-col items-center text-center">
          <div className="mb-8 rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
            {logo ? (
              <Image
                src={logo.url}
                alt={logo.alt}
                width={logo.width}
                height={logo.height}
                className="h-auto w-64 md:w-80"
                priority
              />
            ) : (
              <Image
                src="/woodbury-hoa-6.png"
                alt="Woodbury Estates HOA Phase 6"
                width={300}
                height={80}
                className="h-auto w-64 md:w-80"
                priority
              />
            )}
          </div>
          <h1 className="mb-4 text-3xl font-bold text-white md:text-5xl">
            Welcome to Woodbury Estates HOA Phase 6
          </h1>
          <p className="text-hoa-blue-light mb-8 max-w-2xl text-lg md:text-xl">
            Your community, your home. Stay connected with your neighbors and stay informed about
            everything happening in our neighborhood.
          </p>
          <p className="text-xl font-semibold text-white italic md:text-2xl">
            &ldquo;Together We Thrive&rdquo;
          </p>
        </div>
      </div>
    </section>
  );
}
