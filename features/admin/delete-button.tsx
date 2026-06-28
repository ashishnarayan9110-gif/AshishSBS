"use client";

export function DeleteButton({
  id,
  name,
  action,
}: {
  id: string;
  name: string;
  action: (id: string) => Promise<void>;
}) {
  return (
    <form
      action={() => action(id)}
      onSubmit={(event) => {
        if (!confirm(`Delete "${name}"? This cannot be undone.`)) {
          event.preventDefault();
        }
      }}
      className="ml-4 inline"
    >
      <button type="submit" className="text-danger underline">
        Delete
      </button>
    </form>
  );
}
