"use client";
import { useState } from "react";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import { locations, types, filterProperties, Filters } from "@/lib/data";
import { useDemo } from "./provider";
import { Photo, PropertyCard, ButtonLink, Eyebrow } from "./ui";
export function Finder() {
  const { properties } = useDemo();
  const [step, setStep] = useState(1),
    [intent, setIntent] = useState("buy"),
    [filters, setFilters] = useState<Filters>({}),
    [error, setError] = useState("");
  const results = filterProperties(
    properties,
    intent === "investment" ? "buy" : intent,
    {
      ...filters,
      lifestyle: intent === "investment" ? "investment" : undefined,
    },
  );
  function update(k: string, v: string) {
    setFilters((x) => ({ ...x, [k]: v }));
    setError("");
  }
  function next() {
    if (
      filters.min &&
      filters.max &&
      Number(filters.min) > Number(filters.max)
    ) {
      setError("Maximum price must be at least the minimum price.");
      return;
    }
    setStep(3);
  }
  return (
    <section className="finder-page">
      <div className="finder-visual">
        <Photo
          src="/images/property-08.webp"
          alt="A contemporary home to imagine"
          priority
        />
        <div>
          <Eyebrow>A HOME THAT FEELS LIKE YOU</Eyebrow>
          <h2>
            Start with a feeling.
            <br />
            <em>Find your place.</em>
          </h2>
          <p>Your next chapter begins with what matters most.</p>
        </div>
      </div>
      <div className="finder-content">
        <div className="finder-progress">
          {["Your next move", "What matters", "Your matches"].map((n, i) => (
            <button
              key={n}
              disabled={i + 1 > step}
              className={step === i + 1 ? "active" : ""}
              onClick={() => setStep(i + 1)}
            >
              <span>
                {i + 1 < step ? (
                  <Check size={15} />
                ) : (
                  String(i + 1).padStart(2, "0")
                )}
              </span>
              {n}
            </button>
          ))}
        </div>
        <div className="finder-step" key={step}>
          {step === 1 ? (
            <>
              <Eyebrow>STEP 01 / THE POSSIBILITIES</Eyebrow>
              <h1>
                What are you
                <br />
                <em>looking for?</em>
              </h1>
              <div className="intent-options">
                {[
                  ["buy", "A place to own.", "Buy a home"],
                  ["rent", "A space for now.", "Rent a home"],
                  ["investment", "A considered next move.", "Investment"],
                ].map(([v, n, s]) => (
                  <button
                    key={v}
                    className={intent === v ? "selected" : ""}
                    onClick={() => setIntent(v)}
                    aria-pressed={intent === v}
                  >
                    <span>
                      <small>{s}</small>
                      <strong>{n}</strong>
                    </span>
                    <span className="selection-circle">
                      {intent === v && <Check size={15} />}
                    </span>
                  </button>
                ))}
              </div>
              <button className="button" onClick={() => setStep(2)}>
                LET’S FIND YOUR PLACE <ArrowUpRight size={17} />
              </button>
            </>
          ) : step === 2 ? (
            <>
              <Eyebrow>STEP 02 / YOUR PRIORITIES</Eyebrow>
              <h1>
                What matters
                <br />
                <em>most to you?</em>
              </h1>
              <p>A little direction helps us find your sample matches.</p>
              <div className="finder-fields">
                <label>
                  Location
                  <select
                    value={filters.location || ""}
                    onChange={(e) => update("location", e.target.value)}
                  >
                    <option value="">I'm open to possibilities</option>
                    {locations.map((l) => (
                      <option key={l}>{l}</option>
                    ))}
                  </select>
                </label>
                <div className="form-row">
                  <label>
                    Bedrooms
                    <select
                      value={filters.beds || ""}
                      onChange={(e) => update("beds", e.target.value)}
                    >
                      <option value="">Any</option>
                      {[1, 2, 3, 4, 5].map((n) => (
                        <option key={n} value={n}>
                          {n}+
                        </option>
                      ))}
                    </select>
                  </label>
                  <label>
                    Property type
                    <select
                      value={filters.type || ""}
                      onChange={(e) => update("type", e.target.value)}
                    >
                      <option value="">All types</option>
                      {types.map((t) => (
                        <option key={t}>{t}</option>
                      ))}
                    </select>
                  </label>
                </div>
                <div className="form-row">
                  <label>
                    Min. USD {intent === "rent" ? " / month" : ""}
                    <input
                      type="number"
                      min="0"
                      value={filters.min || ""}
                      onChange={(e) => update("min", e.target.value)}
                      placeholder="No minimum"
                    />
                  </label>
                  <label>
                    Max. USD {intent === "rent" ? " / month" : ""}
                    <input
                      type="number"
                      min="0"
                      value={filters.max || ""}
                      onChange={(e) => update("max", e.target.value)}
                      placeholder="No maximum"
                    />
                  </label>
                </div>
              </div>
              {error && (
                <p role="alert" className="error">
                  {error}
                </p>
              )}
              <div className="finder-actions">
                <button className="text-link" onClick={() => setStep(1)}>
                  <ArrowLeft size={16} /> BACK
                </button>
                <button className="button" onClick={next}>
                  SEE YOUR MATCHES <ArrowUpRight size={17} />
                </button>
              </div>
            </>
          ) : (
            <>
              <Eyebrow>STEP 03 / YOUR PERSONAL SELECTION</Eyebrow>
              <h1>
                A few places
                <br />
                <em>to begin.</em>
              </h1>
              <p aria-live="polite">
                {results.length} sample{" "}
                {results.length === 1 ? "home matches" : "homes match"} your
                choices.
              </p>
              <button className="text-link" onClick={() => setStep(2)}>
                <ArrowLeft size={16} /> REFINE YOUR CHOICES
              </button>
              {results.length ? (
                <div className="finder-results">
                  {results.map((p) => (
                    <PropertyCard key={p.id} p={p} />
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <h3>Let’s widen the possibilities.</h3>
                  <p>No sample homes match your current choices.</p>
                  <button
                    className="button"
                    onClick={() => {
                      setFilters({});
                      setStep(2);
                    }}
                  >
                    START A WIDER SEARCH <ArrowUpRight size={17} />
                  </button>
                </div>
              )}
              <ButtonLink
                href={`/${intent === "rent" ? "rent" : "buy"}?${new URLSearchParams({ ...Object.fromEntries(Object.entries(filters).filter(([, v]) => v)), ...(intent === "investment" ? { lifestyle: "investment" } : {}) }).toString()}`}
              >
                OPEN FULL COLLECTION
              </ButtonLink>
            </>
          )}
        </div>
        <p className="demo-note">
          DESIGN CONCEPT · Matches use illustrative listings and sample USD
          prices.
        </p>
      </div>
    </section>
  );
}
