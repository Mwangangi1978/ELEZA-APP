import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

const Settings = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }} className="dark:bg-gray-800  dark:text-white">
      <h1 className='text-2xl font-bold mb-4 mx-auto text-center'>Set desired theme:</h1>
      <div className={`app ${darkMode ? 'dark' : 'light'}`}>
        <button
          onClick={toggleTheme}
          className={`px-4 py-2 rounded ${
            darkMode ? 'bg-white text-black' : 'bg-black text-white'
          }`}
        >
          {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        </button>
      </div>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  return useContext(ThemeContext);
};

export default Settings;