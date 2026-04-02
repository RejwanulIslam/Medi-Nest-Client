"use client"

import { useState } from "react";
import OrderCard from "./MyOrderCard";



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


const IconFilter = () => (
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
            d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z"
        />
    </svg>
);



export default function MyOrdersCompnent({ ORDERS }: any) {
    const [filter, setFilter] = useState<Order["status"] | "All">("All");

    const filtered =
        filter === "All" ? ORDERS : ORDERS?.data?.filter((o: any) => o.status === filter);

    const totalRevenue = ORDERS?.data?.reduce((s: any, o: any) => s + o.totalAmount, 0) || [];


    const statusOptions: (Order["status"] | "All")[] = [
        "All",
        "Pending",
        "Processing",
        "Shipped",
        "Delivered",
        "Cancelled",
    ];

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 transition-colors duration-300">
            {/* ── Header ── */}
            <div className="bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
                                My Orders
                            </h1>
                            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">
                                Track and manage all your medicine orders
                            </p>
                        </div>

                        {/* Summary chips */}
                        <div className="flex items-center gap-3 flex-wrap">
                            <div className="bg-teal-50 dark:bg-teal-900/20 border border-teal-200 dark:border-teal-800 rounded-xl px-4 py-2 text-center">
                                <p className="text-xs text-teal-600 dark:text-teal-400 font-medium">
                                    Total Orders
                                </p>
                                <p className="text-xl font-bold text-teal-700 dark:text-teal-300">
                                    {ORDERS.length}
                                </p>
                            </div>
                            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl px-4 py-2 text-center">
                                <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                                    Total Spent
                                </p>
                                <p className="text-xl font-bold text-blue-700 dark:text-blue-300">
                                    ৳{totalRevenue}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
                {/* ── Filter bar ── */}
                <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-1 scrollbar-hide">
                    <IconFilter />
                    <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mr-1 flex-shrink-0">
                        Filter:
                    </span>
                    {statusOptions.map((s) => (
                        <button
                            key={s}
                            onClick={() => setFilter(s)}
                            className={`flex-shrink-0 text-sm font-medium px-4 py-1.5 rounded-full border transition-all duration-200 ${filter === s
                                ? "bg-teal-600 text-white border-teal-600 dark:bg-teal-500 dark:border-teal-500"
                                : "bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700 hover:border-teal-400 dark:hover:border-teal-600"
                                }`}
                        >
                            {s}

                            {s !== "All" && (

                                <span className="ml-1.5 text-xs opacity-70">

                                    ({ORDERS?.data?.filter((o: any) => o.status === s).length})

                                </span>

                            )}
                        </button>
                    ))}
                </div>

                {/* ── Grid ── */}
                {filtered.length === 0 ? (
                    <div className="text-center py-20 text-zinc-400 dark:text-zinc-600">
                        <p className="text-5xl mb-3">📦</p>
                        <p className="text-lg font-medium">No orders found</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
                        {filtered?.data?.map((order: any) => (
                            <OrderCard key={order.id} order={order} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
