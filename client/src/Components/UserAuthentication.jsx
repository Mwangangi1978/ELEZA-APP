import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

const UserAuthentication = (props) => {
  const counties = [
    "Baringo", "Bomet", "Bungoma", "Busia", "Elgeyo/Marakwet", "Embu", "Garissa",
    "Homa Bay", "Isiolo", "Kajiado", "Kakamega", "Kericho", "Kiambu", "Kilifi",
    "Kirinyaga", "Kisii", "Kisumu", "Kitui", "Kwale", "Laikipia", "Lamu",
    "Machakos", "Makueni", "Mandera", "Marsabit", "Meru", "Migori", "Mombasa",
    "Murang'a", "Nairobi City", "Nakuru", "Nandi", "Narok", "Nyamira", "Nyandarua",
    "Nyeri", "Samburu", "Siaya", "Taita/Taveta", "Tana River", "Tharaka-Nithi",
    "Trans Nzoia", "Turkana", "Uasin Gishu", "Vihiga", "Wajir", "West Pokot"
  ]

  const [number, setNumber] = useState('');
  const [county, setCounty] = useState(''); // Added the state variable for county selection
  const [password, setPassword] = useState('');
  const [isSigningIn, setIsSigningIn] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isSigningIn) {
        // Signing in
        const { data } = await axios.post('http://localhost:8080/login', {
          username: county, // Updated the username field to "county"
          password: password
        });
        toast.success(`Signed in successfully! ${data.username}`);
      } else {
        // Creating account if the user doesn't have an account.
        const { data } = await axios.post('http://localhost:8080/signup', {
          username: number,
          password: password
        });
        toast.success(`Account created successfully!`);
      }
      props.setHasSubmittedForm(true);
    } catch (error) {
      console.log('Error:', error.response);
      const errorMessage = error.response && error.response.data && error.response.data.Error
        ? error.response.data.Error
        : 'An error occurred';
      toast.error(errorMessage);
    }
  };

  const handleChooseMode = (isSigningIn) => {
    setIsSigningIn(isSigningIn);
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">{isSigningIn ? 'Sign In' : 'Create an Account'}</h1>
      <form onSubmit={handleSubmit}>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="number">
            ID Number:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="number"
            type="number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            required
          />
        </div>
        
        {!isSigningIn &&(
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="county">
              County Of Residence:
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="county"
              value={county}
              onChange={(e) => setCounty(e.target.value)}
              required
            >
              <option value="" disabled>Select your county</option>
              {counties.map((county) => (
                <option key={county} value={county}>{county}</option>
              ))}
            </select>
          </div>
        )}
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
        <div className="mt-4 text-center">
          <button
            className="text-red-500 hover:underline focus:outline-none"
            type="button"
            onClick={() => handleChooseMode(true)}
          >
            Sign In
          </button>
          <span className="mx-2">or</span>
          <button
            className="text-red-500 hover:underline focus:outline-none"
            type="button"
            onClick={() => handleChooseMode(false)}
          >
            Create an Account
          </button>
        </div>
        <div className="flex items-center justify-center">
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            {isSigningIn ? 'Sign In' : 'Create Account'}
          </button>
        </div>
      </form>
      <div className="max-w-md mx-auto">
        <ToastContainer />
      </div>
    </div>
  );
};

export default UserAuthentication;