import React, { useState, useEffect } from "react";
import Garage from "../components/home/Garage";
import logo from "../Assets/Images/checkmech.png";
import { jwtDecode } from "jwt-decode";
import Navbar from "../components/home/NavBar";
// import {SignOut} from './sign_out';


const baseUrl = 'http://192.168.1.102:8000';

const AddService = () => {
  const [services, setServices] = useState([]);
  const [garages, setGarages] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedGarage, setSelectedGarage] = useState(null);

  const handleServiceChange = (event) => {
    setSelectedService(event.target.value);
  };
  const handleGarageChange = (event) => {
    setSelectedGarage(event.target.value);
  };
  const authToken = localStorage.getItem('authToken')
  
 
  useEffect(() => {
    const getGarages = async() => {
        let response = await fetch(`${baseUrl}/garages/`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${authToken}`,
                "Accept": "application/json"
            }
        })
        setGarages(await response.json())
        console.log("Services: ", services)
       
    }

  const getServices = async() => {
      let response = await fetch(`${baseUrl}/services-list/`, {
          method: 'GET',
          headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`,
              "Accept": "application/json"
          }
      })
      setServices(await response.json())
    // console.log("Services: ", services)
     
  }

  getGarages();
  getServices();
 
}, [])
  const handleSubmit = async(e) => {
      e.preventDefault();
      const response = await fetch(
        `${baseUrl}/garages/${selectedGarage}/`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
            Accept: "application/json",
          },
          body: JSON.stringify({
            service_id: selectedService
          })
        }
      );
     if(response.ok){
        localStorage.setItem('garageId', selectedGarage);
        window.location.replace("/garage-owner");
     }
      
  }
  return (
    <>
      {/* <nav className="bg-white px-2 sm:px-4 py-2.5 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
        <div className="container flex flex-wrap items-center justify-between mx-auto">
          <a href="/garage-owner" className="flex items-center">
            <span className="text-2xl font-[poppins] text-cyan-700">
              <img className="h-11 inline" w="11px" h="11px" src={logo} alt="checkmech logo" />
            </span>
          </a>
          <div className="md:hidden">
            <button
              className="text-gray-600 focus:outline-none focus:text-gray-800"
              onClick={handleMenuToggle}
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"></path>
              </svg>
            </button>
          </div>
          <div className="flex md:order-2">
            <a
              href="/add-service"
              className="bg-cyan-700 text-white font-[poppins] duration-500 px-6 py-2 mx-4 rounded hover:text-cyan-700 hover:bg-yellow-400"
            >
              Add  Service
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
      </nav> */}
      <Navbar />
      <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
        <div className="container max-w-screen-lg mx-auto">
          <div>
            <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
              <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                <div className="text-gray-600">
                  <p className="font-medium text-lg">Add Service</p>
                  <hr />
                 <p>Add another service to your garage</p>
                  <br />
                  <hr />
                  {/* <h4 className="font-medium text-lg">Garage Detail</h4> */}
                  <hr />
                  {/* <h4 className="font-medium text-lg">Name: {garage?.name}</h4> */}
                  <h4 className="font-medium text-lg">
                    {/* Phone: {garage.phone_number} */}
                  </h4>
                  <h4 className="font-medium text-lg">
                    {/* Location: {garage.town}, {garage.country} */}
                  </h4>
                </div>

                <div className="lg:col-span-2">
                  <form
                    className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5"
                    onSubmit={handleSubmit}
                  >
                   <div className="md:col-span-5">
                      {/* <label htmlFor="text">Service Needed</label> */}
                      <label htmlFor="garage">Choose a Garage:</label>
                      <select value={selectedGarage} onChange={handleGarageChange} id="garage" >
                        <option value="">Select a Garage</option>
                        {garages && garages.map((garage) => (
                          <option key={garage.id} value={garage.id}>
                            {garage.name}
                          </option>
                        ))}
                      </select>
                    </div>      
                    <div className="md:col-span-5">
                      {/* <label htmlFor="text">Service Needed</label> */}
                      <label htmlFor="service">Select a service:</label>
                      <select value={selectedService} onChange={handleServiceChange} id="service">
                        <option value="">Select a service</option>
                        {services && services.map((service) => (
                          <option key={service.id} value={service.id}>
                            {service.name}
                          </option>
                        ))}
                      </select>
                    </div>                   

                    <div className="md:col-span-5 text-right">
                      <div className="inline-flex items-end">
                        <button
                          className="bg-cyan-700 text-white font-[poppins] duration-500 px-6 py-2 mx-4 rounded hover:text-cyan-700 hover:bg-yellow-400"
                          type="submit"
                        >
                          Add Service
                        </button>
                      </div>
                    </div>
                  </form>
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

export default AddService;
