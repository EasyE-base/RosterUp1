'use client';

import { motion } from 'framer-motion';

export function HeroGraphic() {
  return (
    <div className="relative w-full h-full">
      {/* Browser window frame */}
      <div className="bg-gray-900 rounded-t-xl p-3">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
          <div className="flex-1 mx-4">
            <div className="bg-gray-800 rounded-md h-6 flex items-center px-3">
              <span className="text-xs text-gray-400">rosterup.com/dashboard</span>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard content */}
      <div className="bg-white rounded-b-xl shadow-2xl p-6 border border-gray-200">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg" />
            <div>
              <div className="h-4 w-24 bg-gray-900 rounded mb-1" />
              <div className="h-3 w-32 bg-gray-400 rounded" />
            </div>
          </div>
          <div className="flex gap-2">
            <div className="h-8 px-4 bg-gray-100 rounded-lg flex items-center">
              <div className="w-16 h-3 bg-gray-400 rounded" />
            </div>
            <div className="h-8 px-4 bg-blue-600 rounded-lg flex items-center">
              <div className="w-20 h-3 bg-white rounded" />
            </div>
          </div>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <motion.div 
            className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="h-3 w-16 bg-blue-600 rounded" />
              <div className="w-6 h-6 bg-blue-500 rounded-full" />
            </div>
            <div className="h-6 w-12 bg-blue-700 rounded mb-1" />
            <div className="h-2 w-20 bg-blue-400 rounded" />
          </motion.div>

          <motion.div 
            className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl border border-green-200"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="h-3 w-16 bg-green-600 rounded" />
              <div className="w-6 h-6 bg-green-500 rounded-full" />
            </div>
            <div className="h-6 w-12 bg-green-700 rounded mb-1" />
            <div className="h-2 w-20 bg-green-400 rounded" />
          </motion.div>

          <motion.div 
            className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-4 rounded-xl border border-yellow-200"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="h-3 w-16 bg-yellow-600 rounded" />
              <div className="w-6 h-6 bg-yellow-500 rounded-full" />
            </div>
            <div className="h-6 w-12 bg-yellow-700 rounded mb-1" />
            <div className="h-2 w-20 bg-yellow-400 rounded" />
          </motion.div>

          <motion.div 
            className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl border border-purple-200"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="h-3 w-16 bg-purple-600 rounded" />
              <div className="w-6 h-6 bg-purple-500 rounded-full" />
            </div>
            <div className="h-6 w-12 bg-purple-700 rounded mb-1" />
            <div className="h-2 w-20 bg-purple-400 rounded" />
          </motion.div>
        </div>

        {/* Table/List */}
        <div className="bg-gray-50 rounded-xl p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="h-4 w-32 bg-gray-700 rounded" />
            <div className="flex gap-2">
              <div className="h-6 w-6 bg-gray-300 rounded" />
              <div className="h-6 w-6 bg-gray-300 rounded" />
            </div>
          </div>

          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <motion.div 
                key={i}
                className="bg-white p-4 rounded-lg flex items-center justify-between shadow-sm border border-gray-200"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 + i * 0.1 }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full" />
                  <div>
                    <div className="h-3 w-24 bg-gray-700 rounded mb-1" />
                    <div className="h-2 w-32 bg-gray-400 rounded" />
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="px-3 py-1 bg-green-100 rounded-full">
                    <div className="h-2 w-12 bg-green-600 rounded" />
                  </div>
                  <div className="h-8 px-4 bg-blue-600 rounded-lg flex items-center">
                    <div className="w-12 h-3 bg-white rounded" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
