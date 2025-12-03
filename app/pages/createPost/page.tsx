import Link from "next/link";

export default function CreatePostPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        
        <div className="bg-[#ff5720] px-6 py-4 flex justify-between items-center text-white">
          <h1 className="font-bold text-lg">Create Post</h1>
          <Link href="/feed" className="text-white/80 hover:text-white">✕</Link>
        </div>

        <div className="p-6">
          <div className="flex gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-gray-200"></div>
            <div className="flex-1">
              <p className="text-sm font-bold text-gray-900">Alex Johnson</p>
              <select className="text-xs bg-gray-100 border-none rounded px-2 py-1 mt-1 text-gray-600 outline-none">
                <option>Public</option>
                <option>Connections Only</option>
              </select>
            </div>
          </div>

          <textarea 
            placeholder="What do you want to talk about?"
            className="w-full h-32 p-2 text-gray-700 resize-none outline-none text-lg placeholder-gray-400"
          ></textarea>

          <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
            <div className="flex gap-4">
              <button className="text-gray-400 hover:text-[#ff5720] transition">
                <span className="sr-only">Add Image</span>
                📷
              </button>
              <button className="text-gray-400 hover:text-[#ff5720] transition">
                <span className="sr-only">Add Video</span>
                🎥
              </button>
              <button className="text-gray-400 hover:text-[#ff5720] transition">
                <span className="sr-only">Add Location</span>
                📍
              </button>
            </div>
            
            <Link 
              href="/feed" 
              className="bg-[#ff5720] hover:bg-orange-700 text-white px-6 py-2 rounded-full font-semibold transition"
            >
              Post
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}