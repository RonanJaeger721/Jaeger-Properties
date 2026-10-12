"use client";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Heart,
  BedDouble,
  Bath,
  CarFront,
  ArrowRight,
} from "lucide-react";
import { Property, priceLabel } from "@/lib/data";
import { useDemo } from "./provider";
export function Photo({
  src,
  alt,
  className = "",
  priority = false,
  sizes = "(max-width: 700px) 100vw, 60vw",
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <div className={`photo ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        unoptimized={src.startsWith("data:")}
      />
    </div>
  );
}
export function ButtonLink({
  href,
  children,
  light = false,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  light?: boolean;
  className?: string;
}) {
  return (
    <Link className={`button ${light ? "light" : ""} ${className}`} href={href}>
      {children}
      <ArrowUpRight size={17} />
    </Link>
  );
}
export function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="eyebrow">{children}</p>;
}
export function Mark() {
  return (
    <svg className="monogram" viewBox="0 0 48 48" aria-hidden="true">
      <path
        d="M8 7h12v24c0 7-12 7-12 0M20 7h12c12 0 12 16 0 16H20M28 23v18"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
      />
      <path d="M4 43h40" stroke="currentColor" strokeWidth=".8" />
    </svg>
  );
}
export function Stats({ p }: { p: Property }) {
  return (
    <div className="stats">
      <span>
        <BedDouble size={16} />
        {p.beds} beds
      </span>
      <span>
        <Bath size={16} />
        {p.baths} baths
      </span>
      <span>
        <CarFront size={16} />
        {p.parking} parking
      </span>
    </div>
  );
}
export function SaveButton({ p }: { p: Property }) {
  const { favourites, toggleFavourite } = useDemo();
  const saved = favourites.includes(p.id);
  return (
    <button
      className={`save ${saved ? "saved" : ""}`}
      onClick={() => toggleFavourite(p.id)}
      aria-label={`${saved ? "Remove" : "Save"} ${p.title}`}
      aria-pressed={saved}
    >
      <Heart size={18} fill={saved ? "currentColor" : "none"} />
    </button>
  );
}
export function PropertyCard({
  p,
  large = false,
}: {
  p: Property;
  large?: boolean;
}) {
  return (
    <article className={`property-card ${large ? "large" : ""}`}>
      <div className="property-image">
        <Link href={`/properties/${p.slug}`} aria-label={`View ${p.title}`}>
          <Photo
            src={p.images[0]}
            alt={`${p.title} — illustrative architectural imagery`}
            sizes="(max-width: 700px) 100vw, 50vw"
          />
        </Link>
        <span className="property-badge">
          {p.purpose === "buy" ? "FOR SALE" : "TO RENT"} · SAMPLE
        </span>
        <SaveButton p={p} />
      </div>
      <div className="property-info">
        <p className="property-location">
          {p.location}, Harare <span>{p.type}</span>
        </p>
        <Link className="property-title" href={`/properties/${p.slug}`}>
          {p.title}
          <ArrowUpRight size={21} />
        </Link>
        <p className="property-price">
          {priceLabel(p)} <small>Illustrative USD</small>
        </p>
        <Stats p={p} />
      </div>
    </article>
  );
}
export function TextLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link className="text-link" href={href}>
      {children}
      <ArrowRight size={18} />
    </Link>
  );
}
