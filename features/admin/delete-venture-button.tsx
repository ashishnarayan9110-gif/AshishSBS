"use client";

import { deleteVenture } from "@/features/admin/venture-actions";

export function DeleteVentureButton({ id, name }: { id: string; name: string }) {
  return (
    <form
      action={() => deleteVenture(id)}
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
