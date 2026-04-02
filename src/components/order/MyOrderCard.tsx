"use client";

import Link from "next/link";

// ── Types ──────────────────────────────────────────────────────────────────
interface Product {
  id: string;
  medicineName: string;
  price: number;
  image: string;
  stock: number;
  detels: string;
  manufacturer: string;
}

interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  product: Product;
}

interface Order {
  id: string;
  customerId: string;
  shippingAddress: string;
  totalAmount: number;
  status: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
  createdAt: string;
  updatedAt: string;
  items: OrderItem[];
}

// ── Mock data (replace with real fetch) ───────────────────────────────────


// ── Helpers ────────────────────────────────────────────────────────────────
const statusConfig: Record<
  Order["status"],
  { label: string; className: string }
> = {
  Pending: {
    label: "Pending",
    className:
      "bg-amber-100 text-amber-700 border border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800",
  },
  Processing: {
    label: "Processing",
    className:
      "bg-blue-100 text-blue-700 border border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800",
  },
  Shipped: {
    label: "Shipped",
    className:
      "bg-violet-100 text-violet-700 border border-violet-200 dark:bg-violet-900/30 dark:text-violet-400 dark:border-violet-800",
  },
  Delivered: {
    label: "Delivered",
    className:
      "bg-emerald-100 text-emerald-700 border border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800",
  },
  Cancelled: {
    label: "Cancelled",
    className:
      "bg-red-100 text-red-700 border border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800",
  },
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function shortId(id: string) {
  return id.slice(0, 8).toUpperCase();
}

// ── Icons (inline SVG) ─────────────────────────────────────────────────────
const IconPackage = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M20 7l-8-4-8 4m16 0v10l-8 4-8-4V7m16 0L12 11M4 7l8 4"
    />
  </svg>
);

const IconLocation = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
);

const IconClock = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    viewBox="0 0 24 24"
  >
    <circle cx="12" cy="12" r="10" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
  </svg>
);

const IconArrow = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
  </svg>
);



// ── Order Card ─────────────────────────────────────────────────────────────
 export default function OrderCard({ order }: { order: Order }) {
  const cfg = statusConfig[order.status];
  // deduplicate items by productId for preview
  const uniqueImages = [
    ...new Map(order.items.map((i) => [i.productId, i.product.image])).values(),
  ].slice(0, 3);

  return (
    <div className="group relative bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
      {/* Top accent bar */}
      <div className="h-1 w-full bg-gradient-to-r from-teal-400 via-cyan-500 to-blue-500" />

      <div className="p-5">
        {/* Header row */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 flex items-center justify-center flex-shrink-0">
              <IconPackage />
            </div>
            <div>
              <p className="text-xs font-mono text-zinc-400 dark:text-zinc-500 mb-0.5">
                Order ID
              </p>
              <p className="font-bold text-sm text-zinc-800 dark:text-zinc-100 tracking-wide">
                #{shortId(order.id)}
              </p>
            </div>
          </div>
          <span
            className={`text-xs font-semibold px-3 py-1 rounded-full ${cfg.className}`}
          >
            {cfg.label}
          </span>
        </div>

        {/* Medicine preview images */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex -space-x-2">
            {uniqueImages.map((img, idx) => (
              <div
                key={idx}
                className="w-9 h-9 rounded-lg border-2 border-white dark:border-zinc-900 overflow-hidden bg-zinc-100 dark:bg-zinc-800"
                style={{ zIndex: uniqueImages.length - idx }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img}
                  alt="medicine"
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
          <span className="text-sm text-zinc-500 dark:text-zinc-400 ml-1">
            {order.items.length} item{order.items.length !== 1 ? "s" : ""}
          </span>
        </div>

        {/* Meta info */}
        <div className="space-y-1.5 mb-4">
          <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400">
            <IconLocation />
            <span className="text-sm capitalize">{order.shippingAddress}</span>
          </div>
          <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400">
            <IconClock />
            <span className="text-sm">{formatDate(order.createdAt)}</span>
          </div>
        </div>

        {/* Footer: amount + details btn */}
        <div className="flex items-center justify-between pt-4 border-t border-zinc-100 dark:border-zinc-800">
          <div>
            <p className="text-xs text-zinc-400 dark:text-zinc-500 mb-0.5">
              Total Amount
            </p>
            <p className="text-lg font-bold text-zinc-800 dark:text-zinc-100">
              ৳{order.totalAmount.toFixed(2)}
            </p>
          </div>

          <Link
            href={`/user-dashboard/myorder/${order.id}`}
            className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors duration-200"
          >
            Details
            <IconArrow />
          </Link>
        </div>
      </div>
    </div>
  );
}



