import React, {useState} from 'react';
import logo from '/public/images/ELEZA.png';
import { Link } from "react-router-dom";

const Navbar = () => {

  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu((prevShowMenu) => !prevShowMenu);
  };

  return (
    <nav className="bg-maroon p-4">
      <div className="container mx-auto flex justify-between items-center bg-[whitesmoke]">
        <div>
          <img src={logo} alt="Logo" className="w-[80px] h-30" />
        </div>
        <h1>Eleza :<small>speak out!</small></h1>
        <div className="md:hidden">
          <button
            className="text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
            onClick={toggleMenu}
          >
            Menu
          </button>
        </div>
        <ul className={`md:flex ${showMenu ? 'block' : 'hidden'} flex justify-between items-center`}>
          <li className="px-4 py-2">
            <Link to="/contact">Contact</Link>
          </li>
          <li className="px-4 py-2">
            <Link to="/about">About</Link>
          </li>
          <li  className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded">
            <Link to="/">Log out</Link>
          </li>
        </ul>
        
      </div>
    </nav>
  );
};

export default Navbar;
