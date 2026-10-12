"use client";
import { useSearchParams } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { agencyUrl } from "@/lib/data";
import { Photo, Eyebrow, ButtonLink, Mark } from "./ui";
import { EnquiryForm } from "./form";
export function About() {
  return (
    <>
      <section className="about-intro section">
        <Eyebrow>THE JAEGER PROPERTIES APPROACH</Eyebrow>
        <h1>
          A beautiful home deserves
          <br />a <em>thoughtful introduction.</em>
        </h1>
        <div>
          <p>Property, with a more considered approach.</p>
          <p>
            Jaeger Properties is a concept real estate brand built around
            beautiful homes, thoughtful presentation and a more intuitive
            property-search experience.
          </p>
        </div>
      </section>
      <div className="about-panorama">
        <Photo
          src="/images/property-06.webp"
          alt="Quiet contemporary living space"
          priority
        />
        <span>LIGHT. SPACE. POSSIBILITY.</span>
      </div>
      <section className="section philosophy">
        <Eyebrow>OUR PHILOSOPHY</Eyebrow>
        <h2>
          Less noise.
          <br />
          <em>More possibility.</em>
        </h2>
        <div>
          <p>
            Finding a home should feel like discovering a possibility, not
            navigating a spreadsheet. We imagine a property experience where
            architecture has room to speak and practical decisions remain
            effortless.
          </p>
          <p>
            Beautiful imagery draws you in. Clear information helps you decide.
            Thoughtful interaction brings the next step closer.
          </p>
        </div>
      </section>
      <section className="approach-points section">
        {[
          [
            "01",
            "Beautiful homes.",
            "Photography, proportion and light reveal what makes a space interesting.",
          ],
          [
            "02",
            "Thoughtful presentation.",
            "Each home has its own visual story, supported by clear specifications and useful details.",
          ],
          [
            "03",
            "Modern discovery.",
            "Search, filters, saved homes and a personal finder make it easier to explore.",
          ],
          [
            "04",
            "Easy enquiries.",
            "A direct path from curiosity to conversation, with transparent expectations at every step.",
          ],
        ].map(([n, h, p]) => (
          <article key={n}>
            <span>{n}</span>
            <h3>{h}</h3>
            <p>{p}</p>
          </article>
        ))}
      </section>
      <section className="about-concept section">
        <Photo
          src="/images/property-02.webp"
          alt="Architectural interior inspiration"
        />
        <div>
          <Eyebrow>A CONCEPT BY JAEGER MEDIA</Eyebrow>
          <h2>
            Made to show
            <br />
            <em>what’s possible.</em>
          </h2>
          <p>
            This is a demonstration of premium property marketing and website
            development. Jaeger Properties is not an operating estate agency.
            All listings, prices and specifications are illustrative, and demo
            enquiries stay in your browser.
          </p>
          <p>
            No founders, awards, sales history or agent testimonials have been
            invented for this concept.
          </p>
          <a
            className="button"
            href={agencyUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            BUILD ONE FOR MY AGENCY <ArrowUpRight size={17} />
          </a>
        </div>
      </section>
    </>
  );
}
export function Contact() {
  const params = useSearchParams();
  const intent = params.get("intent");
  const kind =
    intent === "seller"
      ? "I'd like to list a property"
      : intent === "rent"
        ? "I'm looking to rent"
        : intent === "viewing"
          ? "I'm looking to buy"
          : "General enquiry";
  return (
    <section className="section contact-page">
      <div className="contact-copy">
        <Eyebrow>LET’S START A CONVERSATION</Eyebrow>
        <h1>
          Every next chapter
          <br />
          <em>begins somewhere.</em>
        </h1>
        <p>
          Looking for a home? Considering a move? Try a more thoughtful enquiry
          experience.
        </p>
        <div className="contact-location">
          <Mark />
          <div>
            JAEGER PROPERTIES<span>HARARE, ZIMBABWE · CONCEPT BRAND</span>
          </div>
        </div>
        <p className="demo-note">
          The form is a local demonstration. No real estate agent receives these
          entries and no real viewing is booked.
        </p>
        <div className="agency-contact">
          <Eyebrow>FOR PROPERTY BUSINESSES</Eyebrow>
          <h3>
            See your agency
            <br />
            in a new light.
          </h3>
          <p>
            Commission a real property website from Jaeger Media. This separate
            WhatsApp link starts a genuine business enquiry.
          </p>
          <a
            className="text-link"
            href={agencyUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            CONTACT JAEGER MEDIA <ArrowUpRight size={17} />
          </a>
        </div>
      </div>
      <div className="contact-form-panel">
        <Eyebrow>YOUR NEXT MOVE</Eyebrow>
        <h2>
          {intent === "seller" ? (
            <>
              Give your property
              <br />a <em>better introduction.</em>
            </>
          ) : (
            <>
              Tell us a little
              <br />
              about <em>your plans.</em>
            </>
          )}
        </h2>
        <EnquiryForm key={kind} kind={kind} viewing={intent === "viewing"} />
      </div>
    </section>
  );
}
export function ConceptNotes() {
  return (
    <section className="section concept-notes">
      <Eyebrow>TRANSPARENCY / DESIGN CONCEPT</Eyebrow>
      <h1>
        Beautifully imagined.
        <br />
        <em>Clearly identified.</em>
      </h1>
      <h3>About this platform</h3>
      <p>
        Jaeger Properties is a portfolio concept by Jaeger Media, not an
        operating real estate agency. The Harare locations, listing titles,
        prices, dates and specifications are sample data. No listing is
        genuinely available and no viewing is booked.
      </p>
      <h3>Imagery</h3>
      <p>
        The completed signature residence and the standalone framing and
        blueprint references were supplied for this project. The signature
        construction stages were created as illustrative visualizations based on
        the same residence. They do not document real construction, and minor
        visualization differences may exist.
      </p>
      <p>
        Other architectural photographs were downloaded from Unsplash under the{" "}
        <a
          className="text-link"
          href="https://unsplash.com/license"
          target="_blank"
          rel="noopener noreferrer"
        >
          Unsplash License <ArrowUpRight size={16} />
        </a>
        . They are architectural inspiration, not evidence of a Harare property.
        Gallery interiors are illustrative mood imagery, not a verified
        walkthrough of the exterior shown. Image sources are documented in the
        project repository.
      </p>
      <h3>Local demo storage</h3>
      <p>
        Favourites are stored in localStorage. Demo listings, uploaded
        photographs and enquiries are stored in IndexedDB in your browser. Data
        is not shared across browsers or devices and may be cleared by browser
        settings. The management area is an intentionally open local demo, with
        no production authentication. Avoid entering sensitive information.
      </p>
      <h3>Real business contact</h3>
      <p>
        The Jaeger Media WhatsApp link is a genuine external contact handoff for
        businesses commissioning websites. It does not submit a property enquiry
        to an agent.
      </p>
      <ButtonLink href="/">RETURN HOME</ButtonLink>
    </section>
  );
}
