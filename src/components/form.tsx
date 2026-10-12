"use client";
import { useState } from "react";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { useDemo } from "./provider";
import { locations } from "@/lib/data";
export function EnquiryForm({
  kind = "General enquiry",
  property = "",
  viewing = false,
}: {
  kind?: string;
  property?: string;
  viewing?: boolean;
}) {
  const { saveEnquiry, ready } = useDemo();
  const [choice, setChoice] = useState(kind),
    [status, setStatus] = useState(""),
    [pending, setPending] = useState(false),
    [success, setSuccess] = useState(false);
  const today = new Date().toLocaleDateString("en-CA");
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const fields = Object.fromEntries(new FormData(form).entries()) as Record<
      string,
      string
    >;
    if (viewing && fields.date < today) {
      setStatus("Please choose today or a future date.");
      return;
    }
    setPending(true);
    setStatus("");
    try {
      await saveEnquiry({
        kind: viewing ? "Viewing request" : choice,
        property,
        fields,
      });
      setSuccess(true);
    } catch (e) {
      setStatus(
        e instanceof Error
          ? e.message
          : "Could not store your demo enquiry. Please try again.",
      );
    } finally {
      setPending(false);
    }
  }
  if (!ready)
    return (
      <p className="demo-note" role="status">
        Restoring local demo storage…
      </p>
    );
  if (success)
    return (
      <div className="form-success" role="status">
        <CheckCircle2 size={32} />
        <h3>Your demo {viewing ? "request" : "enquiry"} is saved.</h3>
        <p>
          Stored only in this browser. No message was sent to an agent
          {viewing ? " and no viewing has been booked" : ""}. You can review it
          in the demo management area.
        </p>
        <button className="text-link" onClick={() => setSuccess(false)}>
          Create another enquiry <ArrowUpRight size={17} />
        </button>
      </div>
    );
  return (
    <form className="enquiry-form" onSubmit={submit}>
      <p className="demo-note">
        DEMO MODE · Saved in this browser only. No real{" "}
        {viewing ? "viewing is booked" : "message is sent"}.
      </p>
      {!viewing && (
        <label>
          How can we help?
          <select
            name="intent"
            value={choice}
            onChange={(e) => setChoice(e.target.value)}
          >
            <option>I'm looking to buy</option>
            <option>I'm looking to rent</option>
            <option>I'd like to list a property</option>
            <option>General enquiry</option>
          </select>
        </label>
      )}
      <div className="form-row">
        <label>
          Full name
          <input
            name="name"
            autoComplete="name"
            required
            maxLength={100}
            placeholder="Your full name"
          />
        </label>
        <label>
          Email
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="you@example.com"
          />
        </label>
      </div>
      <label>
        Phone
        <input
          name="phone"
          type="tel"
          autoComplete="tel"
          required
          minLength={7}
          maxLength={30}
          placeholder="Your contact number"
        />
      </label>
      {viewing ? (
        <div className="form-row">
          <label>
            Preferred date
            <input name="date" type="date" min={today} required />
          </label>
          <label>
            Preferred time
            <select name="time" required>
              <option value="">Choose a time</option>
              {[
                "09:00",
                "10:00",
                "11:00",
                "12:00",
                "14:00",
                "15:00",
                "16:00",
              ].map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </label>
        </div>
      ) : choice.includes("list") ? (
        <div className="form-row">
          <label>
            Property suburb
            <select name="location">
              <option value="">Select a suburb</option>
              {locations.map((l) => (
                <option key={l}>{l}</option>
              ))}
            </select>
          </label>
          <label>
            Property address
            <input
              name="address"
              placeholder="For this demonstration"
              required
            />
          </label>
        </div>
      ) : choice.includes("buy") || choice.includes("rent") ? (
        <div className="form-row">
          <label>
            Preferred suburb
            <select name="location">
              <option value="">I'm open to possibilities</option>
              {locations.map((l) => (
                <option key={l}>{l}</option>
              ))}
            </select>
          </label>
          <label>
            Indicative budget (USD)
            <input
              name="budget"
              type="number"
              min="0"
              placeholder={
                choice.includes("rent") ? "Monthly budget" : "Purchase budget"
              }
            />
          </label>
        </div>
      ) : null}
      <label>
        Message
        <textarea
          name="message"
          rows={4}
          maxLength={2500}
          placeholder={
            property
              ? `Tell us what interests you about ${property}`
              : "Tell us a little about your next chapter."
          }
        />
      </label>
      <label className="checkbox">
        <input type="checkbox" required name="consent" value="accepted" />I
        understand this is a concept demo and my entry is stored locally in this
        browser.
      </label>
      {status && (
        <p className="error" role="alert">
          {status}
        </p>
      )}
      <button className="button" type="submit" disabled={pending || !ready}>
        {pending
          ? "SAVING…"
          : viewing
            ? "SAVE DEMO VIEWING REQUEST"
            : "SAVE DEMO ENQUIRY"}
        <ArrowUpRight size={17} />
      </button>
      <p className="form-footnote">
        Avoid entering sensitive information. Clear stored entries from Demo
        Management.
      </p>
    </form>
  );
}
