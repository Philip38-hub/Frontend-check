import { setSelectionRange } from "@testing-library/user-event/dist/utils";
import React,{useState, useEffect} from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { geocodeByAddress, getLatLng } from "react-google-places-autocomplete";

function RegisterGarage(){
    
    const [name, setName] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState(null);
    const [phoneNumber2, setPhoneNumber2] = useState(null);
    const [location, setLocation] = useState({});
    const [email, setEmail] = useState(null);
    const [city, setCity] = useState(null)

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
        const garage = {
            name: name,
            phoneNumber: phoneNumber,
            phoneNumber2: phoneNumber2,
            location: location,
            city: city,
            email: email
        }
        console.log(garage);
        const response = await fetch(
          "http://127.0.0.1:8000/garages/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({
              name: name,
              town: city,
              country: "Kenya",
            }),
          });
        const registration_request = await response.json()
        if (registration_request.status_code === 200 || 201) {
          // alert(
          //   "Your garage's registration details have been successfully submitted.\n Thank you."
          // );
          console.log(garage);
    }
          window.location.replace("/");
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
                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    onChange={(e) => setName(e.target.value)}
                  required/>
                </div>

                <div className="md:col-span-5">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="text"
                    name="email"
                    id="email"
                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    placeholder="email@domain.com"
                    onChange={(e) => setEmail(e.target.value)}
                  required/>
                </div>

                <div className="md:col-span-5">
                  <label htmlFor="text">Phone Number</label>
                  <input
                    type="text"
                    name="phone_number"
                    id="phone_number"
                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    placeholder="2547XXXXXXXX"
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  required/>
                </div>

                <div className="md:col-span-5">
                  <label htmlFor="text">Alternate Phone Number</label>
                  <input
                    type="text"
                    name="phone_number"
                    id="phone_number"
                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    placeholder="2547XXXXXXXX"
                    onChange={(e) => setPhoneNumber2(e.target.value)}
                  required/>
                </div>


                <div className="md:col-span-3">
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
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="city">City</label>
                  <input
                    type="text"
                    name="phone_number"
                    id="phone_number"
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
