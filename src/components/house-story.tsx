"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { stages } from "@/lib/data";
import { ButtonLink } from "./ui";
gsap.registerPlugin(ScrollTrigger);
export function HouseStory({ compact = false }: { compact?: boolean }) {
  const root = useRef<HTMLDivElement>(null),
    scene = useRef<HTMLDivElement>(null),
    controller = useRef<ScrollTrigger | null>(null);
  const [active, setActive] = useState(0),
    [reduced, setReduced] = useState(false);
  const [manual, setManual] = useState(false);
  useEffect(() => {
    const media = gsap.matchMedia();
    media.add(
      {
        motion: "(prefers-reduced-motion: no-preference)",
        reduce: "(prefers-reduced-motion: reduce)",
      },
      (ctx) => {
        const reduce = !!ctx.conditions?.reduce || manual;
        setReduced(reduce);
        if (reduce) {
          setActive(5);
          return;
        }
        const layers = scene.current?.querySelectorAll(".stage-layer");
        if (!layers) return;
        gsap.set(layers, { opacity: 0, clipPath: "inset(100% 0% 0% 0%)" });
        gsap.set(layers[0], { opacity: 1, clipPath: "inset(0% 0% 0% 0%)" });
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: () => `+=${window.innerHeight * (compact ? 2.8 : 3.8)}`,
            pin: scene.current,
            scrub: 0.55,
            invalidateOnRefresh: true,
            onUpdate: (self) =>
              setActive(Math.min(5, Math.floor(self.progress * 5 + 0.25))),
          },
        });
        for (let i = 1; i < 5; i++) {
          timeline.to(
            layers[i],
            {
              opacity: 1,
              clipPath: "inset(0% 0% 0% 0%)",
              duration: 0.8,
              ease: "power1.inOut",
            },
            i - 0.75,
          );
          timeline.to(
            layers[i - 1],
            { opacity: 0, duration: 0.45, ease: "none" },
            i - 0.4,
          );
        }
        timeline.to(
          layers[4],
          { scale: 1.24, duration: 1, ease: "power1.inOut" },
          4,
        );
        controller.current = timeline.scrollTrigger || null;
        return () => {
          controller.current = null;
        };
      },
      root,
    );
    return () => media.revert();
  }, [compact, manual]);
  function go(index: number) {
    if (reduced) {
      setActive(index);
      return;
    }
    const c = controller.current;
    if (c)
      window.scrollTo({
        top: c.start + (c.end - c.start) * (index / 5),
        behavior: "smooth",
      });
  }
  return (
    <section
      className={`house-story ${compact ? "compact" : ""} ${reduced ? "still-story" : ""}`}
      ref={root}
      aria-label="Six-stage conceptual residence transformation"
    >
      <div ref={scene} className={`house-scene stage-${active}`}>
        <div className="scene-grid" aria-hidden="true" />
        <div className="house-images">
          <div className="house-setting" aria-hidden="true">
            <Image
              src="/images/stage-foundation.webp"
              alt=""
              fill
              sizes="100vw"
              priority
            />
          </div>
          {stages.slice(0, 5).map((s, i) => (
            <div
              className="stage-layer"
              key={s.name}
              style={
                reduced
                  ? {
                      opacity: Math.min(active, 4) === i ? 1 : 0,
                      clipPath: "none",
                    }
                  : i === 0
                    ? { opacity: 1 }
                    : { opacity: 0 }
              }
            >
              <Image
                src={s.image}
                alt={`${s.name} — conceptual visualization of the same residence`}
                fill
                sizes="100vw"
                priority={i === 0}
                loading={i === 0 ? undefined : "eager"}
              />
            </div>
          ))}
        </div>
        <div className="scene-shade" aria-hidden="true" />
        <div className="scene-top">
          <span>JAEGER PROPERTIES — DESIGN CONCEPT</span>
          <span className="scene-location">
            HARARE, ZIMBABWE <span>17°49′ S / 31°03′ E</span>
          </span>
        </div>
        <div className="hero-title">
          <div className="scene-kicker">
            <i /> {String(active + 1).padStart(2, "0")} / {stages[active].label}
          </div>
          <p className="scene-chapter">{stages[active].name}</p>
          <h1 key={active}>{stages[active].copy}</h1>
          <p>
            {active === 5
              ? "Considered homes. A new way to discover them."
              : "A residence imagined. From the first line to the final detail."}
          </p>
          {active === 5 ? (
            <div className="hero-actions">
              <ButtonLink href="/buy" light>
                EXPLORE PROPERTIES
              </ButtonLink>
              <ButtonLink href="/contact?intent=viewing" className="outline">
                BOOK A VIEWING
              </ButtonLink>
            </div>
          ) : (
            <button
              className="scroll-invite"
              onClick={() => go(Math.min(active + 1, 5))}
            >
              SCROLL TO BRING IT TO LIFE <ArrowDown size={18} />
            </button>
          )}
        </div>
        <div className="scene-side" aria-hidden="true">
          THE RESIDENCE · ARCHITECTURAL STUDY 001
        </div>
        <div className="stage-navigation">
          <div className="stage-count">
            <span>{String(active + 1).padStart(2, "0")}</span> / 06
          </div>
          <div className="stage-track">
            {stages.map((s, i) => (
              <button
                key={s.name}
                className={i === active ? "active" : i < active ? "passed" : ""}
                onClick={() => go(i)}
                aria-label={`Show stage ${i + 1}: ${s.name}`}
                aria-current={i === active ? "step" : undefined}
              >
                <span className="track-line" />
                <span>{s.name}</span>
              </button>
            ))}
          </div>
          <a className="skip-story" href="#curated">
            SKIP TO HOMES <ArrowUpRight size={15} />
          </a>
        </div>
        <p className="scene-disclosure">
          ILLUSTRATIVE CONCEPT VISUALS · NOT A BUILT DEVELOPMENT
        </p>
        <button
          className="motion-toggle"
          onClick={() => {
            const top = (root.current?.getBoundingClientRect().top || 0) + window.scrollY;
            window.scrollTo({top, behavior: 'instant'});
            setManual(!manual);
          }}
          aria-pressed={manual}
        >
          {manual ? "USE SCROLL STORY" : "VIEW WITHOUT MOTION"}
        </button>
      </div>
    </section>
  );
}
