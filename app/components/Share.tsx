

import { useState } from "react";
import { Share2, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Share() {
  const [open, setOpen] = useState(false);

  const shareData = {
    title: "Check this out!",
    text: "Check this out!",
    url: window.location.href,
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log("Share canceled", err);
      }
    } else {
      setOpen(true);
    }
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={handleNativeShare}
        className="px-4 py-2 rounded-xl bg-blue-600 text-white flex items-center gap-2 shadow-md hover:bg-blue-700 transition-all"
      >
        <Share2 size={20} /> Share
      </button>

      {/* Fallback Modal for browsers without Web Share API */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-40"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-lg space-y-4"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">Share</h2>
                <button onClick={() => setOpen(false)}>
                  <X size={22} />
                </button>
              </div>

              <p className="text-gray-600 text-sm">
                Your browser doesn’t support device sharing.  
                Copy the link below:
              </p>

              <div className="p-3 border rounded-xl bg-gray-100">
                <input
                  className="w-full bg-transparent outline-none"
                  value={window.location.href}
                  readOnly
                />
              </div>

              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                }}
                className="w-full py-2 bg-blue-600 text-white rounded-xl"
              >
                Copy Link
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
