"use client";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
const Home = dynamic(() => import("./home").then((m) => m.Home));
const Catalogue = dynamic(() => import("./catalogue").then((m) => m.Catalogue));
const PropertyDetail = dynamic(() =>
  import("./property-detail").then((m) => m.PropertyDetail),
);
const Developments = dynamic(() =>
  import("./developments").then((m) => m.Developments),
);
const Residence = dynamic(() =>
  import("./developments").then((m) => m.Residence),
);
const Finder = dynamic(() => import("./finder").then((m) => m.Finder));
const About = dynamic(() => import("./editorial").then((m) => m.About));
const Contact = dynamic(() => import("./editorial").then((m) => m.Contact));
const ConceptNotes = dynamic(() =>
  import("./editorial").then((m) => m.ConceptNotes),
);
const Admin = dynamic(() => import("./admin").then((m) => m.Admin));
import { ButtonLink, Eyebrow } from "./ui";
export function Site({ initialPath }: { initialPath: string }) {
  const current = usePathname() || initialPath;
  let page;
  if (current === "/") page = <Home />;
  else if (current === "/buy" || current === "/rent")
    page = <Catalogue purpose={current.slice(1)} />;
  else if (current === "/saved") page = <Catalogue saved />;
  else if (current.startsWith("/properties/"))
    page = <PropertyDetail slug={current.split("/")[2]} />;
  else if (current === "/developments") page = <Developments />;
  else if (current === "/developments/the-residence") page = <Residence />;
  else if (current === "/find-your-home") page = <Finder />;
  else if (current === "/about") page = <About />;
  else if (current === "/contact") page = <Contact />;
  else if (current === "/admin") page = <Admin />;
  else if (current === "/concept-notes") page = <ConceptNotes />;
  else
    page = (
      <section className="section not-found">
        <Eyebrow>404 / A DIFFERENT PATH</Eyebrow>
        <h1>
          Let’s find your
          <br />
          <em>way home.</em>
        </h1>
        <ButtonLink href="/">RETURN HOME</ButtonLink>
      </section>
    );
  return (
    <div className="route-page" key={current}>
      {page}
    </div>
  );
}
