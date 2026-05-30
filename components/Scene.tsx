"use client";

import { useEffect } from "react";

type Variant = "home" | "page";

export default function Scene({ variant }: { variant: Variant }) {
  useEffect(() => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cleanups: Array<() => void> = [];

    const on = (
      target: Window | Document | HTMLElement,
      type: string,
      handler: EventListenerOrEventListenerObject,
      opts?: AddEventListenerOptions
    ) => {
      target.addEventListener(type, handler, opts);
      cleanups.push(() => target.removeEventListener(type, handler, opts));
    };

    /* ---- 星空を生成 ---- */
    const stars = document.querySelector<HTMLElement>(".stars");
    if (stars) {
      stars.replaceChildren();
      const n = window.innerWidth < 700 ? 70 : 130;
      const frag = document.createDocumentFragment();
      for (let i = 0; i < n; i++) {
        const s = document.createElement("div");
        s.className = "star" + (Math.random() > 0.86 ? " big" : "");
        s.style.left = Math.random() * 100 + "%";
        s.style.top = Math.pow(Math.random(), 1.5) * 64 + "%";
        s.style.setProperty("--tw", (0.4 + Math.random() * 0.5).toFixed(2));
        s.style.setProperty("--dur", (2.5 + Math.random() * 4).toFixed(1) + "s");
        s.style.setProperty("--del", (Math.random() * 4).toFixed(1) + "s");
        frag.appendChild(s);
      }
      stars.appendChild(frag);
    }

    /* ---- 火の粉を生成 ---- */
    const fire = document.querySelector<HTMLElement>(".campfire");
    if (fire && !reduce) {
      fire.querySelectorAll(".spark").forEach((el) => el.remove());
      for (let i = 0; i < 7; i++) {
        const sp = document.createElement("div");
        sp.className = "spark";
        sp.style.setProperty("--sdur", (2.6 + Math.random() * 2.4).toFixed(1) + "s");
        sp.style.setProperty("--sdel", (Math.random() * 3).toFixed(1) + "s");
        sp.style.setProperty("--sx", (Math.random() * 40 - 20).toFixed(0) + "px");
        fire.appendChild(sp);
      }
    }

    /* ---- ナビのスクロール状態 ---- */
    const bar = document.querySelector<HTMLElement>(".nav");
    if (bar) {
      const onScroll = () => bar.classList.toggle("scrolled", window.scrollY > 40);
      onScroll();
      on(window, "scroll", onScroll, { passive: true });
    }

    /* ---- スクロール出現 ---- */
    const items = document.querySelectorAll<HTMLElement>(".reveal");
    if (items.length) {
      if (reduce || !("IntersectionObserver" in window)) {
        items.forEach((el) => el.classList.add("in"));
      } else {
        const io = new IntersectionObserver(
          (entries) => {
            entries.forEach((e) => {
              if (e.isIntersecting) {
                e.target.classList.add("in");
                io.unobserve(e.target);
              }
            });
          },
          { threshold: 0.14, rootMargin: "0px 0px -8% 0px" }
        );
        items.forEach((el) => io.observe(el));
        cleanups.push(() => io.disconnect());
      }
    }

    /* ---- パララックス（星のみ・山は固定） ---- */
    if (!reduce && stars) {
      let ticking = false;
      const frame = () => {
        const y = window.scrollY;
        const shift = Math.max(-60, Math.min(60, y * 0.04));
        stars.style.transform = "translateY(" + shift + "px)";
        ticking = false;
      };
      on(
        window,
        "scroll",
        () => {
          if (!ticking) {
            requestAnimationFrame(frame);
            ticking = true;
          }
        },
        { passive: true }
      );
    }

    /* ---- 数字カウントの軽い演出（data-count） ---- */
    const counterEls = document.querySelectorAll<HTMLElement>("[data-count]");
    if (counterEls.length && !reduce) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (!e.isIntersecting) return;
            const el = e.target as HTMLElement;
            const end = parseFloat(el.dataset.count || "0");
            const dur = 1100;
            const t0 = performance.now();
            const suffix = el.dataset.suffix || "";
            const stepFn = (t: number) => {
              const p = Math.min(1, (t - t0) / dur);
              const val = Math.round(end * (1 - Math.pow(1 - p, 3)));
              el.textContent = val + suffix;
              if (p < 1) requestAnimationFrame(stepFn);
            };
            requestAnimationFrame(stepFn);
            io.unobserve(el);
          });
        },
        { threshold: 0.6 }
      );
      counterEls.forEach((el) => io.observe(el));
      cleanups.push(() => io.disconnect());
    }

    /* ---- 時間の移ろい（ホームのみ：昼→夕→夜） ---- */
    const day = document.querySelector<HTMLElement>(".sky-layer.l-day");
    const dusk = document.querySelector<HTMLElement>(".sky-layer.l-dusk");
    const sun = document.getElementById("sun");
    if (day && dusk) {
      const DAY_END = 0.16;
      const NIGHT_START = 0.72;
      const clamp = (v: number) => Math.max(0, Math.min(1, v));
      let ticking = false;

      const apply = () => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const p = max > 0 ? clamp(window.scrollY / max) : 0;

        const dayOp = clamp((DAY_END - p) / DAY_END);
        const nightOp = clamp((p - NIGHT_START) / (1 - NIGHT_START));
        const fireOp = clamp((p - 0.5) / 0.35);
        const starOp = clamp((p - 0.58) / 0.35);

        day.style.opacity = String(dayOp);
        dusk.style.opacity = String(1 - nightOp);
        if (stars) stars.style.opacity = String(starOp);
        document.body.style.setProperty("--fire-op", fireOp.toFixed(3));
        document.body.style.setProperty("--fog-op", (0.35 + 0.45 * (1 - dayOp)).toFixed(3));
        document.body.classList.toggle("day-top", p < 0.12);

        if (sun) {
          const ty = 8 + p * 150;
          sun.style.transform = "translateY(" + ty + "vh)";
          sun.style.opacity = clamp((0.5 - p) / 0.16).toFixed(3);
          sun.style.filter =
            "saturate(" + (1 + p * 1.4).toFixed(2) + ") hue-rotate(" + (-p * 18).toFixed(1) + "deg)";
        }
        ticking = false;
      };
      apply();
      on(
        window,
        "scroll",
        () => {
          if (!ticking) {
            requestAnimationFrame(apply);
            ticking = true;
          }
        },
        { passive: true }
      );
      on(window, "resize", apply, { passive: true });
      cleanups.push(() => {
        document.body.classList.remove("day-top");
        document.body.style.removeProperty("--fire-op");
        document.body.style.removeProperty("--fog-op");
      });
    }

    return () => cleanups.forEach((fn) => fn());
  }, []);

  if (variant === "home") {
    return (
      <>
        <div className="sky-layer l-night" />
        <div className="sky-layer l-dusk" />
        <div className="sky-layer l-day" />
        <div className="sun" id="sun" />
        <div className="stars" />
        <div className="shoot" />
        <div className="landscape" id="scene">
          <div className="fog f1" />
          <div className="fog f2" />
          <div className="ridge ridge-far" />
          <div className="ridge ridge-mid" />
          <div className="ridge ridge-near" />
          <div className="ground" />
          <div className="tent">
            <div className="pole" />
            <div className="body" />
            <div className="door" />
          </div>
          <div className="campfire">
            <div className="glow" />
            <div className="halo" />
            <div className="flame" />
            <div className="flame inner" />
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="sky" />
      <div className="stars" />
      <div className="landscape compact" id="scene">
        <div className="fog f1" />
        <div className="fog f2" />
        <div className="ridge ridge-far" />
        <div className="ridge ridge-mid" />
        <div className="ridge ridge-near" />
        <div className="ground" />
      </div>
    </>
  );
}
