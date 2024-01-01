import React, { useState, useEffect } from "react";
import logo from "../Assets/Images/checkmech.png";
import { jwtDecode } from "jwt-decode";
import Navbar from "../components/home/NavBar";
// import {SignOut} from './sign_out';


const baseUrl = 'http://192.168.7.152:8000'; //laptop ip address
const localhost = 'http://127.0.0.1:8000'; //local ip address


const GarageOwner = () => {
 
  const [garages, setGarages] = useState([]);
  
  useEffect(()=> {
    const authToken = localStorage.getItem('authToken');
    if(!authToken){
      window.location.replace('/');
    }
    const decodedAuthToken = jwtDecode(authToken);
    
  
  if(decodedAuthToken.user_type !== 'Garage Owner'){
    window.location.replace('/sign-in');
  }
  const getGarages = async(e) =>{
      // e.preventDefault();
     
      console.log(jwtDecode(authToken));
      const response = await fetch(
        `${baseUrl}/garages/`,
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
    const garageId = e.target.id;
    console.log(garageId);
    localStorage.setItem('garageId', garageId);
    window.location.replace('/service-detail');
  } 

  return (
    <>
      <Navbar />
       <div className="min-h-screen p-6 bg-gra-100 flex items-center justify-center">
    <div className="container max-w-screen-lg mx">
      <div>
        <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
          <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3 overflow-x:hidden">
           

            <div className="relative lg:col-span-2 overflow-x-auto ">
                <table class="w-full table-auto text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" class="px-6 py-3">Garage Name</th>
                      <th scope="col" class="px-6 py-3">Contact</th>
                      <th scope="col" class="px-6 py-3">Street</th>
                      <th scope="col" class="px-6 py-3">Town</th>
                      <th scope="col" class="px-6 py-3 sr-only" >View Services</th>
                    </tr>
                  </thead>
                  <tbody>
                {garages && garages.map((garage) => (
                    <>
                     
                        <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                          <td class="px-6 py-4"  key={garage.id} id={garage.id + 'name'}>
                             {garage.name}
                          </td>
                          <td  class="px-6 py-4" key={garage.id} id={garage.id + 'contact'}>
                             {garage.phone_number}
                          </td>
                          <td class="px-6 py-4"  key={garage.id} id={garage.id + 'street'}>
                             {garage.postal_address}
                          </td>
                          <td class="px-6 py-4"  key={garage.id} id={garage.id + 'town'}>
                             {garage.town}
                          </td>
                          <td class="px-6 py-4 text-blue-600" value={garage.id} key={garage.id} id={garage.id} onClick={handleGarageClick}>
                              View Services
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

export default GarageOwner;
