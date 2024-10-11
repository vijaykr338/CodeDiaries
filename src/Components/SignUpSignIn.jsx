import React from 'react'

function SignUpSignIn() {
  return (
    <div className="grid grid-cols-2 p-8 bg-gray-100 min-h-screen">
      <div className="bg-white p-6 shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300">
        <h2 className="text-2xl font-bold text-blue-600 mb-4">Column 1</h2>
        <p className="text-gray-700">
          This is the content for the first column. You can add more detailed information here to make it look interesting.
        </p>
        <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300">
          Learn More
        </button>
      </div>
      <div className="bg-white p-6 shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300">
        <h2 className="text-2xl font-bold text-green-600 mb-4">Column 2</h2>
        <p className="text-gray-700">
          This is the content for the second column. Add some more descriptive text and actions for better engagement.
        </p>
        <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors duration-300">
          Learn More
        </button>
      </div>
    </div>
  )
}

export default SignUpSignIn