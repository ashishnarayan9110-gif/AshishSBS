import { type ReactNode } from "react";

type Tone = "neutral" | "success" | "warning" | "danger";

const TONE_CLASSES: Record<Tone, string> = {
  neutral: "bg-muted-background text-muted",
  success: "bg-success/10 text-success",
  warning: "bg-warning/10 text-warning",
  danger: "bg-danger/10 text-danger",
};

export function Badge({
  tone = "neutral",
  children,
}: {
  tone?: Tone;
  children: ReactNode;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${TONE_CLASSES[tone]}`}
    >
      {children}
    </span>
  );
}

const VENTURE_STATUS_TONE: Record<string, Tone> = {
  ACTIVE: "success",
  RESEARCH: "neutral",
  PAUSED: "warning",
  SUNSET: "danger",
};

const VENTURE_STATUS_LABEL: Record<string, string> = {
  ACTIVE: "Active",
  RESEARCH: "Research",
  PAUSED: "Paused",
  SUNSET: "Sunset",
};

export function VentureStatusBadge({ status }: { status: string }) {
  return (
    <Badge tone={VENTURE_STATUS_TONE[status] ?? "neutral"}>
      {VENTURE_STATUS_LABEL[status] ?? status}
    </Badge>
  );
}
