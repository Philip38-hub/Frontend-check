import React,{useEffect, useState} from "react";


const baseUrl = 'http://192.168.1.102:8000';

function GarageOwnerForm(){    
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState(null);
    const [idNumber, setIdNumber] = useState(null);
    const [kraPin, setKraPin] = useState(null);
    const [gender, setGender] = useState(null);    
    const [town, setTown] = useState(null);
    const [postalCode, setPostalCode] = useState(null);

    const handleSubmit = async(e) =>{
        e.preventDefault();
        const userDetails =JSON.parse(localStorage.getItem('user'));
        console.log("Typeof: ", typeof(userDetails));
        console.log(userDetails)
        const user = {
                user: parseInt(userDetails.user.id), 
                first_name: firstName,
                last_name: lastName,
                phone_number: phoneNumber,
                id_number: idNumber,
                kra_pin: kraPin,
                gender: gender                        
        }
        console.log(user);
        const response = await fetch(
          `${baseUrl}/garage-owners/`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({
                user: parseInt(userDetails.user.id),   
                first_name: firstName,
                last_name: lastName,
                phone_number: phoneNumber,
                id_number: idNumber,
                kra_pin: kraPin,
                postal_code: postalCode,
                town: town,
                // gender: gender,
                country: 'Kenya'
                // gender: gender   
            
            }),
          });
        const garageOwner = await response.json()
        if (response.ok) {   
            console.log(garageOwner);         
            window.location.replace("/sign-in");
           
        }else{

        } 
    }
 return (
    <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
    <div className="container max-w-screen-lg mx-auto">
      <div>
        <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
          <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
            <div className="text-gray-600">
              <p className="font-medium text-lg">Garage Owner</p>
              <hr />
            </div>

            <div className="lg:col-span-2">
              <form
                className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5"
                onSubmit={handleSubmit}
              >
                <div className="md:col-span-5">
                  <label htmlFor="garage_name">First Name</label>
                  <input
                    type="text"
                    name="first_name"
                    id="firstName"
                    maxLength="50"
                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    onChange={(e) => setFirstName(e.target.value)}
                  required/>
                </div>

                <div className="md:col-span-5">
                  <label htmlFor="email">Last Name</label>
                  <input
                    type="text"
                    name=""
                    id="lastName"
                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    maxLength="50"
                    placeholder="last name"
                    onChange={(e) => setLastName(e.target.value)}
                  required/>
                </div>

                <div className="md:col-span-5">
                  <label htmlFor="garage_name">Phone Number</label>
                  <input
                    type="text"
                    name=""
                    id="phoneNumber"
                   
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
                  <label htmlFor="garage_name">ID Number</label>
                  <input
                    type="text"
                    name=""
                    id="idNumber"
                   
                    pattern="[0-9]*"
                    maxLength="8"
                    title="Must be numbers, no more than 8"
                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    onChange={(e) => setIdNumber(e.target.value)}
                  required/>
                </div>
                <div className="md:col-span-5">
                  <label htmlFor="garage_name">KRA PIN</label>
                  <input
                    type="text"
                    name=""
                    id="kraPin"
                   
                    pattern="[A-Z][0-9]{9}[A-Z]{1}"
                    maxLength="11"
                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    onChange={(e) => setKraPin(e.target.value)}
                  required/>
                </div>
                <div className="md:col-span-5">
                  <label htmlFor="text">Gender</label>
                  <select  onChange={(e) => setGender(e.target.value)} required>
                  {/* <option value="" disabled>Gender</option> */}
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>                 
                  
                </select>
                </div>
                <div className="md:col-span-5">
                  <label htmlFor="garage_name">Postal Code</label>
                  <input
                    type="text"
                    name=""
                    id="postal"
                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    onChange={(e) => setPostalCode(e.target.value)}
                  required/>
                </div>
                <div className="md:col-span-5">
                  <label htmlFor="garage_name">Town</label>
                  <input
                    type="text"
                    name=""
                    id="town"
                    pattern="[a-zA-Z][a-zA-Z\s\.]*" 
                    maxLength="50"
                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    onChange={(e) => setTown(e.target.value)}
                  required/>
                </div>
                
                <div className="md:col-span-5 text-right">
                  <div className="inline-flex items-end">
                    <button
                      className="bg-cyan-700 text-white font-[poppins] duration-500 px-6 py-2 mx-4 rounded hover:text-cyan-700 hover:bg-yellow-400"
                      type="submit"
                    >
                      Add Details
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

export default GarageOwnerForm;