import type { MonthlyReview } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Field } from "@/features/admin/field";

export function MonthlyReviewForm({
  review,
  action,
}: {
  review?: MonthlyReview;
  action: (formData: FormData) => void;
}) {
  const monthValue = review ? review.month.toISOString().slice(0, 7) : "";

  return (
    <form action={action} className="space-y-5">
      <Field label="Slug">
        <input
          name="slug"
          defaultValue={review?.slug}
          required
          className="field-input"
          placeholder="2026-06"
        />
      </Field>
      <Field label="Month">
        <input
          name="month"
          type="month"
          defaultValue={monthValue}
          required
          className="field-input"
        />
      </Field>
      <Field label="What I Built (optional)">
        <textarea
          name="whatIBuilt"
          defaultValue={review?.whatIBuilt ?? ""}
          className="field-input min-h-20"
        />
      </Field>
      <Field label="What I Learned (optional)">
        <textarea
          name="whatILearned"
          defaultValue={review?.whatILearned ?? ""}
          className="field-input min-h-20"
        />
      </Field>
      <Field label="Interesting Problems (optional)">
        <textarea
          name="problems"
          defaultValue={review?.problems ?? ""}
          className="field-input"
        />
      </Field>
      <Field label="Failures (optional)">
        <textarea
          name="failures"
          defaultValue={review?.failures ?? ""}
          className="field-input"
        />
      </Field>
      <Field label="Reading (optional)">
        <textarea
          name="reading"
          defaultValue={review?.reading ?? ""}
          className="field-input"
        />
      </Field>
      <Field label="Next Month (optional)">
        <textarea
          name="nextMonth"
          defaultValue={review?.nextMonth ?? ""}
          className="field-input"
        />
      </Field>
      <Field label="Content status">
        <select
          name="contentStatus"
          defaultValue={review?.contentStatus ?? "DRAFT"}
          className="field-input"
        >
          <option value="DRAFT">Draft</option>
          <option value="PUBLISHED">Published</option>
          <option value="ARCHIVED">Archived</option>
        </select>
      </Field>
      <Button type="submit">{review ? "Save changes" : "Create review"}</Button>
    </form>
  );
}
