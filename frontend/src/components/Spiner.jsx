import React from 'react'

const Spiner = () => {
  return (
    <div className="fixed inset-0   flex items-center justify-center z-50">
        <div className="bg-white p-8 rounded-lg shadow-2xl flex flex-col items-center gap-4">
            <div className="border w-16 h-16 rounded-full border-6 border-gray-200 border-t-primary animate-spin"></div>
        </div>
    </div>
  )
}

export default Spiner
