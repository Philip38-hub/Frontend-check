import React, { useEffect, useState } from "react";
import logo from "../Assets/Images/checkmech.png";
// import {SignOut} from './sign_out';
import {jwtDecode} from 'jwt-decode';

const baseUrl = 'http://192.168.1.102:8000';

const UserDetail = () => {

  const [user, setUser] = useState([]);
  const authToken = localStorage.getItem('authToken');
  const decodedToken = jwtDecode(authToken);
  let userType = decodedToken.user_type;
  console.log('Type: ' + userType);

  useEffect(() => {
  const getUser = async(e) =>{
      // e.preventDefault();
      
      console.log(decodedToken);
      console.log('User: ' + decodedToken.user_type)
      console.log('User Type: ' + userType);
      let url ='';
      if(userType==='Driver'){
        const driverId = decodedToken.driver_id;
        url = `${baseUrl}/drivers/${driverId}/`;
        console.log(url);
      }else if(userType === 'Garage Owner'){
        const ownerId = decodedToken.owner_id;
        console.log(ownerId);
        url = `${baseUrl}/garage-owners/${ownerId}/`
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
          {userType === 'Garage Owner' ? (
            <>
            <a href="/garage-owner" className="flex items-center">
            <span className="text-2xl font-[poppins] text-cyan-700">
              <img className="h-11 inline" w="11px" h="11px" src={logo} alt="checkmech logo" />
              {/* CheckMech */}
            </span>
          </a>
            </>
          ):(
            <>
            <a href="/driver" className="flex items-center">
            <span className="text-2xl font-[poppins] text-cyan-700">
              <img className="h-11 inline" w="11px" h="11px" src={logo} alt="checkmech logo" />
              {/* CheckMech */}
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
          )} */}
         
            {/* <a
              href="/user-detail"
              className="bg-cyan-700 text-white font-[poppins] duration-500 px-6 py-2 mx-4 rounded hover:text-cyan-700 hover:bg-yellow-400"
            >
              View Profile
            </a> */}
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
            <div className="relative lg:col-span-2 overflow-x-auto">
                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" class="px-6 py-3">First Name</th>
                      <th scope="col" class="px-6 py-3">Last Name</th>
                      <th scope="col" class="px-6 py-3">Phone Number</th>
                      <th scope="col" class="px-6 py-3">Postal Address</th>
                      <th scope="col" class="px-6 py-3">Town</th>                     
                      <th scope="col" class="px-6 py-3">Country</th>
                     
                      { userType === 'Garage Owner' ? (
                          <>                         
                            {/* Garage Owner header*/}
                            <th scope="col" class="px-6 py-3"></th>
                          </>
                      ): (                    
                          <>
                            {/* Driver header*/}
                            <th scope="col" class="px-6 py-3">License Number</th>
                          </>
                        
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    <tr  class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                          <td class="px-6 py-4">{user.first_name}</td>
                          <td class="px-6 py-4">{user.last_name}</td>
                          <td class="px-6 py-4">{user.phone_number}</td>
                          <td class="px-6 py-4">{user.postal_code}</td>
                          <td class="px-6 py-4">{user.town}</td>
                          <td class="px-6 py-4">{user.country}</td>
                      { userType === 'Garage Owner' ? (
                          <>                         
                            {/* Garage Owner */}
                            <td class="px-6 py-4">{}</td>
                          </>
                      ): (                    
                          <>
                            {/* Driver */}
                            <td class="px-6 py-4">{user.license_number}</td>
                          </>
                        
                      )}
                    </tr>
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

export default UserDetail;
