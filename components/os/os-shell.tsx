"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/* The main site's atmosphere and scroll behaviour, in one client component so
   there is a single rAF loop rather than one per effect:
     - the generated gradient field behind everything
     - the custom cursor (ring trails, dot stays exact)
     - header solid-state, section reveals, the sticky card stack,
       the scroll-driven gallery and the progress bar
   Everything here degrades to a static dark page if it fails. */

const VERT = "attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}";

const FRAG =
  "precision highp float;uniform vec2 r;uniform float t;uniform vec2 mo;" +
  "vec2 h2(vec2 p){p=vec2(dot(p,vec2(127.1,311.7)),dot(p,vec2(269.5,183.3)));return -1.+2.*fract(sin(p)*43758.5453);}" +
  "float nz(vec2 p){const float K1=.366025404,K2=.211324865;vec2 i=floor(p+(p.x+p.y)*K1);" +
  "vec2 a=p-i+(i.x+i.y)*K2;vec2 o=(a.x>a.y)?vec2(1.,0.):vec2(0.,1.);vec2 b=a-o+K2;vec2 c=a-1.+2.*K2;" +
  "vec3 hh=max(.5-vec3(dot(a,a),dot(b,b),dot(c,c)),0.);" +
  "vec3 n=hh*hh*hh*hh*vec3(dot(a,h2(i)),dot(b,h2(i+o)),dot(c,h2(i+1.)));return dot(n,vec3(70.));}" +
  "float fbm(vec2 p){float v=0.,a=.5;for(int i=0;i<5;i++){v+=a*nz(p);p*=2.02;a*=.5;}return v;}" +
  "void main(){vec2 uv=gl_FragCoord.xy/r.xy;vec2 q=uv;q.x*=r.x/r.y;vec2 mp=mo;mp.x*=r.x/r.y;" +
  "float d=length(q-mp);float w1=fbm(q*1.5+vec2(t*.045,t*.03));" +
  "float w2=fbm(q*2.3-vec2(t*.035,t*.05)+w1*.6);float w3=fbm(q*1.1+w2*.9-vec2(0.,t*.02));" +
  "float m=w2*.6+w3*.5+.5;m+=smoothstep(.62,0.,d)*.34;" +
  "vec3 c0=vec3(.031,.031,.039);vec3 c1=vec3(.42,.055,.012);" +
  "vec3 c2=vec3(1.,.231,.121);vec3 c3=vec3(1.,.55,.27);" +
  "vec3 col=mix(c0,c1,smoothstep(.22,.62,m));col=mix(col,c2,smoothstep(.58,.86,m));" +
  "col=mix(col,c3,smoothstep(.84,1.03,m));" +
  "col*=.52+.48*smoothstep(1.25,.05,length(uv-vec2(.5,.56)));gl_FragColor=vec4(col,1.);}";

export function OsShell() {
  const pathname = usePathname();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const curRef = useRef<HTMLDivElement | null>(null);
  const dotRef = useRef<HTMLDivElement | null>(null);
  const progRef = useRef<HTMLDivElement | null>(null);

  /* ── the field ─────────────────────────────────────────────── */
  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const gl = cv.getContext("webgl", {
      antialias: false,
      alpha: false,
      powerPreference: "low-power",
    });
    if (!gl) {
      cv.style.background =
        "radial-gradient(70% 60% at 30% 24%,#FF3B1F,#6E1205 44%,#08080A 100%)";
      return;
    }
    const sh = (type: number, src: string) => {
      const o = gl.createShader(type)!;
      gl.shaderSource(o, src);
      gl.compileShader(o);
      return o;
    };
    const pr = gl.createProgram()!;
    gl.attachShader(pr, sh(gl.VERTEX_SHADER, VERT));
    gl.attachShader(pr, sh(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(pr);
    if (!gl.getProgramParameter(pr, gl.LINK_STATUS)) {
      cv.style.background =
        "radial-gradient(70% 60% at 30% 24%,#FF3B1F,#6E1205 44%,#08080A 100%)";
      return;
    }
    gl.useProgram(pr);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(pr, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const uR = gl.getUniformLocation(pr, "r");
    const uT = gl.getUniformLocation(pr, "t");
    const uM = gl.getUniformLocation(pr, "mo");

    let mx = 0.5, my = 0.55, tx = 0.5, ty = 0.55, raf = 0;
    const size = () => {
      const w = innerWidth, h = innerHeight;
      if (w < 2 || h < 2) return;
      const dpr = Math.min(devicePixelRatio || 1, 1.5);
      cv.width = Math.round(w * dpr);
      cv.height = Math.round(h * dpr);
      gl.viewport(0, 0, cv.width, cv.height);
      gl.uniform2f(uR, cv.width, cv.height);
    };
    const onMove = (e: PointerEvent) => {
      tx = e.clientX / innerWidth;
      ty = 1 - e.clientY / innerHeight;
    };
    size();
    addEventListener("resize", size);
    addEventListener("pointermove", onMove, { passive: true });

    const t0 = performance.now();
    const loop = (now: number) => {
      const dpr = Math.min(devicePixelRatio || 1, 1.5);
      if (cv.width < 2 || Math.abs(cv.width / dpr - innerWidth) > 2) size();
      if (cv.width > 1) {
        mx += (tx - mx) * 0.045;
        my += (ty - my) * 0.045;
        gl.uniform1f(uT, reduce ? 8 : (now - t0) / 1000);
        gl.uniform2f(uM, mx, my);
        gl.drawArrays(gl.TRIANGLES, 0, 3);
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("resize", size);
      removeEventListener("pointermove", onMove);
    };
  }, []);

  /* ── cursor ────────────────────────────────────────────────── */
  useEffect(() => {
    if (!matchMedia("(pointer:fine)").matches) return;
    const cur = curRef.current, dot = dotRef.current;
    if (!cur || !dot) return;
    const root = document.documentElement;
    root.classList.add("nocur");

    let px = -200, py = -200, rx = -200, ry = -200, raf = 0;
    const move = (e: PointerEvent) => {
      px = e.clientX; py = e.clientY;
      dot.style.transform = "translate3d(" + px + "px," + py + "px,0)";
      const os = document.querySelector(".os");
      if (os && !os.classList.contains("ready")) os.classList.add("ready");
      /* any movement means the pointer is inside: mouseenter alone is not
         enough, since refocusing with the pointer already in the window
         fires no enter and would strand the ring hidden */
      if (cur.classList.contains("gone")) {
        cur.classList.remove("gone");
        if (!cur.classList.contains("on") && !cur.classList.contains("txt")) {
          dot.classList.remove("gone");
        }
      }
    };
    const over = (e: MouseEvent) => {
      const t = e.target as Element | null;
      if (!t || !t.closest) return;
      const txt = t.closest("textarea,[contenteditable],input:not([type=range]):not([type=file])");
      const hit = t.closest("a,button,.tile,.card,select,[data-go]");
      cur.classList.toggle("txt", !!txt);
      cur.classList.toggle("on", !!hit && !txt);
      dot.classList.toggle("gone", !!(hit || txt));
    };
    const leave = () => { cur.classList.add("gone"); dot.classList.add("gone"); };
    const enter = () => {
      cur.classList.remove("gone");
      if (!cur.classList.contains("on") && !cur.classList.contains("txt")) dot.classList.remove("gone");
    };
    addEventListener("pointermove", move, { passive: true });
    document.addEventListener("mouseover", over, { passive: true });
    document.addEventListener("mouseleave", leave);
    document.addEventListener("mouseenter", enter);
    addEventListener("blur", leave);

    const loop = () => {
      rx += (px - rx) * 0.22;
      ry += (py - ry) * 0.22;
      cur.style.transform = "translate3d(" + rx.toFixed(1) + "px," + ry.toFixed(1) + "px,0)";
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      root.classList.remove("nocur");
      removeEventListener("pointermove", move);
      document.removeEventListener("mouseover", over);
      document.removeEventListener("mouseleave", leave);
      document.removeEventListener("mouseenter", enter);
      removeEventListener("blur", leave);
    };
  }, []);

  /* ── scroll-driven state; re-bound on every route change ───── */
  useEffect(() => {
    const prog = progRef.current;
    let raf = 0;

    /* animation is opt-in: the CSS only hides anything once this class is on,
       so a failed or throttled script can never leave the page blank */
    const os = document.querySelector(".os");
    os?.classList.add("anim");

    const reveals = Array.from(document.querySelectorAll<HTMLElement>("[data-rv]"));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add("rv");
            io.unobserve(en.target);
          }
        });
      },
      { rootMargin: "0px 0px -14% 0px" },
    );
    reveals.forEach((n) => io.observe(n));

    /* IntersectionObserver does not fire in a backgrounded tab, which would
       hold the first screen at opacity 0 until the tab is focused. Reveal
       whatever is already on screen directly, and keep a backstop. */
    const revealVisible = () => {
      reveals.forEach((n) => {
        if (n.classList.contains("rv")) return;
        const r = n.getBoundingClientRect();
        if (r.top < innerHeight * 0.92 && r.bottom > 0) {
          n.classList.add("rv");
          io.unobserve(n);
        }
      });
    };
    revealVisible();
    const backstop = setTimeout(revealVisible, 1200);

    const cards = Array.from(document.querySelectorAll<HTMLElement>(".card"));
    const gal = document.querySelector<HTMLElement>(".gal");
    const tr = document.querySelector<HTMLElement>(".gal__tr");
    const hd = document.querySelector<HTMLElement>(".hd");

    const sizeGal = () => {
      if (!gal || !tr) return;
      if (innerWidth <= 760) { gal.style.height = ""; tr.style.transform = ""; return; }
      const dist = tr.scrollWidth - innerWidth + 40;
      gal.style.height = innerHeight + Math.max(0, dist) + "px";
    };
    sizeGal();
    addEventListener("resize", sizeGal);
    const settle = setTimeout(sizeGal, 700);

    const frame = () => {
      const vh = innerHeight;
      if (hd) hd.classList.toggle("on", scrollY > 24);
      for (let i = 0; i < cards.length; i++) {
        const r = cards[i].getBoundingClientRect();
        const past = Math.min(1, Math.max(0, (vh * 0.12 - r.top) / (r.height * 0.9)));
        cards[i].style.transform = "scale(" + (1 - past * 0.07).toFixed(4) + ")";
        cards[i].style.filter = "brightness(" + (1 - past * 0.2).toFixed(3) + ")";
      }
      if (gal && tr && innerWidth > 760) {
        const dist = tr.scrollWidth - innerWidth + 40;
        if (dist > 0) {
          const gr = gal.getBoundingClientRect();
          const p = Math.min(1, Math.max(0, -gr.top / (gal.offsetHeight - vh)));
          tr.style.transform = "translate3d(" + (-p * dist).toFixed(1) + "px,0,0)";
        }
      }
      if (prog) {
        const max = document.body.scrollHeight - vh;
        prog.style.width = (max > 0 ? (scrollY / max) * 100 : 0).toFixed(2) + "%";
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(settle);
      clearTimeout(backstop);
      io.disconnect();
      removeEventListener("resize", sizeGal);
    };
  }, [pathname]);

  return (
    <>
      <canvas ref={canvasRef} className="fieldcv" aria-hidden="true" />
      <div className="fieldfade" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />
      <div ref={progRef} className="prog" aria-hidden="true" />
      <div ref={curRef} className="cur" aria-hidden="true" />
      <div ref={dotRef} className="dot" aria-hidden="true" />
    </>
  );
}
