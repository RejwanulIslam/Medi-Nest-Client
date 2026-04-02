
export default function UserDashboard() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <div className="max-w-xl w-full bg-white rounded-2xl shadow-lg p-8 text-center">
        {/* Emoji / Icon */}
        <div className="text-5xl mb-4">👋</div>

        {/* Welcome Text */}
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          Welcome to Your Dashboard
        </h1>

        <p className="mt-3 text-gray-600 text-sm md:text-base">
          We’re glad to have you here. From this dashboard, you’ll be able to
          manage your profile, track your activities, and explore everything
          your account has to offer.
        </p>

        {/* Divider */}
        <div className="my-6 h-px bg-gray-200" />

        {/* Footer Note */}
        <p className="text-xs text-gray-500">
          Tip: Keep your profile updated for a better experience 🚀
        </p>
      </div>
    </div>
  )
}