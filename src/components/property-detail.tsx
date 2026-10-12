"use client";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Share2,
  Copy,
  ArrowUpRight,
  Maximize2,
  Check,
  MapPin,
  Ruler,
  Heart,
} from "lucide-react";
import { Property, priceLabel } from "@/lib/data";
import { useDemo } from "./provider";
import {
  Photo,
  Stats,
  SaveButton,
  PropertyCard,
  Eyebrow,
  ButtonLink,
} from "./ui";
import { EnquiryForm } from "./form";
export function Modal({
  children,
  onClose,
  label,
}: {
  children: React.ReactNode;
  onClose: () => void;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const close = useRef(onClose);
  useEffect(() => {
    close.current = onClose;
  }, [onClose]);
  useEffect(() => {
    const previous = document.activeElement as HTMLElement;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    ref.current?.querySelector<HTMLElement>("button,input,select")?.focus();
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") close.current();
      if (e.key === "Tab") {
        const nodes = Array.from(
          ref.current?.querySelectorAll<HTMLElement>(
            "button,a,input,select,textarea",
          ) || [],
        ).filter((n) => !n.hasAttribute("disabled"));
        if (!nodes.length) return;
        const first = nodes[0],
          last = nodes[nodes.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", key);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", key);
      previous?.focus();
    };
  }, []);
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal"
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-label={label}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="modal-close icon-button"
          onClick={onClose}
          aria-label={`Close ${label}`}
        >
          <X size={22} />
        </button>
        {children}
      </div>
    </div>
  );
}
export function Lightbox({
  images,
  index,
  onClose,
  onChange,
  title,
}: {
  images: string[];
  index: number;
  onClose: () => void;
  onChange: (i: number) => void;
  title: string;
}) {
  const touch = useRef(0);
  function next(d: number) {
    onChange((index + d + images.length) % images.length);
  }
  useEffect(() => {
    const key = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") onChange((index + 1) % images.length);
      if (e.key === "ArrowLeft")
        onChange((index - 1 + images.length) % images.length);
    };
    document.addEventListener("keydown", key);
    return () => document.removeEventListener("keydown", key);
  }, [index, images.length, onChange]);
  return (
    <Modal onClose={onClose} label="Image gallery">
      <div
        className="lightbox"
        onTouchStart={(e) => (touch.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          const delta = e.changedTouches[0].clientX - touch.current;
          if (Math.abs(delta) > 40) next(delta < 0 ? 1 : -1);
        }}
      >
        <Photo
          src={images[index]}
          alt={`${title} concept gallery image ${index + 1}`}
        />
        <button
          className="gallery-prev icon-button"
          aria-label="Previous image"
          onClick={() => next(-1)}
        >
          <ChevronLeft />
        </button>
        <button
          className="gallery-next icon-button"
          aria-label="Next image"
          onClick={() => next(1)}
        >
          <ChevronRight />
        </button>
        <div className="gallery-caption">
          <span>{title} · Illustrative imagery</span>
          <span>
            {index + 1} / {images.length}
          </span>
        </div>
      </div>
    </Modal>
  );
}
export function PropertyDetail({ slug }: { slug: string }) {
  const { properties, ready, favourites, toggleFavourite } = useDemo();
  const p = properties.find((x) => x.slug === slug);
  const [gallery, setGallery] = useState<number | null>(null),
    [viewing, setViewing] = useState(false),
    [share, setShare] = useState("");
  if (!p)
    return (
      <section className="section not-found">
        <Eyebrow>
          {ready ? "PROPERTY NOT FOUND" : "RESTORING DEMO DATA"}
        </Eyebrow>
        <h1>{ready ? "This chapter has moved." : "One moment…"}</h1>
        <p>
          {ready
            ? "This demo listing may have been removed in your browser. Explore the current collection."
            : "Loading locally managed listings."}
        </p>
        <ButtonLink href="/buy">EXPLORE HOMES</ButtonLink>
      </section>
    );
  async function shareProperty() {
    try {
      if (navigator.share)
        await navigator.share({ title: p!.title, url: window.location.href });
      else {
        await navigator.clipboard.writeText(window.location.href);
        setShare("Link copied");
      }
    } catch (e) {
      if (e instanceof Error && e.name === "AbortError") return;
      try {
        await navigator.clipboard.writeText(window.location.href);
        setShare("Link copied");
      } catch {
        setShare("Copy the URL from your address bar.");
      }
    }
  }
  const similar = properties
    .filter((x) => x.id !== p.id && x.purpose === p.purpose && x.available)
    .slice(0, 3);
  return (
    <>
      <section className="detail-header section">
        <div className="breadcrumbs">
          <Link href={`/${p.purpose}`}>
            {p.purpose === "buy" ? "Buy" : "Rent"}
          </Link>
          <span>/</span>
          <span>{p.location}</span>
        </div>
        <div className="detail-title">
          <div>
            <Eyebrow>
              {p.id} / {p.type.toUpperCase()} / SAMPLE LISTING
            </Eyebrow>
            <h1>{p.title}</h1>
            <p>
              <MapPin size={15} />
              {p.location}, Harare · General illustrative location
            </p>
          </div>
          <div>
            <p className="detail-price">{priceLabel(p)}</p>
            <p className="demo-note">
              Illustrative USD{" "}
              {p.purpose === "rent" ? "monthly rent" : "purchase price"}
            </p>
          </div>
        </div>
      </section>
      <section className="detail-gallery">
        <button
          className="main-gallery-image"
          onClick={() => setGallery(0)}
          aria-label="Open property gallery"
        >
          <Photo
            src={p.images[0]}
            alt={`${p.title} — illustrative architecture`}
            priority
          />
          <span>
            <Maximize2 size={16} /> VIEW GALLERY · {p.images.length} IMAGES
          </span>
        </button>
        <div>
          {p.images.slice(1, 3).map((src, i) => (
            <button
              onClick={() => setGallery(i + 1)}
              key={src + i}
              aria-label={`Open gallery image ${i + 2}`}
            >
              <Photo src={src} alt={`Interior inspiration ${i + 1}`} />
            </button>
          ))}
        </div>
      </section>
      <section className="section detail-content">
        <div>
          <div className="detail-tools">
            <button
              className="text-link"
              onClick={() => toggleFavourite(p.id)}
              aria-pressed={favourites.includes(p.id)}
            >
              <Heart
                size={18}
                fill={favourites.includes(p.id) ? "currentColor" : "none"}
              />
              {favourites.includes(p.id)
                ? "SAVED TO YOUR COLLECTION"
                : "SAVE THIS HOME"}
            </button>
            <button className="text-link" onClick={shareProperty}>
              <Share2 size={17} />
              {share || "SHARE PROPERTY"}
            </button>
            <button className="text-link" onClick={async()=>{try{await navigator.clipboard.writeText(window.location.href);setShare('Link copied');}catch{setShare('Copy the URL from your address bar.');}}}>
              <Copy size={16}/> COPY LINK
            </button>
          </div>
          <div className="detail-specs">
            <Stats p={p} />
            <span>
              <Ruler size={17} />
              {p.area} m²
            </span>
          </div>
          <p className="demo-strip">
            SAMPLE SPECIFICATIONS · Illustrative architectural imagery, not
            photographs of an available Harare listing.
          </p>
          <Eyebrow>A SPACE TO MAKE YOUR OWN</Eyebrow>
          <h2>
            A considered
            <br />
            <em>way of living.</em>
          </h2>
          <p>{p.description}</p>
          <div className="features">
            <h3>The details that matter.</h3>
            {p.features.map((f) => (
              <span key={f}>
                <Check size={17} />
                {f}
              </span>
            ))}
          </div>
          <div className="property-enquiry">
            <Eyebrow>LET’S TALK ABOUT THIS SPACE</Eyebrow>
            <h3>Make an enquiry.</h3>
            <EnquiryForm
              kind={
                p.purpose === "buy"
                  ? "I'm looking to buy"
                  : "I'm looking to rent"
              }
              property={p.title}
            />
          </div>
        </div>
        <aside className="viewing-panel">
          <Eyebrow>IMAGINE YOURSELF HERE</Eyebrow>
          <h3>
            Your next chapter
            <br />
            could begin here.
          </h3>
          <p>Try the viewing request experience for this sample home.</p>
          <button className="button" onClick={() => setViewing(true)}>
            REQUEST A VIEWING <ArrowUpRight size={17} />
          </button>
          <p className="demo-note">
            A demo request only. No real booking or agent contact.
          </p>
          <hr />
          <p className="small-copy">Looking for something different?</p>
          <ButtonLink href="/find-your-home" className="outline-dark">
            FIND YOUR HOME
          </ButtonLink>
        </aside>
      </section>
      <section className="section">
        <div className="section-heading">
          <div>
            <Eyebrow>MORE POSSIBILITIES</Eyebrow>
            <h2>
              You might also
              <br />
              <em>feel at home here.</em>
            </h2>
          </div>
        </div>
        <div className="similar-grid">
          {similar.map((x) => (
            <PropertyCard key={x.id} p={x} />
          ))}
        </div>
      </section>
      {gallery !== null && (
        <Lightbox
          images={p.images}
          index={gallery}
          onChange={setGallery}
          onClose={() => setGallery(null)}
          title={p.title}
        />
      )}
      {viewing && (
        <Modal onClose={() => setViewing(false)} label="Viewing request">
          <Eyebrow>{p.title.toUpperCase()}</Eyebrow>
          <h2>
            Come and <em>imagine.</em>
          </h2>
          <EnquiryForm viewing property={p.title} />
        </Modal>
      )}
    </>
  );
}
