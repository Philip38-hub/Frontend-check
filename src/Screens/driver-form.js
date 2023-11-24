import React,{useState} from "react";


function DriverForm(){    
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState(null);
    const [idNumber, setIdNumber] = useState(null);
    const [kraPin, setKraPin] = useState(null);
    const [gender, setGender] = useState(null);    
    const [licenceNumber, setlicenceNumber] = useState(null);

    const handleSubmit = async(e) =>{
        e.preventDefault();
        const userDetails =JSON.parse(localStorage.getItem('user'));
        console.log("Typeof: ", typeof(userDetails));
        console.log(userDetails)
        const user = {
                first_name: firstName,
                last_name: lastName,
                phone_number: phoneNumber,
                id_number: idNumber,
                kra_pin: kraPin,
                gender: gender,
                license_numberr: licenceNumber,
                user: userDetails.user.id,                  
        }
        console.log(user);
        
        const response = await fetch(
          "http://127.0.0.1:8000/drivers/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({               
                first_name: firstName,
                last_name: lastName,
                phone_number: phoneNumber,
                id_number: idNumber,
                kra_pin: kraPin,
                gender: gender,
                license_number: licenceNumber,
                user: parseInt(userDetails.user.id),            
            }),
          });
        const driver = await response.json()
        if (response.ok) {   
            console.log(driver);         
            window.location.replace("/sign-in");
           
        } 
    }
 return (
    <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
    <div className="container max-w-screen-lg mx-auto">
      <div>
        <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
          <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
            <div className="text-gray-600">
              <p className="font-medium text-lg">Driver Details</p>
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
                    placeholder="email@domain.com"
                    onChange={(e) => setLastName(e.target.value)}
                  required/>
                </div>

                <div className="md:col-span-5">
                  <label htmlFor="garage_name">Phone Number</label>
                  <input
                    type="text"
                    name=""
                    id="phoneNumber"
                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  required/>
                </div>
                <div className="md:col-span-5">
                  <label htmlFor="garage_name">ID Number</label>
                  <input
                    type="text"
                    name=""
                    id="IdNumber"
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
                  <label htmlFor="garage_name">Licence Number</label>
                  <input
                    type="text"
                    name=""
                    id="licenceNumber"
                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    onChange={(e) => setlicenceNumber(e.target.value)}
                  required/>
                </div>
                
                <div className="md:col-span-5 text-right">
                  <div className="inline-flex items-end">
                    <button
                      className="bg-cyan-700 text-white font-[poppins] duration-500 px-6 py-2 mx-4 rounded hover:text-cyan-700 hover:bg-yellow-400"
                      type="submit"
                    >
                      Sign Up
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

export default DriverForm;