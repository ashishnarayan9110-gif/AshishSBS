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

const DISCIPLINE_LABEL: Record<string, string> = {
  DIGITAL: "Digital",
  FURNITURE: "Furniture",
  TEACHING: "Teaching",
  BUSINESS: "Business",
  PERSONAL: "Personal",
  OTHER: "Other",
};

export function disciplineLabel(discipline: string) {
  return DISCIPLINE_LABEL[discipline] ?? discipline;
}

// Outcome is the honest half of the record: a project that failed says so.
const OUTCOME_TONE: Record<string, Tone> = {
  SHIPPED: "success",
  RUNNING: "success",
  PAUSED: "warning",
  FAILED: "danger",
};

const OUTCOME_LABEL: Record<string, string> = {
  SHIPPED: "Shipped",
  RUNNING: "Running",
  PAUSED: "Paused",
  FAILED: "Failed",
};

export function outcomeLabel(outcome: string) {
  return OUTCOME_LABEL[outcome] ?? outcome;
}

export function ProjectOutcomeBadge({ outcome }: { outcome: string }) {
  return (
    <Badge tone={OUTCOME_TONE[outcome] ?? "neutral"}>{outcomeLabel(outcome)}</Badge>
  );
}
