import { redirect } from "next/navigation";

// This list duplicated the "How I think" section on About, so About is now the
// single home for it. Individual write-ups still live at /principles/[slug] and
// are linked from there; this route just forwards anyone holding an old link.
export default function PrinciplesPage() {
  redirect("/about#how-i-think");
}
