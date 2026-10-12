"use client";
import { useEffect, useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Search,
  SlidersHorizontal,
  Grid2X2,
  List,
  X,
  ArrowUpRight,
  Heart,
} from "lucide-react";
import { locations, types, filterProperties, Filters } from "@/lib/data";
import { useDemo } from "./provider";
import { Eyebrow, Photo, PropertyCard, ButtonLink } from "./ui";
export function SearchForm() {
  const router = useRouter();
  return (
    <form
      className="property-search"
      onSubmit={(e) => {
        e.preventDefault();
        const d = new FormData(e.currentTarget);
        const purpose = String(d.get("purpose") || "buy");
        d.delete("purpose");
        const query = new URLSearchParams();
        d.forEach((v, k) => {
          if (v) query.set(k, String(v));
        });
        router.push(`/${purpose}?${query}`);
      }}
    >
      <label>
        Location
        <select name="location">
          <option value="">All Harare suburbs</option>
          {locations.map((l) => (
            <option key={l}>{l}</option>
          ))}
        </select>
      </label>
      <label>
        Looking to
        <select name="purpose">
          <option value="buy">Buy a home</option>
          <option value="rent">Rent a home</option>
        </select>
      </label>
      <label>
        Property type
        <select name="type">
          <option value="">All types</option>
          {types.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </label>
      <label>
        Min. price (USD)
        <input type="number" name="min" min="0" placeholder="No minimum" />
      </label>
      <label>
        Max. price (USD)
        <input type="number" name="max" min="0" placeholder="No maximum" />
      </label>
      <label>
        Bedrooms
        <select name="beds">
          <option value="">Any bedrooms</option>
          {[1, 2, 3, 4, 5].map((n) => (
            <option key={n} value={n}>
              {n}+ bedrooms
            </option>
          ))}
        </select>
      </label>
      <button className="button" type="submit">
        SEARCH PROPERTIES <ArrowUpRight size={17} />
      </button>
    </form>
  );
}
export function Catalogue({
  purpose = "buy",
  saved = false,
}: {
  purpose?: string;
  saved?: boolean;
}) {
  const { properties, favourites } = useDemo(),
    params = useSearchParams(),
    router = useRouter();
  const [drawer, setDrawer] = useState(false),
    [view, setView] = useState("grid");
  const filters = Object.fromEntries(params.entries()) as Filters;
  const pendingParams = useRef(new URLSearchParams(params.toString()));
  useEffect(() => {
    pendingParams.current = new URLSearchParams(params.toString());
  }, [params]);
  const source = saved
    ? properties.filter((p) => favourites.includes(p.id))
    : properties;
  const result = filterProperties(source, saved ? "" : purpose, filters);
  function update(key: string, value: string) {
    const p = new URLSearchParams(pendingParams.current.toString());
    if (value) p.set(key, value);
    else p.delete(key);
    p.delete("focus");
    pendingParams.current = p;
    router.replace(`${saved ? "/saved" : "/" + purpose}?${p}`, {
      scroll: false,
    });
  }
  function clear() {
    pendingParams.current = new URLSearchParams();
    router.replace(saved ? "/saved" : "/" + purpose, { scroll: false });
  }
  useEffect(() => {
    if (params.get("focus") === "search") {
      if (window.innerWidth <= 1024) setDrawer(true);
      else
        document
          .querySelector<HTMLInputElement>(".desktop-filters input")
          ?.focus();
    }
  }, [params]);
  useEffect(() => {
    if (!drawer) return;
    const previous = document.activeElement as HTMLElement;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.querySelector<HTMLElement>(".filter-drawer input")?.focus();
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDrawer(false);
      if (e.key === "Tab") {
        const nodes = Array.from(
          document.querySelectorAll<HTMLElement>(
            ".filter-drawer button,.filter-drawer input,.filter-drawer select",
          ),
        );
        const first = nodes[0],
          last = nodes.at(-1);
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };
    document.addEventListener("keydown", key);
    return () => {
      document.removeEventListener("keydown", key);
      document.body.style.overflow = overflow;
      previous?.focus();
    };
  }, [drawer]);
  const filterContent = (
    <>
      <div className="filter-heading">
        <h3>Refine your search</h3>
        <button
          className="icon-button mobile-only"
          onClick={() => setDrawer(false)}
          aria-label="Close filters"
        >
          <X size={20} />
        </button>
      </div>
      <label>
        Keyword
        <div className="input-icon">
          <Search size={16} />
          <input
            value={filters.q || ""}
            placeholder="Name, suburb or type"
            onChange={(e) => update("q", e.target.value)}
          />
        </div>
      </label>
      <label>
        Location
        <select
          value={filters.location || ""}
          onChange={(e) => update("location", e.target.value)}
        >
          <option value="">All suburbs</option>
          {locations.map((l) => (
            <option key={l}>{l}</option>
          ))}
        </select>
      </label>
      <label>
        Property type
        <select
          value={filters.type || ""}
          onChange={(e) => update("type", e.target.value)}
        >
          <option value="">All property types</option>
          {types.map((l) => (
            <option key={l}>{l}</option>
          ))}
        </select>
      </label>
      <div className="form-row">
        <label>
          Min. USD
          <input
            aria-label="Minimum price"
            type="number"
            min="0"
            value={filters.min || ""}
            onChange={(e) => update("min", e.target.value)}
            placeholder="Any"
          />
        </label>
        <label>
          Max. USD
          <input
            aria-label="Maximum price"
            type="number"
            min="0"
            value={filters.max || ""}
            onChange={(e) => update("max", e.target.value)}
            placeholder="Any"
          />
        </label>
      </div>
      <div className="form-row">
        {(["beds", "baths"] as const).map((k) => (
          <label key={k}>
            {k === "beds" ? "Bedrooms" : "Bathrooms"}
            <select
              value={filters[k] || ""}
              onChange={(e) => update(k, e.target.value)}
            >
              <option value="">Any</option>
              {[1, 2, 3, 4, 5].map((n) => (
                <option value={n} key={n}>
                  {n}+
                </option>
              ))}
            </select>
          </label>
        ))}
      </div>
      <label>
        Lifestyle
        <select
          value={filters.lifestyle || ""}
          onChange={(e) => update("lifestyle", e.target.value)}
        >
          <option value="">All lifestyles</option>
          <option value="city">City living</option>
          <option value="family">Family homes</option>
          <option value="luxury">Luxury residences</option>
          <option value="investment">Investment properties</option>
        </select>
      </label>
      <button className="clear-filters" onClick={clear}>
        Clear all filters
      </button>
      <button className="button mobile-only" onClick={() => setDrawer(false)}>
        SHOW {result.length} HOMES <ArrowUpRight size={17} />
      </button>
      <p className="demo-note">
        All prices and specifications are sample data. Properties are not
        genuinely available.
      </p>
    </>
  );
  return (
    <>
      <section
        className={`catalogue-intro ${purpose === "rent" && !saved ? "rental" : ""}`}
      >
        {purpose === "rent" && !saved && (
          <Photo
            src="/images/property-05.webp"
            alt="Calm rental living inspiration"
          />
        )}
        <div>
          <Eyebrow>
            {saved
              ? "YOUR PERSONAL COLLECTION"
              : purpose === "rent"
                ? "ROOM FOR YOUR NEXT CHAPTER"
                : "A MORE CONSIDERED COLLECTION"}
          </Eyebrow>
          <h1>
            {saved ? (
              <>
                Places you’ve
                <br />
                <em>held onto.</em>
              </>
            ) : purpose === "rent" ? (
              <>
                Find a space that
                <br />
                <em>feels like yours.</em>
              </>
            ) : (
              <>
                Find your
                <br />
                <em>next home.</em>
              </>
            )}
          </h1>
          <p>
            {saved
              ? "Your favourite homes, saved in this browser."
              : purpose === "rent"
                ? "A place for now. A space to make your own."
                : "From a first home to a forever home. Begin with possibility."}
          </p>
        </div>
        <span className="intro-index">
          {saved ? "03" : "0" + (purpose === "rent" ? 2 : 1)} / THE COLLECTION
        </span>
      </section>
      <section className="catalogue-body section">
        <p className="demo-strip">
          DESIGN CONCEPT · {saved ? "Saved samples" : "Illustrative listings"} ·
          USD {purpose === "rent" ? "per month" : "sample pricing"} · No actual
          availability.
        </p>
        <div className="catalogue-layout">
          <aside className="desktop-filters">{filterContent}</aside>
          <div className="catalogue-results">
            <div className="results-toolbar">
              <p aria-live="polite">
                <strong>{result.length}</strong>{" "}
                {result.length === 1 ? "home" : "homes"} to discover
              </p>
              <button
                className="filter-mobile text-link"
                onClick={() => setDrawer(true)}
              >
                <SlidersHorizontal size={16} /> Filters
              </button>
              <label className="sort-label">
                <span className="sr-only">Sort properties</span>
                <select
                  value={filters.sort || "newest"}
                  onChange={(e) => update("sort", e.target.value)}
                >
                  <option value="newest">Newest first</option>
                  <option value="price-low">Price: low to high</option>
                  <option value="price-high">Price: high to low</option>
                </select>
              </label>
              <div className="view-switch">
                <button
                  className={view === "grid" ? "active" : ""}
                  aria-label="Grid view"
                  aria-pressed={view === "grid"}
                  onClick={() => setView("grid")}
                >
                  <Grid2X2 size={18} />
                </button>
                <button
                  className={view === "list" ? "active" : ""}
                  aria-label="List view"
                  aria-pressed={view === "list"}
                  onClick={() => setView("list")}
                >
                  <List size={18} />
                </button>
              </div>
            </div>
            {result.length ? (
              <div
                className={`results-grid ${view === "list" ? "list-view" : ""}`}
              >
                {result.map((p) => (
                  <PropertyCard key={p.id} p={p} />
                ))}
              </div>
            ) : (
              <div className="empty-state">
                {saved ? <Heart size={35} /> : <Search size={35} />}
                <h2>
                  {saved && !favourites.length
                    ? "A little room for favourites."
                    : "A new search, a new possibility."}
                </h2>
                <p>
                  {saved && !favourites.length
                    ? "Tap the heart on any property to start your collection."
                    : "No sample homes match these choices. Try a wider price range or another suburb."}
                </p>
                {saved && !favourites.length ? (
                  <ButtonLink href="/buy">EXPLORE HOMES</ButtonLink>
                ) : (
                  <button className="button" onClick={clear}>
                    CLEAR FILTERS <ArrowUpRight size={17} />
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
      {drawer && (
        <div className="filter-overlay">
          <button
            className="drawer-backdrop"
            aria-label="Close filters"
            onClick={() => setDrawer(false)}
          />
          <aside
            className="filter-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Property filters"
          >
            {filterContent}
          </aside>
        </div>
      )}
    </>
  );
}
