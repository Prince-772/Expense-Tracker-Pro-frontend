import React from 'react'

const AddingSoon = () => {
  return (
    <div className="flex items-center justify-center h-[calc(100vh-56px)] md:h-[calc(100vh-64px)] dark:bg-gray-800">
      <div className="bg-white dark:bg-gray-900 shadow-lg rounded-lg p-8 border border-gray-300 mt-10">
        <span className="animate-bounce text-3xl md:text-4xl font-semibold text-blue-600 inline-block">
          🚧 Adding Soon!
        </span>
      </div>
    </div>
  )
}

export default AddingSoon
