import React, { useEffect, useState } from "react";
import logo from "../Assets/Images/checkmech.png";
import { jwtDecode } from "jwt-decode";

const baseUrl = 'http://192.168.1.102:8000';



  

const ServiceDetail = () => {

  const [garage, setGarage] = useState([]);
  const [services, setServices] = useState([]);
  const [hoverdService, setHoverdService] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const authToken = localStorage.getItem('authToken');
  const decodedToken = jwtDecode(authToken);
  let userType = decodedToken.user_type;

  
  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  function handleServiceHover(e){
    setHoverdService(e.target.value);
    console.log('Value: ' + e.target.value);
  }

  function handleMouseOut(e){
    setHoverdService(null);
  }

  useEffect(() => {
      const garageId = localStorage.getItem('garageId');
      const getGarage = async(e) =>{
      // e.preventDefault();
     
      const response = await fetch(
        `${baseUrl}/${garageId}`,
        {
          method: "GET",
          headers: {              
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
            Accept: "application/json",              
          },
        });
      setGarage(await response.json())
      if (response.ok) {
        console.log('Garages');
        console.log(garage);         
        
      }
        // window.location.replace("/garage-owner-details");
      } 
      
      getGarage();
      const getServices = async(e) =>{
        const response = await fetch(
          `${baseUrl}/garages/${garageId}/services/`,
          {
            method: "GET",
            headers: {              
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`,
              Accept: "application/json",              
            },
          });
        setServices(await response.json())
        if (response.ok) {
          console.log('Garages');
          console.log(garage);         
          
        }
          
      }
      getServices();          
      console.log('Services: ')
      console.log(services);
    }, [])

  return (
    <>
      {/* <nav className="bg-white px-2 sm:px-4 py-2.5 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
        <div className="container flex flex-wrap items-center justify-between mx-auto">
        {userType === 'Garage Owner' ? (
          <>
          <a href="/garage-owner" className="flex items-center">
            <span className="text-2xl font-[poppins] text-cyan-700">
              <img className="h-11 inline" w="11px" h="11px" src={logo} alt="checkmech logo" />
              {/* CheckMech 
            </span>
          </a>
          </>
        ):(
          <>
          <a href="/driver" className="flex items-center">
            <span className="text-2xl font-[poppins] text-cyan-700">
              <img className="h-11 inline" w="11px" h="11px" src={logo} alt="checkmech logo" />
              {/* CheckMech 
            </span>
          </a>
          </>
        )}
          <div className="flex md:order-2">
          {/* {userType === 'Garage Owner' ? (
            <>
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
            </>
          ): (
            <>

            </>
          )} *
         
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

<nav class="border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
  <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
  {userType === 'Garage Owner' ? (
    <>
    <a href="/garage-owner" class="flex items-center space-x-3 rtl:space-x-reverse">
     <img className="h-11 inline" w="11px" h="11px" src={logo} alt="checkmech logo" />
        <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">CheckMech</span>
    </a>
    </>
  ):(
    <>
    <a href="/driver" class="flex items-center space-x-3 rtl:space-x-reverse">
     <img className="h-11 inline" w="11px" h="11px" src={logo} alt="checkmech logo" />
        <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">CheckMech</span>
    </a>
    </>
  )}
    
    <button  data-collapse-toggle="navbar-hamburger" type="button" class=" inline-flex items-center justify-center p-2 w-10 h-10 text-sm text-gray-500
     rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      aria-controls="navbar-hamburger" aria-expanded="false" onClick={handleMenuToggle}>
      <span class="sr-only">Open main menu</span>
      <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
      </svg>
    </button>
    <div className={`  md:order-2 ${isMenuOpen ? 'block' : 'hidden'}`} id="navbar-hamburger">
      <ul class="flex flex-col font-medium mt-4 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
        <li>
          <a href="/user-detail" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Profile</a>
        </li>
        <li>
          <a href="/sign-out" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white">Sign Out</a>
       
        </li>
      </ul>
    </div>
  </div>
</nav>
      <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
    <div className="container max-w-screen-lg mx-auto">
      <div>
        <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
          <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
            <div className="relative lg:col-span-2 overflow-x-auto">                   
                    <table class="w-full  text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                      <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                          <tr>
                            <th scope="col" class="px-6 py-3" colSpan={1}>Service Name</th>
                            <th scope="col" class="px-6 py-3" colSpan={3} >Description</th>
                            <th scope="col" class="px-6 py-3" colSpan={1}>Price</th>
                            <th scope="col" class="px-6 py-3" colSpan={1}>Pricing Type</th>
                          </tr>
                      </thead>
                      <tbody>
                        
                        {services && services.map((service) => (
                        <>
                        <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                          <td class="px-0 py-0"colSpan={1}  value={service.id} key={service.id} >{service.name}</td>
                          <td class="px-1 py-1" colSpan={3}  value={service.id} key={service.id} >{service.description}</td>
                          <td class="px-1 py-1" colSpan={1} value={service.id} key={service.id} >{service.cost}</td>
                          <td class="px-1 py-1"  colSpan={1} value={service.id} key={service.id} >{service.pricing_type}</td>
                       </tr>
                      </>))}
                      
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

export default ServiceDetail;
