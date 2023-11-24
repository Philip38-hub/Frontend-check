import React, { useEffect, useState } from "react";
import logo from "../Assets/Images/checkmech.png";
// import {SignOut} from './sign_out';
import {jwtDecode} from 'jwt-decode';


const UserDetail = () => {

  const [user, setUser] = useState([]);
  const authToken = localStorage.getItem('authToken');
  const decodedToken = jwtDecode(authToken);
  let userType = decodedToken.user_type;


  useEffect(() => {
  const getUser = async(e) =>{
      // e.preventDefault();
      
      console.log(decodedToken);
      console.log('User: ' + decodedToken.user_type)
      console.log('User Type: ' + userType);
      let url ='';
      if(userType==='Driver'){
        const driverId = decodedToken.driver_id;
        url = `http://127.0.0.1:8000/drivers/${driverId}/`;
        console.log(url);
      }else if(userType === 'Garage Owner'){
        const ownerId = decodedToken.owner_id;
        console.log(ownerId);
        url = `http://127.0.0.1:8000/garage-owners/${ownerId}/`
        console.log(url);
      }
      const response = await fetch(
        url,
        {
          method: "GET",
          headers: {              
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
            Accept: "application/json",              
          },
        });
        console.log('Doneeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee')
      setUser(await response.json())
      if (response.ok) {
        console.log('User');
        console.log(user);         
        
      }
        
      } 
      
      getUser();
    }, [])

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
          {userType === 'Garage Owner' ? (
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
            <a
              href="/garage"
              className="bg-cyan-700 text-white font-[poppins] duration-500 px-6 py-2 mx-4 rounded hover:text-cyan-700 hover:bg-yellow-400"
            >
              View Garage
            </a>
            </>
          ): (
            <>

            </>
          )}
         
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
            <div className="lg:col-span-2">
                <ul>
                    <li>{user.first_name}</li>
                    <li>{user.last_name}</li>
                    <li>{user.phone_number}</li>
                    <li>{user.postal_address}</li>
                    <li>{user.town}</li>
                    <li>{user.country}</li>
                { userType === 'GarageOwner' ? (
                    <>
                    {/* Garage Owner */}
                    <li>{}</li>
                    </>
                ): (                    
                    <>
                    {/* Driver */}
                    <li>{user.license_number}</li>
                    </>
                )}
                </ul>
                
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

export default UserDetail;
