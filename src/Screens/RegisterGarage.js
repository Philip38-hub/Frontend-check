// import { setSelectionRange } from "@testing-library/user-event/dist/utils";
import { jwtDecode } from "jwt-decode";
import React,{useState} from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { geocodeByAddress, getLatLng } from "react-google-places-autocomplete";

const baseUrl = 'http://192.168.1.102:8000';
function RegisterGarage(){
    
    const [name, setName] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState(null);
    const [location, setLocation] = useState({})
    const [city, setCity] = useState(null)
    const [street, setStreet] = useState(null);

    const getLatandLon = (address) => {
        geocodeByAddress(address)
          .then((results) => getLatLng(results[0]))
          .then(({ lat, lng }) => {
            console.log("Successfully got latitude and longitude", { lat, lng });
            setLocation({"latitude": lat, "longitude": lng})
            // getGarages({ lat, lng });
          });
      };


    const handleSubmit = async(e) =>{
        e.preventDefault();
        const authToken = localStorage.getItem('authToken');
        // const userDetails =JSON.parse(localStorage.getItem('user'));
        const decodedAuthToken = jwtDecode(authToken);
        // console.log(userDetails);
        console.log('userrrrrrrrrrrrrrrrrrrrrr', decodedAuthToken.id);
        // const user = userDetails.user.id;
        // console.log(user);
        const garage = {
            name: name,
            phoneNumber: phoneNumber,
            location: location,
            city: city,
            user: decodedAuthToken.id, 
        }
        console.log(garage);
        const response = await fetch(
          `${baseUrl}/garages/`,
          {
            method: "POST",
            headers: {              
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`,
              Accept: "application/json",
              
            },
            body: JSON.stringify({
              name: name,
              town: city,
              postal_address: street,
              country: "Kenya",
              phone_number: phoneNumber,
              user: decodedAuthToken.id, 
            }),
          });
        const registration_request = await response.json()
        if (response.ok) {
          console.log(registration_request);         
          window.location.replace("/garage-owner");
        }
          // window.location.replace("/garage-owner-details");
        } 
        

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
              <form
                className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5"
                onSubmit={handleSubmit}
              >
                <div className="md:col-span-5">
                  <label htmlFor="garage_name">Garage Name</label>
                  <input
                    type="text"
                    name="garage_name"
                    id="garage_name"
                    maxLength="70"
                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    onChange={(e) => setName(e.target.value)}
                  required/>
                </div>

                {/* <div className="md:col-span-5">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="text"
                    name="email"
                    id="email"
                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    placeholder="email@domain.com"
                    onChange={(e) => setEmail(e.target.value)}
                  required/>
                </div> */}

                <div className="md:col-span-5">
                  <label htmlFor="text">Phone Number</label>
                  <input
                    type="text"
                    name="phone_number"
                    id="phone_number"
                    pattern="^(07)[0-9]*"
                    minLength="10"
                    maxLength="10"
                    title="Must be numbers, no more than 10"
                    placeholder="07xxxxxxxx"
                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                   
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  required/>
                </div>

                <div className="md:col-span-5">
                  <label htmlFor="text">Street</label>
                  <input
                    type="text"
                    name="street"
                    id="street"
                    maxLength="50"
                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    placeholder="Kawangware"
                    onChange={(e) => setStreet(e.target.value)}
                  required/>
                </div>


                {/* <div className="md:col-span-3">
                  <label htmlFor="address">Address / Street</label>
                  <GooglePlacesAutocomplete
                    apiKey="AIzaSyA36Zk210sTg92NDoR4Pa_s_6zD3NMpf1U"
                    selectProps={{
                      styles: {
                        input: (provided) => ({
                          ...provided,
                          width: "300px",
                        }),
                      },
                      onChange: (value) => {
                        console.log(value);
                        getLatandLon(value.value.description);
                      },
                      placeholder: "Search location...",
                    }}
                  required/>
                </div> */}

                <div className="md:col-span-2">
                  <label htmlFor="city">City</label>
                  <input
                    type="text"
                    name="town"
                    id="city"
                    maxLength="50"
                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    placeholder="Nairobi"
                    onChange={(e) => setCity(e.target.value)}
                  required/>
                </div>

                <div className="md:col-span-5">
                      <label htmlFor="Choose photo">Upload garage logo</label>
                      <input
                        type="file"
                        name="Choose photo"
                        id="Choose photo"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      />
                    </div>

                <div className="md:col-span-5 text-right">
                  <div className="inline-flex items-end">
                    <button
                      className="bg-cyan-700 text-white font-[poppins] duration-500 px-6 py-2 mx-4 rounded hover:text-cyan-700 hover:bg-yellow-400"
                      type="submit"
                    >
                      Submit
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
    
 )
}



export default RegisterGarage;
