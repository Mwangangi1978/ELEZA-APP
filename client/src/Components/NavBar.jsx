import React, {useState} from 'react';
import logo from '/images/ELEZA.png';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const Navbar = ({ logoutCallback }) => {

  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu((prevShowMenu) => !prevShowMenu);
  };
  const handleLogout = () => {
    // Call the logout callback function when the "Log out" link is clicked
    logoutCallback();
  };

  return (
    <nav className="bg-maroon p-4">
      <div className="container mx-auto flex justify-between items-center bg-[whitesmoke]">
        <div>
          <img src={logo} alt="Logo" className="w-[80px] h-30" />
        </div>
        <h1 className='text-black'>Eleza :<small>speak out!</small></h1>
        <div className="md:hidden items-center">
          <button
            className="text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md"
            onClick={toggleMenu}
          >
            <FontAwesomeIcon icon={faBars} size="lg" />
          </button>
        </div>
        {/* Regular menu for large screens */}
        <ul className="hidden md:flex md:items-center md:justify-between md:w-auto text-[red]">
          <li className="px-4 py-2">
            <Link to="/contact">Contact</Link>
          </li>
          <li className="px-4 py-2">
            <Link to="/about">About</Link>
          </li>
          <li className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-white" onClick={handleLogout}>
            <Link to="/">Log out</Link>
          </li>
        </ul>
        {/* Expanded menu for small screens */}
        {showMenu && (
          <ul className="flex flex-col md:hidden w-full p-4 absolute top-16 left-0 bg-maroon">
            <li className="px-4 py-2">
              <Link to="/contact">Contact</Link>
            </li>
            <li className="px-4 py-2">
              <Link to="/about">About</Link>
            </li>
            <li className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded" onClick={handleLogout}>
              <Link to="/">Log out</Link>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
