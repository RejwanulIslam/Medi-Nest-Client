import { orderService } from "@/service/orderservices";
import Link from "next/link";
import { notFound } from "next/navigation";
//  Types 
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

//  Mock data 
// const ORDERS: Order[] = [
//   {
//     id: "2c4589ed-63df-4ebc-b383-ec184452023b",
//     customerId: "dd09ZCdAN7JZoStivo6e9yRCpqVdklPh",
//     shippingAddress: "rajshahi",
//     totalAmount: 144,
//     status: "Pending",
//     createdAt: "2026-04-01T01:54:04.393Z",
//     updatedAt: "2026-04-01T01:54:04.393Z",
//     items: [
//       {
//         id: "83cfb658-4c99-45a1-9509-e076c240a914",
//         orderId: "2c4589ed-63df-4ebc-b383-ec184452023b",
//         productId: "b489f9ab-862d-40f1-ac55-b19a0355ec76",
//         quantity: 4,
//         product: {
//           id: "b489f9ab-862d-40f1-ac55-b19a0355ec76",
//           medicineName: "Napa / Ace",
//           price: 1,
//           image:
//             "https://i.ibb.co.com/YBm4XMJG/pills-blue-background-closeup-medicine-concept.jpg",
//           stock: 50000,
//           detels:
//             "Used to relieve mild to moderate pain like headaches and body aches",
//           manufacturer: "Beximco / Square",
//         },
//       },
//       {
//         id: "dd33e4d2-5013-4d7f-b9d6-c835cd11e71b",
//         orderId: "2c4589ed-63df-4ebc-b383-ec184452023b",
//         productId: "82412be4-1544-4e25-b3b5-dfba35bde076",
//         quantity: 2,
//         product: {
//           id: "82412be4-1544-4e25-b3b5-dfba35bde076",
//           medicineName: "Azithromycin",
//           price: 35,
//           image:
//             "https://i.ibb.co.com/Zz4BD63v/assorted-pharmaceutical-medicine-pills-tablets-capsules.jpg",
//           stock: 20000,
//           detels:
//             "Used to treat bacterial infections in the lungs, throat, and skin.",
//           manufacturer: "Square Pharma",
//         },
//       },
//       {
//         id: "b53e043f-64ed-4c6e-9746-f1da45de0529",
//         orderId: "2c4589ed-63df-4ebc-b383-ec184452023b",
//         productId: "82412be4-1544-4e25-b3b5-dfba35bde076",
//         quantity: 2,
//         product: {
//           id: "82412be4-1544-4e25-b3b5-dfba35bde076",
//           medicineName: "Azithromycin",
//           price: 35,
//           image:
//             "https://i.ibb.co.com/Zz4BD63v/assorted-pharmaceutical-medicine-pills-tablets-capsules.jpg",
//           stock: 20000,
//           detels:
//             "Used to treat bacterial infections in the lungs, throat, and skin.",
//           manufacturer: "Square Pharma",
//         },
//       },
//     ],
//   },
//   {
//     id: "7f299866-43e2-4518-a3da-8ded950e5686",
//     customerId: "dd09ZCdAN7JZoStivo6e9yRCpqVdklPh",
//     shippingAddress: "Mirpur 10",
//     totalAmount: 155,
//     status: "Pending",
//     createdAt: "2026-03-31T18:02:27.696Z",
//     updatedAt: "2026-03-31T18:02:27.696Z",
//     items: [
//       {
//         id: "a2f6e11c-92c4-40a9-9ba1-7a4d66996095",
//         orderId: "7f299866-43e2-4518-a3da-8ded950e5686",
//         productId: "b489f9ab-862d-40f1-ac55-b19a0355ec76",
//         quantity: 10,
//         product: {
//           id: "b489f9ab-862d-40f1-ac55-b19a0355ec76",
//           medicineName: "Napa / Ace",
//           price: 1,
//           image:
//             "https://i.ibb.co.com/YBm4XMJG/pills-blue-background-closeup-medicine-concept.jpg",
//           stock: 50000,
//           detels:
//             "Used to relieve mild to moderate pain like headaches and body aches",
//           manufacturer: "Beximco / Square",
//         },
//       },
//       {
//         id: "bad257ed-570a-42ab-a9c3-86209a2ec52c",
//         orderId: "7f299866-43e2-4518-a3da-8ded950e5686",
//         productId: "82412be4-1544-4e25-b3b5-dfba35bde076",
//         quantity: 1,
//         product: {
//           id: "82412be4-1544-4e25-b3b5-dfba35bde076",
//           medicineName: "Azithromycin",
//           price: 35,
//           image:
//             "https://i.ibb.co.com/Zz4BD63v/assorted-pharmaceutical-medicine-pills-tablets-capsules.jpg",
//           stock: 20000,
//           detels:
//             "Used to treat bacterial infections in the lungs, throat, and skin.",
//           manufacturer: "Square Pharma",
//         },
//       },
//       {
//         id: "08e7d33d-b402-4e54-98ca-17d893fd1235",
//         orderId: "7f299866-43e2-4518-a3da-8ded950e5686",
//         productId: "c462326d-f176-4a6e-9cd2-e74b85b3981d",
//         quantity: 2,
//         product: {
//           id: "c462326d-f176-4a6e-9cd2-e74b85b3981d",
//           medicineName: "Povidone-Iodine",
//           price: 55,
//           image:
//             "https://i.ibb.co.com/YFTCNfRh/medicines-medical-supplies-placed-blue.jpg",
//           stock: 5000,
//           detels:
//             "A topical liquid used to prevent infection in minor cuts, scrapes, and burns.",
//           manufacturer: "Square Pharma",
//         },
//       },
//     ],
//   },
// ];





//  Helpers 
const statusConfig: Record<
  Order["status"],
  { label: string; dot: string; badge: string; step: number }
> = {
  Pending: {
    label: "Pending",
    dot: "bg-amber-500",
    badge:
      "bg-amber-100 text-amber-700 border border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800",
    step: 1,
  },
  Processing: {
    label: "Processing",
    dot: "bg-blue-500",
    badge:
      "bg-blue-100 text-blue-700 border border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800",
    step: 2,
  },
  Shipped: {
    label: "Shipped",
    dot: "bg-violet-500",
    badge:
      "bg-violet-100 text-violet-700 border border-violet-200 dark:bg-violet-900/30 dark:text-violet-400 dark:border-violet-800",
    step: 3,
  },
  Delivered: {
    label: "Delivered",
    dot: "bg-emerald-500",
    badge:
      "bg-emerald-100 text-emerald-700 border border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800",
    step: 4,
  },
  Cancelled: {
    label: "Cancelled",
    dot: "bg-red-500",
    badge:
      "bg-red-100 text-red-700 border border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800",
    step: 0,
  },
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function shortId(id: string) {
  return id.slice(0, 8).toUpperCase();
}

//  Icons 
const IconBack = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
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

const IconCalendar = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    viewBox="0 0 24 24"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const IconUser = () => (
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
      d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"
    />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const IconTag = () => (
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
      d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
    />
  </svg>
);

//  Order Status Timeline 
const STEPS = ["Pending", "Processing", "Shipped", "Delivered"];

function StatusTimeline({ status }: { status: Order["status"] }) {
  const cfg = statusConfig[status];
  if (status === "Cancelled") {
    return (
      <div className="flex items-center gap-3 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
        <div className="w-3 h-3 rounded-full bg-red-500 flex-shrink-0" />
        <p className="text-sm font-semibold text-red-600 dark:text-red-400">
          This order has been cancelled.
        </p>
      </div>
    );
  }

  return (
    <div className="relative flex items-center justify-between">
      {/* Connector line */}
      <div className="absolute top-4 left-4 right-4 h-0.5 bg-zinc-200 dark:bg-zinc-700 z-0" />
      <div
        className="absolute top-4 left-4 h-0.5 bg-teal-500 z-0 transition-all duration-500"
        style={{
          width: `${((cfg?.step - 1) / (STEPS?.length - 1)) * 100}%`,
        }}
      />

      {STEPS.map((step, idx) => {
        const done = idx + 1 < cfg?.step;
        const active = idx + 1 === cfg?.step;
        return (
          <div
            key={step}
            className="relative z-10 flex flex-col items-center gap-2"
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${done
                ? "bg-teal-500 border-teal-500"
                : active
                  ? "bg-white dark:bg-zinc-900 border-teal-500"
                  : "bg-white dark:bg-zinc-900 border-zinc-300 dark:border-zinc-600"
                }`}
            >
              {done ? (
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              ) : active ? (
                <div className="w-3 h-3 rounded-full bg-teal-500" />
              ) : (
                <div className="w-3 h-3 rounded-full bg-zinc-300 dark:bg-zinc-600" />
              )}
            </div>
            <span
              className={`text-xs font-medium text-center ${active
                ? "text-teal-600 dark:text-teal-400"
                : done
                  ? "text-zinc-500 dark:text-zinc-400"
                  : "text-zinc-400 dark:text-zinc-600"
                }`}
            >
              {step}
            </span>
          </div>
        );
      })}
    </div>
  );
}

//  Medicine Item Row 
function MedicineRow({ item }: { item: OrderItem }) {
  const subtotal = item.product.price * item.quantity;
  return (
    <div className="flex items-center gap-4 p-4 bg-zinc-50 dark:bg-zinc-800/60 rounded-xl border border-zinc-100 dark:border-zinc-700/60">
      {/* Image */}
      <div className="w-16 h-16 rounded-xl overflow-hidden bg-white dark:bg-zinc-700 border border-zinc-200 dark:border-zinc-600 flex-shrink-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.product.image}
          alt={item.product.medicineName}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-zinc-800 dark:text-zinc-100 truncate">
          {item.product.medicineName}
        </p>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5 line-clamp-1">
          {item.product.detels}
        </p>
        <div className="flex items-center gap-3 mt-1.5 flex-wrap">
          <span className="text-xs bg-zinc-200 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300 px-2 py-0.5 rounded-md font-mono">
            {item.product.manufacturer}
          </span>
          <span className="text-xs text-zinc-400 dark:text-zinc-500">
            Qty: <span className="font-semibold text-zinc-600 dark:text-zinc-300">{item.quantity}</span>
          </span>
          <span className="text-xs text-zinc-400 dark:text-zinc-500">
            Unit: <span className="font-semibold text-zinc-600 dark:text-zinc-300">৳{item.product.price}</span>
          </span>
        </div>
      </div>

      {/* Subtotal */}
      <div className="text-right flex-shrink-0">
        <p className="text-xs text-zinc-400 dark:text-zinc-500 mb-0.5">
          Subtotal
        </p>
        <p className="font-bold text-zinc-800 dark:text-zinc-100">
          {/* ৳{subtotal.toFixed(2)} */}
          ৳{subtotal.toFixed(2)}
        </p>
      </div>
    </div>
  );
}

//  Page Props ─
interface PageProps {
  params: Promise<{ id: string }>;
}

//  Details Page ─

export default async function OrderDetailsPage({ params }: PageProps) {
  const resolvedParams = await params
  const id = resolvedParams.id;
  const ORDERS = await orderService.getAllOrder()
  const orderById = ORDERS?.data?.filter((order: any) => order.orderId == id)
  if (!orderById) notFound();
  console.log("ORDERS", orderById)

  console.log("ierurueiru", id)
  const order = ORDERS?.data?.find((o: any) => o?.orderId == id);

  console.log("order1234", order)
  const cfg = statusConfig[order.status as keyof typeof statusConfig];

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 transition-colors duration-300">
      {/*  Top Bar  */}
      <div className="bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 sticky top-0 z-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-4">
          <Link
            href="/user-dashboard/myorder"
            className="flex items-center gap-1.5 text-sm font-medium text-zinc-500 hover:text-teal-600 dark:text-zinc-400 dark:hover:text-teal-400 transition-colors"
          >
            <IconBack />
            Orders
          </Link>
          <span className="text-zinc-300 dark:text-zinc-700">/</span>
          <span className="text-sm font-mono text-zinc-700 dark:text-zinc-300">
            #{shortId(order.id)}
          </span>
          <div className="ml-auto">
            <span
              className={`text-xs font-semibold px-3 py-1 rounded-full ${cfg?.badge}`}
            >
              {cfg?.label}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 space-y-5">
        {/*  Hero card  */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-sm">
          <div className="h-1.5 w-full bg-gradient-to-r from-teal-400 via-cyan-500 to-blue-500" />
          <div className="p-5">
            <div className="flex flex-wrap gap-4 mb-5">
              {/* Order ID */}
              <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400">
                <IconTag />
                <div>
                  <p className="text-xs text-zinc-400 dark:text-zinc-500">
                    Order ID
                  </p>
                  <p className="text-sm font-mono font-semibold text-zinc-700 dark:text-zinc-200">
                    #{shortId(order?.id)}
                  </p>
                </div>
              </div>
              {/* Customer */}
              <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400">
                <IconUser />
                <div>
                  <p className="text-xs text-zinc-400 dark:text-zinc-500">
                    Customer ID
                  </p>
                  <p className="text-sm font-mono font-semibold text-zinc-700 dark:text-zinc-200">
                    {order?.order?.customerId?.slice(0, 12)}…
                  </p>
                </div>
              </div>
              {/* Shipping */}
              <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400">
                <IconLocation />
                <div>
                  <p className="text-xs text-zinc-400 dark:text-zinc-500">
                    Ship to
                  </p>
                  <p className="text-sm font-semibold text-zinc-700 dark:text-zinc-200 capitalize">
                    {order?.order?.shippingAddress}
                  </p>
                </div>
              </div>
              {/* Date */}
              <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400">
                <IconCalendar />
                <div>
                  <p className="text-xs text-zinc-400 dark:text-zinc-500">
                    Placed on
                  </p>
                  <p className="text-sm font-semibold text-zinc-700 dark:text-zinc-200">
                    {formatDate(order?.order?.createdAt)}
                  </p>
                </div>
              </div>
            </div>

            {/* Status Timeline */}
            <div className="mt-2">
              <p className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-4">
                Order Progress
              </p>
              <StatusTimeline status={order?.order?.status} />
            </div>
          </div>
        </div>

        {/*  Items  */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-sm">
          <div className="px-5 pt-5 pb-3 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
            <h2 className="font-bold text-zinc-800 dark:text-zinc-100">
              Ordered Items
            </h2>
            <span className="text-xs bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 px-2 py-1 rounded-md">
              {orderById?.length} item{orderById?.length !== 1 ? "s" : ""}
            </span>
          </div>
          <div className="p-4 space-y-3">
            {orderById?.map((item: any) => (
              <MedicineRow key={item.id} item={item} />
            ))}
          </div>
        </div>

        {/*  Price Summary  */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-sm">
          <div className="px-5 pt-5 pb-3 border-b border-zinc-100 dark:border-zinc-800">
            <h2 className="font-bold text-zinc-800 dark:text-zinc-100">
              Price Summary
            </h2>
          </div>
          <div className="p-5 space-y-3">
            {/* Per item breakdown */}
            {orderById.map((item: any) => (
              <div
                key={item.id}
                className="flex justify-between text-sm text-zinc-500 dark:text-zinc-400"
              >
                <span className="truncate mr-4">
                  {item.product.medicineName}{" "}
                  <span className="text-zinc-400">× {item.quantity}</span>
                </span>
                <span className="font-medium text-zinc-700 dark:text-zinc-300 flex-shrink-0">
                  ৳{(item.product.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}

            {/* Divider */}
            <div className="border-t border-zinc-100 dark:border-zinc-800 pt-3">
              <div className="flex justify-between text-sm text-zinc-500 dark:text-zinc-400 mb-1.5">
                <span>Subtotal</span>
                <span>৳{order?.order?.totalAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-zinc-500 dark:text-zinc-400">
                <span>Delivery fee</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                  Free
                </span>
              </div>
            </div>

            {/* Total */}
            <div className="border-t border-zinc-200 dark:border-zinc-700 pt-3 flex justify-between items-center">
              <span className="font-bold text-zinc-800 dark:text-zinc-100">
                Total
              </span>
              <span className="text-xl font-bold text-teal-600 dark:text-teal-400">

                {
                  order?.order?.totalAmount.toFixed(2)
                }
              </span>
            </div>
          </div>
        </div>

        {/*  Actions  */}
        <div className="flex gap-3 pb-6">
          <Link
            href="/user-dashboard/myorder/"
            className="flex-1 text-center py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 font-semibold text-sm hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
          >
            ← Back to Orders
          </Link>
          {order.status === "Pending" && (
            <button className="flex-1 py-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 font-semibold text-sm hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors">
              Cancel Order
            </button>
          )}
          {order.status === "Delivered" && (
            <button className="flex-1 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600 text-white font-semibold text-sm transition-colors">
              Reorder
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
