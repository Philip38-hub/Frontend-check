import React, { useState, useEffect } from "react";
import Garage from "../components/home/Garage";
import logo from "../Assets/Images/checkmech.png";
import { useLocation } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
// import {SignOut} from './sign_out';


const baseUrl = 'http://192.168.7.152:8000'; //laptop ip address
const localhost = 'http://127.0.0.1:8000'; //local ip address

const Driver = () => {
  // console.log("Today is Monday")
  // const location = useLocation()
  
  const authToken = localStorage.getItem('authToken')
  if(!authToken){
    window.location.replace('/');
  }
  const decodedAuthToken = jwtDecode(authToken);

  
  if(decodedAuthToken.user_type !== 'Driver'){
    window.location.replace('/sign-in');
  }

  const [selectedService, setSelectedService] = useState(null);
  const [town, setTown] = useState(null);
  const [street, setStreet] = useState(null);
  const [lat, setLat] = useState(2.456);
  const [longi, setLongi] = useState(35.5678);
  const [services, setServices] = useState([]);
  const [garages, setGarages] = useState([]);
  const [selectedGarage, setSelectedGarage] = useState(null);
  const [showHeader, setShowHeader] = useState(false);


  const handleServiceChange = (event) => {
    setSelectedService(event.target.value);
  };
  function handleGarageClick(e){
    e.preventDefault()
    // setShowHeader(true);
    const garageId = e.target.id;
    console.log(garageId);
    localStorage.setItem('garageId', garageId);
    window.location.replace('/service-detail');
   
  } 
  useEffect(() => {   
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
     
    console.log("Services: ", services)
     
  }
    getServices();
   
  }, [])

 
  const handleSubmit = async(e) => {
      e.preventDefault();
      setGarages([]);
      const response = await fetch(
        // `http://127.0.0.1:8000/garages-list/${selectedService}/${town}/${street}/`,
        `${baseUrl}/garages-list/?service=${selectedService}&town=${town}&postal_address=${street}`,
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
      setShowHeader(true);
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
          <a href="/driver" className="flex items-center">
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
                        maxLength="70"
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
                        maxLength="70"
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
                <div className="relative lg:col-span-2 overflow-x-auto">
                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                {showHeader ? (
                <>
                  <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" class="px-6 py-3">Garage Name</th>
                      <th scope="col" class="px-6 py-3">Contact</th>
                      <th scope="col" class="px-6 py-3">Street</th>
                      <th scope="col" class="px-6 py-3">Town</th>
                      <th scope="col" class="px-6 py-3 sr-only">More Services</th>
                    </tr>
                  </thead>
                  </>
                ): (
                  <></>
                )
                }
                <tbody>
                {garages && garages.map((garage) => (
                  
                    <>                   
                        <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                          <td  class="px-6 py-4" key={garage.id} id={garage.id + 'name'}>
                             {garage.name}
                          </td>
                          <td class="px-6 py-4"  key={garage.id} id={garage.id + 'contact'}>
                             {garage.phone_number}
                          </td>
                          <td class="px-6 py-4" key={garage.id} id={garage.id + 'street'}>
                             {garage.postal_address}
                          </td>
                          <td class="px-6 py-4" key={garage.id} id={garage.id + 'town'}>
                             {garage.town}
                          </td>
                          <td class="px-6 py-4 text-blue-600" value={garage.id} key={garage.id} id={garage.id} onClick={handleGarageClick}>
                              More Services
                          </td>
                        </tr>
                         
                      </> ))}
                    </tbody>
                </table>
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
