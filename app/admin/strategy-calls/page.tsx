import { prisma } from "@/lib/prisma";
import { Badge } from "@/components/ui/badge";
import { DeleteButton } from "@/features/admin/delete-button";
import { deleteStrategyCallBooking } from "@/features/admin/strategy-call-actions";

export const dynamic = "force-dynamic";

const STATUS_TONE = {
  PENDING: "warning",
  PAID: "success",
  FAILED: "danger",
} as const;

export default async function AdminStrategyCallsPage() {
  const bookings = await prisma.strategyCallBooking.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="mx-auto max-w-(--layout-max-width) px-6 py-16">
      <h1 className="text-2xl font-medium">Strategy Call Bookings</h1>

      <table className="border-border mt-8 w-full border-collapse text-sm">
        <thead>
          <tr className="border-border border-b text-left">
            <th className="py-2 font-medium">Name</th>
            <th className="py-2 font-medium">Email</th>
            <th className="py-2 font-medium">Stage</th>
            <th className="py-2 font-medium">Payment</th>
            <th className="py-2 font-medium">Question</th>
            <th className="py-2"></th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id} className="border-border border-b align-top">
              <td className="py-3">{booking.name}</td>
              <td className="text-muted py-3">{booking.email}</td>
              <td className="text-muted py-3">{booking.stage}</td>
              <td className="py-3">
                <Badge tone={STATUS_TONE[booking.paymentStatus]}>
                  {booking.paymentStatus}
                </Badge>
              </td>
              <td className="text-muted max-w-xs py-3">{booking.question}</td>
              <td className="py-3 text-right">
                <DeleteButton
                  id={booking.id}
                  name={booking.name}
                  action={deleteStrategyCallBooking}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {bookings.length === 0 ? (
        <p className="text-muted mt-8 text-sm">No bookings yet.</p>
      ) : null}
    </div>
  );
}
