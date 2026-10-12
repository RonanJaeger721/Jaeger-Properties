"use client";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <section className="section not-found">
      <p className="eyebrow">A MOMENT TO RESET</p>
      <h1>
        This page needs
        <br />
        <em>a fresh start.</em>
      </h1>
      <button className="button" onClick={reset}>
        TRY AGAIN →
      </button>
    </section>
  );
}
