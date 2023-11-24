import React, { useState, useEffect } from "react";
import logo from "../Assets/Images/checkmech.png";
import { jwtDecode } from "jwt-decode";
// import {SignOut} from './sign_out';

const GarageOwner = () => {

  const [garages, setGarages] = useState([]);
  
  useEffect(()=> {
  const getGarages = async(e) =>{
      // e.preventDefault();
      const authToken = localStorage.getItem('authToken');
      console.log(jwtDecode(authToken));
      const response = await fetch(
        `http://127.0.0.1:8000/garages/`,
        {
          method: "GET",
          headers: {              
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
            Accept: "application/json",              
          },
        });
      setGarages(await response.json())
      if (response.ok) {
        console.log('Garages');
        console.log(garages);         
        
      }
        // window.location.replace("/garage-owner-details");
      }
    getGarages();
  }, [])

  function handleGarageClick(e){
    e.preventDefault()
    const garageId = e.target.value;
    console.log(garageId);
    localStorage.setItem('garageId', garageId);
    window.location.replace('/garage-detail');
  } 

  return (
    <>
      <nav className="bg-white px-2 sm:px-4 py-2.5 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
        <div className="container flex flex-wrap items-center justify-between mx-auto">
          <a href="http://127.0.0.1:8000" className="flex items-center">
            <span className="text-2xl font-[poppins] text-cyan-700">
              <img className="h-11 inline" w="11px" h="11px" src={logo} alt="checkmech logo" />
              {/* CheckMech */}
            </span>
          </a>
          <div className="flex md:order-2">
          <a
              href="/register-garage"
              className="bg-cyan-700 text-white font-[poppins] duration-500 px-6 py-2 mx-4 rounded hover:text-cyan-700 hover:bg-yellow-400"
            >
              Add Garage
            </a>
            <a
              href="/add-service"
              className="bg-cyan-700 text-white font-[poppins] duration-500 px-6 py-2 mx-4 rounded hover:text-cyan-700 hover:bg-yellow-400"
            >
              Add Service
            </a>
            <a
              href="/user-detail"
              className="bg-cyan-700 text-white font-[poppins] duration-500 px-6 py-2 mx-4 rounded hover:text-cyan-700 hover:bg-yellow-400"
            >
              View Profile
            </a>
            <a
              href="/sign-out"
              className="bg-cyan-700 text-white font-[poppins] duration-500 px-6 py-2 mx-4 rounded hover:text-cyan-700 hover:bg-yellow-400"
            >
              Sign Out
            </a>
           
          </div>
        </div>
      </nav>
      <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
    <div className="container max-w-screen-lg mx-auto">
      <div>
        <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
          <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
            {/* <div className="text-gray-600">
              <p className="font-medium text-lg">Register garage</p>
              <hr />
            </div> */}

            <div className="lg:col-span-2">
                <ol>
                {garages && garages.map((garage) => (
                          <li  value={garage.id} key={garage.id} id={garage.id} onClick={handleGarageClick}>
                             {garage.name}
                          </li>
                        ))}
                </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
     
    <footer className="bg-cyan-700 h-12 fixed bottom-1 p-4 inset-x-0">
        <div className="text-center text-white">© {new Date().getFullYear()} Copyright by Check Mech</div>
    </footer>
     
    </>
  );
};

export default GarageOwner;
