"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown, ArrowUpRight } from "lucide-react";
export function AvenueIntro() {
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".avenue-cover img",
        { scale: 1.07 },
        { scale: 1, duration: 1.8, ease: "power2.out" },
      );
      gsap.to(".avenue-cover", {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.8,
        },
      });
      gsap.fromTo(
        ".avenue-copy",
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, delay: 0.3, ease: "power2.out" },
      );
    }, root);
    return () => ctx.revert();
  }, []);
  return (
    <section
      ref={root}
      className="avenue-intro"
      aria-label="Harare property introduction"
    >
      <div className="avenue-cover">
        <Image
          src="/images/property-06.webp"
          alt="Light-filled residential interior — architectural inspiration"
          fill
          priority
          sizes="100vw"
        />
      </div>
      <div className="avenue-overlay" />
      <div className="avenue-running" aria-hidden="true">
        <span>JAEGER PROPERTIES · A NEW CHAPTER · </span>
        <span>JAEGER PROPERTIES · A NEW CHAPTER · </span>
      </div>
      <div className="avenue-address">
        HARARE, ZIMBABWE
        <br />
        Beautiful homes. Thoughtful discovery.
      </div>
      <div className="avenue-copy">
        <p className="eyebrow">A MORE CONSIDERED WAY TO LIVE</p>
        <h1>
          New possibilities.
          <br />A place in Harare.
        </h1>
        <p>
          Discover spaces for the way you live. From a city apartment to a
          garden residence, find the beginning of your next chapter.
        </p>
        <Link href="/buy">
          EXPLORE THE COLLECTION <ArrowUpRight size={20} />
        </Link>
        <small>DESIGN CONCEPT · ILLUSTRATIVE PROPERTIES</small>
      </div>
      <a
        className="avenue-down"
        href="#introduction"
        aria-label="Discover our approach"
      >
        <ArrowDown size={25} />
      </a>
    </section>
  );
}
