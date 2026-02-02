import React from "react"

export default function SelerDashboard() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-gradient-to-br from-emerald-50 to-teal-100 px-4">
      <div className="max-w-xl w-full bg-white rounded-2xl shadow-lg p-8 text-center">
        {/* Icon */}
        <div className="text-5xl mb-4">🏪</div>

        {/* Welcome Text */}
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          Welcome to Your Seller Dashboard
        </h1>

        <p className="mt-3 text-gray-600 text-sm md:text-base">
          Manage your products, track orders, and grow your business—all from
          one place. You're in control of everything that matters to your store.
        </p>

        {/* Divider */}
        <div className="my-6 h-px bg-gray-200" />

        {/* Motivation line */}
        <p className="text-sm font-medium text-emerald-600">
          Let’s start selling and growing your business 🚀
        </p>
      </div>
    </div>
  )
}