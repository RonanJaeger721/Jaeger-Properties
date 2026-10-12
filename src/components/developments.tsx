"use client";
import { useState } from "react";
import { ArrowUpRight, MoveHorizontal } from "lucide-react";
import Link from "next/link";
import { stages } from "@/lib/data";
import { Photo, ButtonLink, Eyebrow } from "./ui";
import { HouseStory } from "./house-story";
import { EnquiryForm } from "./form";
import { Lightbox } from "./property-detail";
export function Comparison() {
  const [value, setValue] = useState(50);
  return (
    <div className="comparison">
      <div className="comparison-images">
        <Photo src="/images/residence.webp" alt="Completed residence concept" />
        <div
          className="comparison-before"
          style={{ clipPath: `inset(0 ${100 - value}% 0 0)` }}
        >
          <Photo
            src="/images/stage-framing.webp"
            alt="Structural framing concept of the same residence"
          />
        </div>
        <span className="compare-label before-label">THE STRUCTURE</span>
        <span className="compare-label after-label">THE RESIDENCE</span>
        <div className="comparison-line" style={{ left: `${value}%` }}>
          <span>
            <MoveHorizontal size={20} />
          </span>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          aria-label="Reveal construction stage versus finished residence"
        />
      </div>
      <div className="comparison-footer">
        <span>Drag to see the difference. Use arrow keys to refine.</span>
        <span>CONCEPT VISUALIZATION</span>
      </div>
    </div>
  );
}
export function Developments() {
  return (
    <>
      <section className="development-intro section">
        <Eyebrow>THE DEVELOPMENT COLLECTION</Eyebrow>
        <h1>
          From the first line
          <br />
          to the <em>final detail.</em>
        </h1>
        <p>
          Architecture begins with possibility. Explore a conceptual residence
          that brings its journey to life.
        </p>
      </section>
      <section className="development-feature section">
        <Link href="/developments/the-residence">
          <Photo
            src="/images/residence.webp"
            alt="The Residence — conceptual luxury house"
            priority
          />
          <span className="development-caption">
            <span>
              <small>001 / ARCHITECTURAL STUDY</small>
              <strong>The Residence</strong>
            </span>
            <ArrowUpRight size={30} />
          </span>
        </Link>
        <div className="development-feature-meta">
          <p>
            A contemporary residence imagined around light, landscape and
            considered living.
          </p>
          <span>CONCEPT SHOWCASE · NOT A BUILT DEVELOPMENT</span>
        </div>
      </section>
      <section className="section development-index">
        <span>THE IDEA</span>
        <h2>
          One vision.
          <br />
          <em>Every detail.</em>
        </h2>
        <div>
          <p>
            Our opening experience follows one house through six conceptual
            stages. Matching visualizations preserve its outline and setting as
            it moves from drawing to finished residence.
          </p>
          <ButtonLink href="/developments/the-residence">
            FOLLOW THE JOURNEY
          </ButtonLink>
        </div>
      </section>
    </>
  );
}
export function Residence() {
  const [gallery, setGallery] = useState<number | null>(null);
  const images = [
    "/images/residence.webp",
    "/images/stage-blueprint.webp",
    "/images/stage-framing.webp",
    "/images/stage-dried-in.webp",
  ];
  return (
    <>
      <HouseStory compact />
      <section className="section residence-overview" id="curated">
        <Eyebrow>THE RESIDENCE / ARCHITECTURAL STUDY 001</Eyebrow>
        <div className="section-heading">
          <h2>
            One residence.
            <br />
            <em>Six chapters.</em>
          </h2>
          <div>
            <p>
              An illustrative study of a contemporary home, imagined through
              structure, material and landscape. This is not a construction
              portfolio or a property offered for sale.
            </p>
            <Link className="text-link" href="#enquire-residence">
              ENQUIRE ABOUT THE CONCEPT <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>
        <div className="design-highlights">
          <div>
            <span>01</span>
            <h3>Light, throughout.</h3>
            <p>
              Wide glazing and open volumes bring the outdoors into the
              architectural idea.
            </p>
          </div>
          <div>
            <span>02</span>
            <h3>Material, considered.</h3>
            <p>
              Natural stone, muted surfaces and warm timber establish a calm
              visual language.
            </p>
          </div>
          <div>
            <span>03</span>
            <h3>Landscape, connected.</h3>
            <p>
              Terraces, gardens and a pool extend the home's life beyond its
              walls.
            </p>
          </div>
        </div>
      </section>
      <section className="stage-case-study section">
        <Eyebrow>FROM DRAWING TO DWELLING</Eyebrow>
        <h2>
          A vision, <em>made visible.</em>
        </h2>
        <div className="stage-case-grid">
          {stages.map((s, i) => (
            <article key={s.name}>
              <Photo src={s.image} alt={`${s.name} conceptual stage`} />
              <div>
                <span>0{i + 1}</span>
                <h3>{s.name}</h3>
                <p>{s.copy}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="section comparison-section">
        <div className="section-heading">
          <div>
            <Eyebrow>INSPECT THE TRANSFORMATION</Eyebrow>
            <h2>
              From structure
              <br />
              <em>to sanctuary.</em>
            </h2>
          </div>
          <p>
            Two moments. The same architectural idea.
            <br />
            An illustrative before-and-after experience.
          </p>
        </div>
        <Comparison />
      </section>
      <section className="residence-gallery section">
        <Eyebrow>THE ARCHITECTURAL GALLERY</Eyebrow>
        <div className="residence-gallery-grid">
          {images.map((src, i) => (
            <button
              key={src}
              onClick={() => setGallery(i)}
              aria-label={`Open architectural image ${i + 1}`}
            >
              <Photo src={src} alt={`The Residence concept image ${i + 1}`} />
            </button>
          ))}
        </div>
      </section>
      <section className="section residence-enquiry" id="enquire-residence">
        <div>
          <Eyebrow>START A CONVERSATION</Eyebrow>
          <h2>
            Inspired by
            <br />
            <em>the possibilities?</em>
          </h2>
          <p>
            Explore how thoughtful design and interactive storytelling could
            present a property project.
          </p>
          <p className="demo-note">
            This form stores a demo enquiry locally. To commission a real
            website, use the Jaeger Media link in the footer.
          </p>
        </div>
        <EnquiryForm property="The Residence concept" />
      </section>
      {gallery !== null && (
        <Lightbox
          images={images}
          index={gallery}
          onChange={setGallery}
          onClose={() => setGallery(null)}
          title="The Residence"
        />
      )}
    </>
  );
}
