import React, { useState } from "react";

const Landing = (props) => {
  const [isAdmin, setIsAdmin] = useState(false);

  const handleSelectRole = (isAdminSelected) => {
    setIsAdmin(isAdminSelected);
  };

  return (
    <div className="max-w-md mx-auto">
      <img
        src="/images/ELEZA.png"
        alt="User Role"
        className=" mx-auto mb-4  object-cover"
      />
      <h1 className="text-2xl font-bold mb-4 mx-auto text-center">Choose Your Role</h1>
      <div className="flex items-center justify-center">
        <button
          className={`${
            isAdmin ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-700"
          } font-bold py-2 px-4 rounded-l focus:outline-none focus:shadow-outline`}
          type="button"
          onClick={() => handleSelectRole(true)}
        >
          Admin
        </button>
        <button
          className={`${
            isAdmin ? "bg-gray-300 text-gray-700" : "bg-blue-500 text-white"
          } font-bold py-2 px-4 rounded-r focus:outline-none focus:shadow-outline`}
          type="button"
          onClick={() => handleSelectRole(false)}
        >
          Citizen
        </button>
      </div>
      <div className="flex items-center justify-center mt-4">
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
          onClick={() => props.handleSubmit(isAdmin)}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default Landing;
