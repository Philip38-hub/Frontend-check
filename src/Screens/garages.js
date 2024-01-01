// import { setSelectionRange } from "@testing-library/user-event/dist/utils";
import React,{useState} from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { geocodeByAddress, getLatLng } from "react-google-places-autocomplete";


const baseUrl = 'http://192.168.7.152:8000'; //laptop ip address
const localhost = 'http://127.0.0.1:8000'; //local ip address

function Garages(){
    const [garages, setGarages] = useState([]);

    
    const getGarages = async(e) =>{
        e.preventDefault();
        const authToken = localStorage.getItem('authToken');
        if(!authToken){
          window.location.replace('/');
        }
        const userDetails =JSON.parse(localStorage.getItem('user'));
        console.log(userDetails);
        const user = userDetails.id;
        console.log(user);
        const response = await fetch(
          `${baseUrl}/garages/user=${userDetails.user.id}`,
          {
            method: "GET",
            headers: {              
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`,
              Accept: "application/json",              
            },
          });
        setGarages(await response.data())
        if (response.ok) {
          console.log(garages);         
          
        }
          // window.location.replace("/garage-owner-details");
        } 
        
        getGarages();
 return (
    <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
    <div className="container max-w-screen-lg mx-auto">
      <div>
        <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
          <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
            <div className="text-gray-600">
              <p className="font-medium text-lg">Register garage</p>
              <hr />
            </div>

            <div className="lg:col-span-2">
                <ol>
                {garages && garages.map((garage) => (
                          <li key={garage.id} value={garage.id} id={garage.id}>
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
    
 )
}



export default Garages;
