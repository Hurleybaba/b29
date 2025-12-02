import Link from "next/link";

export default function UpgradePage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Upgrade to Business</h1>
        <p className="text-lg text-gray-600">
          Unlock powerful tools to manage your presence, host events, and reach customers nearby.
        </p>
      </div>

      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
        {/* Free Plan (Current) */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 opacity-75">
          <h3 className="text-xl font-semibold text-gray-900">Personal Account</h3>
          <p className="text-3xl font-bold text-gray-900 mt-4">$0 <span className="text-sm font-medium text-gray-500">/mo</span></p>
          <ul className="mt-6 space-y-4 text-gray-600">
            <li className="flex items-center">✓ Create normal posts</li>
            <li className="flex items-center">✓ View business profiles</li>
            <li className="flex items-center">✓ Receive proximity notifications</li>
          </ul>
          <button disabled className="mt-8 w-full py-3 px-4 rounded-lg border border-gray-300 text-gray-400 font-medium cursor-not-allowed">
            Current Plan
          </button>
        </div>

        {/* Business Plan */}
        <div className="bg-white rounded-2xl shadow-xl border-2 border-[#1453A0] p-8 relative transform md:-translate-y-2">
          <div className="absolute top-0 right-0 bg-[#1453A0] text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">RECOMMENDED</div>
          <h3 className="text-xl font-semibold text-gray-900">Business Owner</h3>
          <p className="text-3xl font-bold text-gray-900 mt-4">$29 <span className="text-sm font-medium text-gray-500">/mo</span></p>
          <p className="text-sm text-gray-500 mt-1">Billed monthly</p>
          
          <ul className="mt-6 space-y-4 text-gray-700">
            <li className="flex items-center font-medium">
              <span className="text-[#1453A0] mr-2">✓</span> Create & Host Events
            </li>
            <li className="flex items-center font-medium">
              <span className="text-[#1453A0] mr-2">✓</span> Business Dashboard
            </li>
            <li className="flex items-center font-medium">
              <span className="text-[#1453A0] mr-2">✓</span> Analytics & Insights
            </li>
            <li className="flex items-center font-medium">
              <span className="text-[#1453A0] mr-2">✓</span> Priority Support
            </li>
          </ul>
          
          <Link href="/payment" className="mt-8 w-full block text-center py-3 px-4 rounded-lg bg-[#1453A0] hover:bg-blue-800 text-white font-bold transition shadow-lg">
            Upgrade Now
          </Link>
        </div>
      </div>
    </div>
  );
}