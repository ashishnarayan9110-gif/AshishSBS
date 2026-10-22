import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

function pad(n: number) {
  return String(n).padStart(2, "0");
}

/* The three stacked cards on the index use fixed gradient grounds, so the
   order matters more than the count; anything past three keeps the last. */
function cardClass(i: number) {
  return "card c" + Math.min(i + 1, 3);
}

export default async function HomePage() {
  const [ventures, projects, labNotes, services] = await Promise.all([
    prisma.venture.findMany({
      where: { contentStatus: "PUBLISHED" },
      orderBy: [{ featured: "desc" }, { publishedAt: "desc" }],
    }),
    prisma.project.findMany({
      where: { contentStatus: "PUBLISHED" },
      orderBy: [{ featured: "desc" }, { publishedAt: "desc" }],
    }),
    prisma.labNote.findMany({
      where: { contentStatus: "PUBLISHED" },
      take: 3,
      orderBy: { publishedAt: "desc" },
    }),
    prisma.service.findMany({
      where: { contentStatus: "PUBLISHED" },
      orderBy: { createdAt: "asc" },
    }),
  ]);

  /* the record: every published unit, ventures and projects alike */
  const record = [
    ...projects.map((p) => ({
      kind: "Project",
      href: `/projects/${p.slug}`,
      title: p.title,
      summary: p.summary ?? "",
      meta: [p.discipline, p.year].filter(Boolean).join(" · "),
      gapped: p.outcomeStatus === "FAILED",
    })),
    ...ventures.map((v) => ({
      kind: "Venture",
      href: `/ventures/${v.slug}`,
      title: v.name,
      summary: v.summary ?? "",
      meta: [v.industry, v.status].filter(Boolean).join(" · "),
      gapped: false,
    })),
  ];

  const stack = projects.slice(0, 3);

  return (
    <>
      {/* ── hero ── */}
      <section className="wrap hero">
        <span className="m" data-rv>
          Chandigarh &middot; 30.73&deg;N &middot; status: building
        </span>

        <h1 className="hero__h" data-rv>
          <span className="ln">
            <span>I build things</span>
          </span>
          <span className="ln">
            <span>
              that have to <i>work.</i>
            </span>
          </span>
        </h1>

        <div className="hero__b" data-rv>
          <p className="hero__p up">
            Savison Life &mdash; a compliance-gated pharma marketplace &mdash; is live
            below, along with what shipped alongside it. This is where I keep the record
            of what worked, what didn&rsquo;t, and what I&rsquo;m testing next.
          </p>
          <div className="figs up">
            <span className="fig">
              <b className="tn">{pad(ventures.length)}</b>
              <span className="m">Ventures</span>
            </span>
            <span className="fig">
              <b className="tn">{pad(projects.length)}</b>
              <span className="m">Projects</span>
            </span>
            <span className="fig">
              <b className="tn">{pad(services.length)}</b>
              <span className="m">Services</span>
            </span>
          </div>
        </div>
      </section>

      {record.length > 0 && (
        <div className="mq" aria-hidden="true">
          <div className="mq__i">
            {[0, 1].map((dup) =>
              record.map((u) => (
                <span key={dup + u.href}>
                  {u.title} <i>/</i> {u.kind}
                </span>
              )),
            )}
          </div>
        </div>
      )}

      {/* ── the work, stacked ── */}
      {stack.length > 0 && (
        <section className="wrap stack">
          {stack.map((p, i) => (
            <article key={p.id} className={cardClass(i)} data-rv>
              <span className="card__bg" />
              <div className="card__r">
                <span className={"pill" + (p.outcomeStatus === "FAILED" ? " pill--r" : "")}>
                  {[p.discipline, p.outcomeStatus].filter(Boolean).join(" · ") || "Project"}
                </span>
                <span className="m">{p.year ?? ""}</span>
              </div>
              <div className="up">
                <h2 className="card__t">{p.title}</h2>
                {p.summary && <p className="card__d">{p.summary}</p>}
              </div>
              <div className="card__r">
                <span className="m">{p.industry ?? ""}</span>
                <Link href={`/projects/${p.slug}`} className="m" style={{ color: "var(--bone)" }}>
                  Open &rarr;
                </Link>
              </div>
            </article>
          ))}
        </section>
      )}

      {/* ── horizontal record ── */}
      {record.length > 0 && (
        <section className="gal">
          <div className="gal__st">
            <span className="gal__lbl m">Everything, logged</span>
            <div className="gal__tr">
              {record.map((u, i) => (
                <Link
                  key={u.href}
                  href={u.href}
                  className={"tile" + (u.gapped ? " tile--g" : "")}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
                    <span className="tile__n tn">{pad(i + 1)}</span>
                    <span className="tile__n">{u.kind}</span>
                  </div>
                  <div>
                    <h3 className="tile__t">{u.title}</h3>
                    <p className="tile__n" style={{ marginTop: 10 }}>
                      {u.meta}
                    </p>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 10 }}>
                    <span className="tile__n">Open</span>
                    <span className="tile__v">&rarr;</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── services ── */}
      {services.length > 0 && (
        <section className="wrap sec">
          <div className="sechd" data-rv>
            <h2 className="up">01 / What I do</h2>
            <p className="up">Each engagement starts from a failure mode, not a deliverable list.</p>
          </div>
          <div className="grid" data-rv>
            {services.map((s, i) => (
              <Link key={s.id} href={`/services/${s.slug}`} className="cell pane">
                <span className="m tn">{pad(i + 1)}</span>
                <h3>{s.name}</h3>
                <p>{s.problem}</p>
                <span className="cell__f">
                  <span className="m">{s.timeline ?? ""}</span>
                  <span className="m">&rarr;</span>
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ── sandbox ── */}
      <section className="wrap sec" style={{ paddingTop: 0 }}>
        <div className="sechd" data-rv>
          <h2 className="up">02 / Sandbox</h2>
          <p className="up">Notes written while something is still unresolved.</p>
        </div>
        {labNotes.length > 0 ? (
          <div className="lst" data-rv>
            {labNotes.map((n, i) => (
              <Link key={n.id} href={`/lab/${n.slug}`} className="ent">
                <span className="m tn">{pad(i + 1)}</span>
                <span>
                  <span className="ent__t">{n.title}</span>
                </span>
                <span className="m tn">{n.category ?? ""}</span>
                <span className="ent__v tn">&rarr;</span>
              </Link>
            ))}
          </div>
        ) : (
          <div className="nil" data-rv>
            <b>Nothing published yet</b>
            <p>
              The sandbox is wired to the CMS and empty. When a note goes up it appears
              here, newest first, with no edit to this page.
            </p>
          </div>
        )}
      </section>

      {/* ── every unit ── */}
      {record.length > 0 && (
        <section className="wrap sec" style={{ paddingTop: 0 }}>
          <div className="sechd" data-rv>
            <h2 className="up">03 / The record</h2>
            <p className="up">Ventures and projects together, newest first. Including the
              ones that didn&rsquo;t go anywhere.</p>
          </div>
          <div className="lst" data-rv>
            {record.map((u, i) => (
              <Link key={u.href} href={u.href} className={"ent" + (u.gapped ? " ent--g" : "")}>
                <span className="m tn">{pad(i + 1)}</span>
                <span>
                  <span className="ent__t">{u.title}</span>
                  {u.summary && <span className="ent__s">{u.summary}</span>}
                </span>
                <span className="m tn">{u.meta}</span>
                <span className="ent__v tn">&rarr;</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="wrap quote" data-rv>
        <h2 className="up">
          Most businesses don&rsquo;t fail from bad ideas.
          <i> They fail from broken systems.</i>
        </h2>
      </section>
    </>
  );
}
