import React from 'react';
import logo from '../images/ELEZA.png';

const Navbar = () => {
  return (
    <nav className="bg-maroon p-4">
      <div className="container mx-auto flex justify-between items-center bg-[whitesmoke]">
        <div>
          <img src={logo} alt="Logo" className="w-[80px] h-30" /> {/* Adjust width and height as needed */}
        </div>
        <div>
          <a href="/" className="text-black mx-4">Home</a>
          <a href="/about" className="text-black mx-4">About</a>
          <a href="/contact" className="text-black mx-4">Contact</a>
          <button className="text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded">Logout</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
