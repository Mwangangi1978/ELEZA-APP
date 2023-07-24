import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

const AdminAuthentication = (props) => {
    const counties = [
        "Baringo", "Bomet", "Bungoma", "Busia", "Elgeyo/Marakwet", "Embu", "Garissa",
        "Homa Bay", "Isiolo", "Kajiado", "Kakamega", "Kericho", "Kiambu", "Kilifi",
        "Kirinyaga", "Kisii", "Kisumu", "Kitui", "Kwale", "Laikipia", "Lamu",
        "Machakos", "Makueni", "Mandera", "Marsabit", "Meru", "Migori", "Mombasa",
        "Murang'a", "Nairobi City", "Nakuru", "Nandi", "Narok", "Nyamira", "Nyandarua",
        "Nyeri", "Samburu", "Siaya", "Taita/Taveta", "Tana River", "Tharaka-Nithi",
        "Trans Nzoia", "Turkana", "Uasin Gishu", "Vihiga", "Wajir", "West Pokot"
      ];

  const [selectedCounty, setSelectedCounty] = useState(''); // Changed the state variable name to "selectedCounty"
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('http://localhost:8080/login', {
        username: selectedCounty, // Updated the username field to "selectedCounty"
        password: password
      });
      toast.success(`Signed in successfully! Welcome, ${data.username}`);
      props.setHasSubmittedForm(true);
    } catch (error) {
      console.log('Error:', error.response);
      const errorMessage = error.response && error.response.data && error.response.data.Error
        ? error.response.data.Error
        : 'An error occurred';
      toast.error(errorMessage);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Sign In</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="county">
            County:
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="county"
            value={selectedCounty}
            onChange={(e) => setSelectedCounty(e.target.value)} // Updated the onChange function to use setSelectedCounty
            required
          >
            <option value="" disabled>Select your county</option>
            {counties.map((county) => (
              <option key={county} value={county}>{county}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="flex items-center justify-center">
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign In
          </button>
        </div>
      </form>
      <div className="max-w-md mx-auto">
        <ToastContainer />
      </div>
    </div>
  );
};

export default AdminAuthentication;
