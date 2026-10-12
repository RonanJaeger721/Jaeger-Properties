"use client";
import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Search, Menu, X, Heart, ArrowUpRight } from "lucide-react";
import { agencyUrl } from "@/lib/data";
import { useDemo } from "./provider";
import { Mark, ButtonLink } from "./ui";
const links = [
  ["Home", "/"],
  ["Buy", "/buy"],
  ["Rent", "/rent"],
  ["Developments", "/developments"],
  ["About", "/about"],
  ["Contact", "/contact"],
];
export function Header() {
  const path = usePathname(),
    { favourites } = useDemo(),
    [open, setOpen] = useState(false),
    [hidden, setHidden] = useState(false),
    [dark, setDark] = useState(path === "/"),
    [scrolled, setScrolled] = useState(false);
  const last = useRef(0),
    menu = useRef<HTMLDivElement>(null),
    toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    setOpen(false);
    setHidden(false);
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = window.scrollY;
      const d = y - last.current;
      if (Math.abs(d) > 6) {
        setHidden(d > 0 && y > 180);
        last.current = y;
      }
      setScrolled(y > 30);
      const h = document.querySelector(".house-story");
      setDark(
        h
          ? h.getBoundingClientRect().bottom > 120
          : path === "/" || path === "/developments/the-residence",
      );
    };
    const scroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", scroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", scroll);
      cancelAnimationFrame(raf);
    };
  }, [path]);
  useEffect(() => {
    if (!open) return;
    const prior = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const first = menu.current?.querySelector<HTMLAnchorElement>("a");
    first?.focus();
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
      if (e.key === "Tab") {
        const nodes = menu.current?.querySelectorAll<HTMLElement>("a,button");
        if (!nodes?.length) return;
        const all = [toggle.current, ...Array.from(nodes)].filter(
          Boolean,
        ) as HTMLElement[];
        const idx = all.indexOf(document.activeElement as HTMLElement);
        if (e.shiftKey && idx === 0) {
          e.preventDefault();
          all.at(-1)?.focus();
        } else if (!e.shiftKey && idx === all.length - 1) {
          e.preventDefault();
          all[0].focus();
        }
      }
    };
    document.addEventListener("keydown", key);
    return () => {
      document.body.style.overflow = prior;
      document.removeEventListener("keydown", key);
    };
  }, [open]);
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header
        className={`site-header ${dark && !open ? "on-dark" : ""} ${hidden && !open ? "hidden-nav" : ""} ${scrolled ? "scrolled" : ""}`}
      >
        <Link href="/" className="brand" aria-label="Jaeger Properties home">
          <Mark />
          <span>
            JAEGER<span>PROPERTIES</span>
          </span>
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              aria-current={path === href ? "page" : undefined}
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className="nav-actions">
          <Link
            href="/buy?focus=search"
            className="icon-button"
            aria-label="Search properties"
          >
            <Search size={18} />
          </Link>
          <Link
            href="/saved"
            className="icon-button"
            aria-label={`Saved properties: ${favourites.length}`}
          >
            <Heart size={18} />
            {favourites.length > 0 && <small>{favourites.length}</small>}
          </Link>
          <Link href="/contact?intent=seller" className="list-link">
            List your property
          </Link>
          <Link className="nav-cta" href="/find-your-home">
            EXPLORE HOMES <ArrowUpRight size={15} />
          </Link>
          <button
            ref={toggle}
            className="menu-toggle icon-button"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-navigation"
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </header>
      {open && (
        <div
          className="mobile-navigation"
          id="mobile-navigation"
          ref={menu}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation"
        >
          <p className="eyebrow">YOUR NEXT CHAPTER</p>
          <nav>
            {links.map(([label, href], i) => (
              <Link key={href} href={href} onClick={() => setOpen(false)}>
                <small>0{i + 1}</small>
                {label}
                <ArrowUpRight size={22} />
              </Link>
            ))}
          </nav>
          <Link
            href="/find-your-home"
            onClick={() => setOpen(false)}
            className="button"
          >
            FIND YOUR HOME <ArrowUpRight size={17} />
          </Link>
          <Link
            href="/contact?intent=seller"
            onClick={() => setOpen(false)}
            className="text-link"
          >
            List your property <ArrowUpRight size={17} />
          </Link>
          <p className="demo-note">JAEGER PROPERTIES — DESIGN CONCEPT</p>
        </div>
      )}
    </>
  );
}
export function Footer() {
  const { notice } = useDemo();
  return (
    <>
      <section className="closing">
        <p className="eyebrow">A PLACE FOR YOUR NEXT CHAPTER</p>
        <h2>
          Let’s find your
          <br />
          <em>next place.</em>
        </h2>
        <div>
          <ButtonLink href="/buy" light>
            EXPLORE HOMES
          </ButtonLink>
          <ButtonLink href="/contact" className="outline">
            CONTACT US
          </ButtonLink>
        </div>
        <span className="closing-jp" aria-hidden="true">
          JP
        </span>
      </section>
      <footer>
        <div className="footer-top">
          <Link className="brand" href="/">
            <Mark />
            <span>
              JAEGER<span>PROPERTIES</span>
            </span>
          </Link>
          <p>
            Beautiful homes.
            <br />
            Thoughtful discovery.
          </p>
          <nav aria-label="Footer">
            {links.slice(1).map(([n, h]) => (
              <Link key={h} href={h}>
                {n}
              </Link>
            ))}
            <Link href="/saved">Saved homes</Link>
            <Link href="/admin">Demo management</Link>
          </nav>
        </div>
        <div className="agency-callout">
          <div>
            <p className="eyebrow">WANT A PROPERTY WEBSITE LIKE THIS?</p>
            <p>
              Designed to showcase listings, attract enquiries and give your
              agency a stronger online presence.
            </p>
          </div>
          <a
            className="text-link"
            href={agencyUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            BUILD ONE FOR MY AGENCY <ArrowUpRight size={19} />
          </a>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} Jaeger Properties · A design concept.
            <br />
            All listings, pricing and specifications are illustrative. No
            properties are offered for sale or rent.
          </span>
          <a href={agencyUrl} target="_blank" rel="noopener noreferrer">
            Concept &amp; Development by Jaeger Media.
          </a>
          <Link href="/concept-notes">About this demo &amp; imagery</Link>
        </div>
        {notice && (
          <p className="error" role="status">
            {notice}
          </p>
        )}
      </footer>
    </>
  );
}
