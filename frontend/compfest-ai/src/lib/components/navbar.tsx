import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between p-4 bg-gray-800 text-white flex-row">
      <div className="text-lg font-bold">Freaky Nus</div>
      <div className="flex space-x-4">
        <a href="#" className="hover:underline">Home</a>
        <a href="#" className="hover:underline">About</a>
        <a href="#" className="hover:underline">Etc</a>
      </div>
    </nav>
  )
}

export default Navbar