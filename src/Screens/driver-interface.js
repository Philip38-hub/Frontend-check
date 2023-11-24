import React, { useState, useEffect } from "react";
import Garage from "../components/home/Garage";
import logo from "../Assets/Images/checkmech.png";
import { useLocation } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
// import {SignOut} from './sign_out';



const Driver = () => {
  // console.log("Today is Monday")
  // const location = useLocation()

  const [selectedService, setSelectedService] = useState(null);
  const [town, setTown] = useState(null);
  const [street, setStreet] = useState(null);
  const [lat, setLat] = useState(2.456);
  const [longi, setLongi] = useState(35.5678);
  const [services, setServices] = useState([]);
  const [garages, setGarages] = useState([]);
  const [selectedGarage, setSelectedGarage] = useState(null);

  const authToken = localStorage.getItem('authToken')
  const decodedAuthToken = jwtDecode(authToken);

  const handleServiceChange = (event) => {
    setSelectedService(event.target.value);
  };

  const handleGarageHover = (e) =>{
    setSelectedGarage(e.target.value);
  }

  function handleMouseOut(e){
    setSelectedGarage(null);
  }
  useEffect(() => {   
    const getServices = async() => {
      let response = await fetch(`http://127.0.0.1:8000/services-list/`, {
          method: 'GET',
          headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`,
              "Accept": "application/json"
          }
      })
      setServices(await response.json())
    console.log("Services: ", services)
     
  }
    getServices();
   
  }, [])

 
  const handleSubmit = async(e) => {
      e.preventDefault();
      const response = await fetch(
        // `http://127.0.0.1:8000/garages-list/${selectedService}/${town}/${street}/`,
        `http://127.0.0.1:8000/garages-list/?service=${selectedService}&town=${town}&postal_address=${street}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
            Accept: "application/json",
          }
        }
      );
     
      setGarages(await response.json())
      console.log('Garagesssssssssssss');
      console.log(garages);
      if(response.ok){
        console.log('Garages');
        console.log(garages);
        // window.location.replace("/garage-list");
      }
      
  }
  return (
    <>
      <nav className="bg-white px-2 sm:px-4 py-2.5 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
        <div className="container flex flex-wrap items-center justify-between mx-auto">
          <a href="http://127.0.0.1:8000" className="flex items-center">
            <span className="text-2xl font-[poppins] text-cyan-700">
              <img className="h-11 inline" w="11px" h="11px" src={logo} alt="checkmech logo" />
            </span>
          </a>
          <div className="flex md:order-2">
            {/* <a
              href="/garages"
              className="bg-cyan-700 text-white font-[poppins] duration-500 px-6 py-2 mx-4 rounded hover:text-cyan-700 hover:bg-yellow-400"
            >
              Get  Garage
            </a> */}
            {/* <a
              href="/request-service"
              className="bg-cyan-700 text-white font-[poppins] duration-500 px-6 py-2 mx-4 rounded hover:text-cyan-700 hover:bg-yellow-400"
            >
              Get  Service
            </a> */}
            <a
              href="/user-detail"
              className="bg-cyan-700 text-white font-[poppins] duration-500 px-6 py-2 mx-4 rounded hover:text-cyan-700 hover:bg-yellow-400"
            >
              View Profile
            </a>
            {/* <a
              href="/sign-out"
              className="bg-cyan-700 text-white font-[poppins] duration-500 px-6 py-2 mx-4 rounded hover:text-cyan-700 hover:bg-yellow-400"
            >
              Sign Out
            </a> */}
           
          </div>
        </div>
      </nav>
      <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
        <div className="container max-w-screen-lg mx-auto">
          <div>
            <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
              <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                <div className="text-gray-600">
                  <p className="font-medium text-lg">Request Service</p>
                  <hr />
                  <p>
                    Please note that the information you fill here will be used
                    by the garage to contact you!
                  </p>
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
                      <label htmlFor="service">Select a service:</label>
                      <select value={selectedService} onChange={handleServiceChange} id="service">
                        <option value="">Select a service</option>
                        {services && services.map((service) => (
                          <option key={service.id} value={service.id}>
                            {service.name}
                          </option>
                        ))}
                      </select>
                      {/* <input
                        type="text"
                        name="service_requested"
                        id="service_requested"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        placeholder="Wheel Change"
                        onChange={(e) => setService(e.target.value)}
                      /> */}
                    </div>

                    <div className="md:col-span-3">
                      <label htmlFor="address">Address / Street</label>
                      <input
                        type="text"
                        name="address"
                        id="address"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        placeholder="Kawangware"
                        onChange={(e) => setStreet(e.target.value)}
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label htmlFor="city">City</label>
                      <input
                        type="text"
                        name="city"
                        id="city"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        placeholder="Nairobi"
                        onChange={(e) => setTown(e.target.value)}
                      />
                    </div>

                    <div className="md:col-span-5 text-right">
                      <div className="inline-flex items-end">
                        <button
                          className="bg-cyan-700 text-white font-[poppins] duration-500 px-6 py-2 mx-4 rounded hover:text-cyan-700 hover:bg-yellow-400"
                          type="submit"
                        >
                          Get Service
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
                <div className="lg:col-span-2">
                  <ol>
                  {garages && garages.map((garage) => (
                      <>
                          <li key={garage.id} value={garage.id} id={garage.id} onMouseOver={handleGarageHover} onMouseOut={handleMouseOut}>
                            {garage.name}
                          </li>
                          <ul>
                          {selectedGarage === garage.id ? (
                            <>
                            {/* Garage details */}
                              <li>{garage.phone_number}</li>
                            </>
                          ) : (
                            <>

                            </>
                          )

                          }
                          </ul>
                      </>))}
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

export default Driver;
