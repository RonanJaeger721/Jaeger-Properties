"use client";
import Link from "next/link";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { HouseStory } from "./house-story";
import { Photo, ButtonLink, PropertyCard, Eyebrow, TextLink } from "./ui";
import { useDemo } from "./provider";
import { SearchForm } from "./catalogue";
const lifestyles = [
  [
    "CITY LIVING",
    "Space for a life in motion.",
    "city",
    "/images/property-14.webp",
  ],
  [
    "FAMILY HOMES",
    "Room to grow, together.",
    "family",
    "/images/property-07.webp",
  ],
  [
    "LUXURY RESIDENCES",
    "A different kind of everyday.",
    "luxury",
    "/images/residence.webp",
  ],
  [
    "INVESTMENT PROPERTIES",
    "Consider your next move.",
    "investment",
    "/images/property-13.webp",
  ],
];
export function Home() {
  const { properties } = useDemo();
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const targets = Array.from(
      document.querySelectorAll<HTMLElement>(
        ".featured-section .section-heading,.lifestyle-grid>a,.development-photo,.about-teaser h2,.seller-section h2",
      ),
    );
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.1 },
    );
    targets.forEach((el, i) => {
      if (el.getBoundingClientRect().top > window.innerHeight) {
        el.classList.add("reveal-target");
        el.style.setProperty("--reveal-delay", `${(i % 3) * 80}ms`);
        observer.observe(el);
      }
    });
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".living-section .photo",
        { yPercent: -4, scale: 1.08 },
        {
          yPercent: 4,
          ease: "none",
          scrollTrigger: {
            trigger: ".living-section",
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    });
    return () => {
      observer.disconnect();
      ctx.revert();
      targets.forEach((el) => el.classList.remove("reveal-target", "in-view"));
    };
  }, []);
  const featured = properties
    .filter((p) => p.featured && p.available)
    .slice(0, 3);
  return (
    <>
      <HouseStory />
      <section className="section featured-section" id="curated">
        <div className="section-heading">
          <div>
            <Eyebrow>01 / CURATED HOMES</Eyebrow>
            <h2>
              Find a place worth
              <br />
              <em>calling home.</em>
            </h2>
          </div>
          <div className="heading-side">
            <p>
              A thoughtful selection of spaces,
              <br />
              imagined for the way you live.
            </p>
            <TextLink href="/buy">VIEW THE COLLECTION</TextLink>
          </div>
        </div>
        <p className="demo-strip">
          ILLUSTRATIVE LISTINGS · Sample USD prices and architectural imagery.
          No real availability.
        </p>
        <div className="editorial-properties">
          {featured.map((p, i) => (
            <PropertyCard key={p.id} p={p} large={i === 0} />
          ))}
        </div>
      </section>
      <section className="home-search section">
        <Eyebrow>02 / MAKE YOURSELF AT HOME</Eyebrow>
        <h2>
          Where would you like
          <br />
          to call <em>home?</em>
        </h2>
        <SearchForm />
      </section>
      <section className="section lifestyle-section">
        <div className="section-heading">
          <div>
            <Eyebrow>03 / A HOME FOR EVERY CHAPTER</Eyebrow>
            <h2>
              Find a home that
              <br />
              <em>fits your life.</em>
            </h2>
          </div>
          <p>
            The right place is personal.
            <br />
            Start with what matters to you.
          </p>
        </div>
        <div className="lifestyle-grid">
          {lifestyles.map(([n, c, l, img], i) => (
            <Link
              href={`/buy?lifestyle=${l}`}
              key={l}
              className={`lifestyle lifestyle-${i}`}
            >
              <Photo
                src={img}
                alt={`${n.toLowerCase()} — architectural inspiration`}
              />
              <div>
                <span className="eyebrow">
                  0{i + 1} / {n}
                </span>
                <h3>{c}</h3>
                <ArrowUpRight size={25} />
              </div>
            </Link>
          ))}
        </div>
      </section>
      <section className="living-section">
        <Photo
          src="/images/property-06.webp"
          alt="Light-filled contemporary living space"
        />
        <div>
          <Eyebrow>MORE THAN FOUR WALLS.</Eyebrow>
          <h2>
            Spaces for living.
            <br />
            Places for <em>making memories.</em>
          </h2>
          <ButtonLink href="/buy" light>
            EXPLORE HOMES
          </ButtonLink>
        </div>
      </section>
      <section className="section development-teaser">
        <div className="development-photo">
          <Photo
            src="/images/residence.webp"
            alt="The Residence conceptual exterior"
          />
          <span>ARCHITECTURAL STUDY / 001</span>
        </div>
        <div>
          <Eyebrow>04 / THE RESIDENCE — CONCEPT SHOWCASE</Eyebrow>
          <h2>
            From vision
            <br />
            <em>to residence.</em>
          </h2>
          <p>
            One architectural idea. Six chapters. Follow a contemporary
            residence from its first drawn line to the warmth of a finished
            home.
          </p>
          <div className="teaser-facts">
            <span>Open living</span>
            <span>Natural materials</span>
            <span>Garden connection</span>
          </div>
          <ButtonLink href="/developments/the-residence">
            EXPLORE THE CONCEPT
          </ButtonLink>
          <p className="demo-note">
            An illustrative architectural study, not a built development.
          </p>
        </div>
      </section>
      <section className="about-teaser section">
        <Eyebrow>05 / OUR APPROACH</Eyebrow>
        <h2>
          Property, with a<br />
          <em>more considered approach.</em>
        </h2>
        <div>
          <p>
            Jaeger Properties is a concept real estate brand built around
            beautiful homes, thoughtful presentation and a more intuitive
            property-search experience.
          </p>
          <TextLink href="/about">DISCOVER OUR APPROACH</TextLink>
        </div>
      </section>
      <section className="seller-section">
        <Photo
          src="/images/property-08.webp"
          alt="Contemporary residence architectural inspiration"
        />
        <div>
          <Eyebrow>06 / A BETTER WAY TO BE SEEN</Eyebrow>
          <h2>
            Your property deserves
            <br />a better <em>first impression.</em>
          </h2>
          <p>
            Beautiful imagery. A story that brings the space to life. An easier
            way for the right people to get in touch.
          </p>
          <ButtonLink href="/contact?intent=seller">
            LIST YOUR PROPERTY
          </ButtonLink>
          <p className="demo-note">Try the seller enquiry in demo mode.</p>
        </div>
      </section>
    </>
  );
}
