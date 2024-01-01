import React, { useState } from "react";
// import { jwt_decode as jwtDecode } from 'jwt-decode';
// const { default: jwt_decode } = require("jwt-decode");
import {jwtDecode} from 'jwt-decode';

const baseUrl = 'http://192.168.7.152:8000'; //laptop ip address
const localhost = 'http://127.0.0.1:8000'; //local ip address

function SignIn() {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [showError, setShowError] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = {
            username: userName,
            password: password,
        }
        console.log(user);
        const response = await fetch(
            `${baseUrl}/api/auth/login/`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    username: userName,
                    password: password,
                }),
            }
        );

        const authenticationResponse = await response.json();

        if (response.ok) {
            const authToken = authenticationResponse.access; // Assuming the token is in the 'access' field
            localStorage.setItem('authToken', authToken);
            // Decode the token
            const decodedToken = jwtDecode(authToken);
            localStorage.setItem('userType', decodedToken.user_type);
            console.log(authToken)
            console.log(decodedToken)
            // Access the user type from the decoded token
            const userType = decodedToken.user_type;
            console.log('User type '+userType);
            // Redirect based on user type
            if (userType === 'Driver') {
                window.location.replace("/driver");
            } else if (userType === 'Garage Owner') {              
                window.location.replace("/garage-owner");
            }
        } else {
            // Handle authentication error, display error message, etc.
            console.error("Authentication failed");
            setShowError(true);
        }
    }

// function SignIn(){    
//     const [userName, setUserName] = useState(null);   
//     const [password, setPassword] = useState(null);

//     const handleSubmit = async(e) =>{
//     e.preventDefault();
//     const user = {
//         username: userName,
//         password: password,                    
//     }
//     console.log(user);
//     const response = await fetch(
//         "http://127.0.0.1:8000/api/auth/login/",
//         {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//             Accept: "application/json",
//         },
//         body: JSON.stringify({
//             username: userName,
//             password: password,            
//         }),
//         });
//     const registration_request = await response.json()
//     if (registration_request.status_code === 200 || 201) {
//       const authToken = response.token;
//       const decodedToken = jwt_decode(authToken);
//         console.log(decodedToken.user);
//         window.location.replace("/");
//     }
//     // window.location.replace("/");

    

 return (
    <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
    <div className="container max-w-screen-lg mx-auto">
      <div>
        <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
          <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
            <div className="text-gray-600">
              <p className="font-medium text-lg">Sign In</p>
              <hr />
            </div>

            <div className="lg:col-span-2">
              <form
                className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5"
                onSubmit={handleSubmit}
              >
                {showError === true ? (
                <>
                <div className="md:col-span-5">
                  <p className="error">Invalid username or password!</p>
                </div>
              </>
              ):(
                <></>
              )}
                <div className="md:col-span-5">
                  <label htmlFor="garage_name">Username</label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    
                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    onChange={(e) => setUserName(e.target.value)}
                  required/>
                </div>
                <div className="md:col-span-5">
                  <label htmlFor="text">Password</label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    placeholder=""
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,12}" 
									 title="One number, one uppercase, one lowercase letter, with 8 to 12 characters"
                    onChange={(e) => setPassword(e.target.value)}
                  required/>
                </div>
                <div className="md:col-span-5 text-right">
                  <div className="inline-flex items-end">
                    <button
                      className="bg-cyan-700 text-white font-[poppins] duration-500 px-6 py-2 mx-4 rounded hover:text-cyan-700 hover:bg-yellow-400"
                      type="submit"
                    >
                      Sign In
                    </button>
                  </div>
                </div>
                <div className="flex md:order-2">
                <a
                href="/sign-up"
                className="bg-cyan-700 text-white font-[poppins] duration-500 px-6 py-2 mx-4 rounded hover:text-cyan-700 hover:bg-yellow-400"
                >
                Don't have an account? Sign UP
                </a>
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

export default SignIn;