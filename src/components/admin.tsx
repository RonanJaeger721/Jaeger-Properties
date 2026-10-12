"use client";
import { useState } from "react";
import { Plus, Edit3, Trash2, ArrowUpRight, Upload, Check } from "lucide-react";
import {
  Property,
  locations,
  types,
  sampleProperties,
  priceLabel,
} from "@/lib/data";
import { useDemo } from "./provider";
import { Eyebrow, Photo, ButtonLink } from "./ui";
import { Modal } from "./property-detail";
const blank: Property = {
  id: "",
  slug: "",
  title: "",
  location: "Borrowdale",
  purpose: "buy",
  type: "House",
  price: 0,
  beds: 3,
  baths: 2,
  parking: 2,
  area: 150,
  images: [],
  description: "",
  features: [],
  lifestyle: ["family"],
  featured: false,
  available: true,
  created: "",
};
async function compress(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      reject(new Error("Choose JPG, PNG or WebP images."));
      return;
    }
    if (file.size > 20 * 1024 * 1024) {
      reject(new Error("Each source image must be under 20 MB."));
      return;
    }
    const url = URL.createObjectURL(file),
      img = new window.Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ratio = Math.min(1, 1200 / Math.max(img.width, img.height));
      canvas.width = img.width * ratio;
      canvas.height = img.height * ratio;
      canvas
        .getContext("2d")
        ?.drawImage(img, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(url);
      resolve(canvas.toDataURL("image/webp", 0.82));
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("This image could not be read."));
    };
    img.src = url;
  });
}
export function Admin() {
  const { properties, enquiries, ready, saveProperties, clearEnquiries } =
    useDemo();
  const [tab, setTab] = useState("properties"),
    [edit, setEdit] = useState<Property | null>(null),
    [pending, setPending] = useState(false),
    [error, setError] = useState(""),
    [message, setMessage] = useState(""),
    [remove, setRemove] = useState<string | null>(null),
    [clear, setClear] = useState(false);
  async function save(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!edit) return;
    setError("");
    if (!edit.images.length) {
      setError("Upload at least one property photograph.");
      return;
    }
    const slug = edit.slug
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9-]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
    if (!slug) {
      setError("Enter a valid title or URL slug.");
      return;
    }
    if (properties.some((p) => p.slug === slug && p.id !== edit.id)) {
      setError("This URL slug already exists. Choose a unique one.");
      return;
    }
    setPending(true);
    try {
      const p = {
        ...edit,
        slug,
        id: edit.id || `JP-DEMO-${crypto.randomUUID().slice(0, 8)}`,
        created: edit.created || new Date().toISOString().slice(0, 10),
      };
      await saveProperties(
        edit.id
          ? properties.map((x) => (x.id === p.id ? p : x))
          : [p, ...properties],
      );
      setEdit(null);
      setMessage("Property saved in this browser.");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Save failed.");
    } finally {
      setPending(false);
    }
  }
  async function upload(files: FileList | null) {
    if (!files || !edit) return;
    setPending(true);
    setError("");
    try {
      if (files.length + edit.images.length > 8)
        throw new Error("Use up to eight images per property.");
      const pics = await Promise.all(Array.from(files).map(compress));
      setEdit((x) => (x ? { ...x, images: [...x.images, ...pics] } : null));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed.");
    } finally {
      setPending(false);
    }
  }
  async function deleteProperty() {
    if (!remove) return;
    try {
      await saveProperties(properties.filter((p) => p.id !== remove));
      setRemove(null);
      setMessage("Property removed from this browser.");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Delete failed.");
    }
  }
  function field<K extends keyof Property>(key: K, value: Property[K]) {
    setEdit((p) => (p ? { ...p, [key]: value } : null));
  }
  return (
    <section className="section admin-page">
      <Eyebrow>LOCAL PROTOTYPE / DEMO MANAGEMENT</Eyebrow>
      <div className="section-heading">
        <div>
          <h1>
            A considered
            <br />
            <em>collection, managed.</em>
          </h1>
          <p>
            Changes live only in this browser. This is an open demo interface,
            not a secured production administration system.
          </p>
        </div>
        <ButtonLink href="/buy">VIEW WEBSITE</ButtonLink>
      </div>
      <div className="admin-tabs">
        <button
          onClick={() => setTab("properties")}
          className={tab === "properties" ? "active" : ""}
        >
          Properties ({properties.length})
        </button>
        <button
          onClick={() => setTab("enquiries")}
          className={tab === "enquiries" ? "active" : ""}
        >
          Demo enquiries ({enquiries.length})
        </button>
      </div>
      {message && (
        <p className="success" role="status">
          <Check size={17} />
          {message}
        </p>
      )}
      {error && !edit && (
        <p className="error" role="alert">
          {error}
        </p>
      )}
      {!ready ? (
        <p>Restoring local demo data…</p>
      ) : tab === "properties" ? (
        <>
          <div className="admin-toolbar">
            <span>Local sample catalogue</span>
            <button
              className="button"
              onClick={() => {
                setError("");
                setEdit({ ...blank });
              }}
            >
              <Plus size={17} /> ADD PROPERTY
            </button>
          </div>
          <div className="admin-list">
            {properties.map((p) => (
              <article key={p.id}>
                <Photo src={p.images[0]} alt={p.title} />
                <div>
                  <h3>{p.title}</h3>
                  <p>
                    {p.location} · {priceLabel(p)} ·{" "}
                    {p.purpose === "buy" ? "For sale" : "Rental"}
                  </p>
                  <span>
                    {p.featured ? "Featured · " : ""}
                    {p.available ? "Visible in demo" : "Hidden from collection"}
                  </span>
                </div>
                <div className="admin-item-actions">
                  <button
                    className="icon-button"
                    onClick={() => {
                      setError("");
                      setEdit({ ...p });
                    }}
                    aria-label={`Edit ${p.title}`}
                  >
                    <Edit3 size={18} />
                  </button>
                  <button
                    className="icon-button"
                    onClick={() => setRemove(p.id)}
                    aria-label={`Delete ${p.title}`}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="admin-toolbar">
            <p>Stored locally · No external messages sent</p>
            <button
              className="text-link"
              onClick={() => setClear(true)}
              disabled={!enquiries.length}
            >
              <Trash2 size={16} /> CLEAR DEMO ENQUIRIES
            </button>
          </div>
          {enquiries.length ? (
            <div className="enquiry-records">
              {enquiries.map((e) => (
                <article key={e.id}>
                  <div>
                    <span className="eyebrow">{e.kind}</span>
                    <small>{new Date(e.created).toLocaleString()}</small>
                  </div>
                  <h3>{e.fields.name}</h3>
                  {e.property && <p>Property: {e.property}</p>}
                  <dl>
                    {Object.entries(e.fields)
                      .filter(([k]) => k !== "name" && k !== "consent")
                      .map(([k, v]) => (
                        <div key={k}>
                          <dt>{k}</dt>
                          <dd>{v || "—"}</dd>
                        </div>
                      ))}
                  </dl>
                </article>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <h3>No demo enquiries yet.</h3>
              <p>Try a contact or viewing form to see its saved entry here.</p>
              <ButtonLink href="/contact">TRY AN ENQUIRY</ButtonLink>
            </div>
          )}
        </>
      )}
      {edit && (
        <Modal
          onClose={() => !pending && setEdit(null)}
          label="Property editor"
        >
          <Eyebrow>DEMO PROPERTY EDITOR</Eyebrow>
          <h2>
            {edit.id ? "Edit this" : "Introduce a"} <em>home.</em>
          </h2>
          <form className="enquiry-form" onSubmit={save}>
            <label>
              Property title
              <input
                required
                value={edit.title}
                onChange={(e) => {
                  field("title", e.target.value);
                  if (!edit.id)
                    field(
                      "slug",
                      e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
                    );
                }}
              />
            </label>
            <label>
              URL slug
              <input
                required
                pattern="[a-z0-9-]+"
                value={edit.slug}
                onChange={(e) => field("slug", e.target.value)}
              />
            </label>
            <div className="form-row">
              <label>
                Location
                <select
                  value={edit.location}
                  onChange={(e) => field("location", e.target.value)}
                >
                  {locations.map((l) => (
                    <option key={l}>{l}</option>
                  ))}
                </select>
              </label>
              <label>
                Purpose
                <select
                  value={edit.purpose}
                  onChange={(e) =>
                    field("purpose", e.target.value as "buy" | "rent")
                  }
                >
                  <option value="buy">For sale</option>
                  <option value="rent">To rent</option>
                </select>
              </label>
            </div>
            <div className="form-row">
              <label>
                Property type
                <select
                  value={edit.type}
                  onChange={(e) => field("type", e.target.value)}
                >
                  {types.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </label>
              <label>
                Sample price (USD)
                <input
                  type="number"
                  required
                  min="1"
                  value={edit.price || ""}
                  onChange={(e) => field("price", Number(e.target.value))}
                />
              </label>
            </div>
            <div className="form-row">
              {(["beds", "baths", "parking", "area"] as const).map((k) => (
                <label key={k}>
                  {k === "beds"
                    ? "Bedrooms"
                    : k === "baths"
                      ? "Bathrooms"
                      : k === "area"
                        ? "Floor area m²"
                        : "Parking"}
                  <input
                    required
                    type="number"
                    min={k === "parking" ? 0 : 1}
                    value={edit[k]}
                    onChange={(e) => field(k, Number(e.target.value))}
                  />
                </label>
              ))}
            </div>
            <label>
              Description
              <textarea
                required
                rows={4}
                value={edit.description}
                onChange={(e) => field("description", e.target.value)}
              />
            </label>
            <label>
              Features (one per line)
              <textarea
                rows={3}
                value={edit.features.join("\n")}
                onChange={(e) => field("features", e.target.value.split("\n"))}
              />
            </label>
            <label>
              Lifestyle
              <select
                value={edit.lifestyle[0] || "family"}
                onChange={(e) => field("lifestyle", [e.target.value])}
              >
                <option value="family">Family homes</option>
                <option value="city">City living</option>
                <option value="luxury">Luxury</option>
                <option value="investment">Investment</option>
              </select>
            </label>
            <div className="admin-checks">
              <label className="checkbox">
                <input
                  type="checkbox"
                  checked={edit.featured}
                  onChange={(e) => field("featured", e.target.checked)}
                />
                Featured property
              </label>
              <label className="checkbox">
                <input
                  type="checkbox"
                  checked={edit.available}
                  onChange={(e) => field("available", e.target.checked)}
                />
                Visible in demo collection
              </label>
            </div>
            <label className="upload-label">
              <Upload size={18} />
              Add photographs (JPG, PNG, WebP)
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                multiple
                onChange={(e) => upload(e.target.files)}
                disabled={pending}
              />
            </label>
            <div className="upload-previews">
              {edit.images.map((src, i) => (
                <div key={i}>
                  <Photo src={src} alt={`Uploaded image ${i + 1}`} />
                  <button
                    type="button"
                    onClick={() =>
                      field(
                        "images",
                        edit.images.filter((_, j) => j !== i),
                      )
                    }
                    aria-label={`Remove image ${i + 1}`}
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              ))}
            </div>
            {error && (
              <p className="error" role="alert">
                {error}
              </p>
            )}
            <button className="button" type="submit" disabled={pending}>
              {pending ? "PROCESSING…" : "SAVE DEMO PROPERTY"}
              <ArrowUpRight size={17} />
            </button>
            <p className="demo-note">
              Uploads and edits are stored locally in IndexedDB. They are not
              shared with other visitors.
            </p>
          </form>
        </Modal>
      )}
      {remove && (
        <Modal onClose={() => setRemove(null)} label="Delete property">
          <h2>
            Remove this <em>home?</em>
          </h2>
          <p>This removes the demo listing from this browser's catalogue.</p>
          <button className="button" onClick={deleteProperty}>
            REMOVE PROPERTY <Trash2 size={17} />
          </button>
        </Modal>
      )}
      {clear && (
        <Modal onClose={() => setClear(false)} label="Clear enquiries">
          <h2>
            Clear local <em>enquiries?</em>
          </h2>
          <p>This deletes all saved demo enquiry records in this browser.</p>
          <button
            className="button"
            onClick={async () => {
              try {
                await clearEnquiries();
                setClear(false);
                setMessage("Local enquiries cleared.");
              } catch (e) {
                setError(
                  e instanceof Error ? e.message : "Could not clear records.",
                );
              }
            }}
          >
            CLEAR ENQUIRIES <Trash2 size={17} />
          </button>
        </Modal>
      )}
    </section>
  );
}
