import Link from "next/link";

export default function CreateEventPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="bg-[#1453A0] px-8 py-6 flex justify-between items-center text-white">
          <h1 className="font-bold text-xl">Create New Event</h1>
          <Link href="/pages/businessDashboard" className="text-white/80 hover:text-white">Cancel</Link>
        </div>
        <form className="p-8 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Event Title</label>
            <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1453A0] outline-none" placeholder="e.g., Grand Opening Sale" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
              <input type="date" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1453A0] outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
              <input type="time" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1453A0] outline-none" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1453A0] outline-none h-32" placeholder="Describe your event..."></textarea>
          </div>
          <div className="pt-4">
            <Link href="/pages/businessDashboard" className="w-full block text-center bg-[#1453A0] text-white font-bold py-3 rounded-lg hover:bg-blue-800 transition">
              Publish Event
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}