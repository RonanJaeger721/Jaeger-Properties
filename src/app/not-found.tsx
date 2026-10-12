import Link from "next/link";
export default function NotFound() {
  return (
    <section className="section not-found">
      <p className="eyebrow">404 / A DIFFERENT PATH</p>
      <h1>
        Let’s find your
        <br />
        <em>way home.</em>
      </h1>
      <Link className="button" href="/">
        RETURN HOME →
      </Link>
    </section>
  );
}
