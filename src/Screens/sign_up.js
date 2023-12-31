import React,{useState} from "react";
import { json } from "react-router-dom";

const baseUrl = 'http://192.168.7.152:8000'; //laptop ip address
const localhost = 'http://127.0.0.1:8000'; //local ip address

function SignUp(){    
    const [userName, setUserName] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [password2, setPassword2] = useState(null);
    const [accountType, setAccountType] = useState('garageOwner');
   const [showError, setShowError] = useState(false);
   const [passwordMatch, setPasswordMatch] = useState(true);

    

    const handleSubmit = async(e) =>{
        e.preventDefault();
        const user = {
            username: userName,
                email: email,
                password: password,
                password2: password2,                        
        }
        console.log(user);
        if(password === password2){
          const response = await fetch(
            `${baseUrl}/api/auth/register/`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
              },
              body: JSON.stringify({
                  username: userName,
                  email: email,
                  password: password,
                  password2: password2
              
              }),
            });
            const userDetails = await response.json()
            // console.log(response)
            if (response.ok) {
              console.log('okayyyyyyyyyyyyyyyyy')
              console.log(userDetails)
              console.log('AccountType: '+ accountType);
              localStorage.setItem('user', JSON.stringify(userDetails));
              if(accountType === 'garageOwner'){
                window.location.replace("/garage-owner-details");
              }else{
                window.location.replace("/driver-details");
              }
              
              // console.log(user);
            }else{
              console.log('Errrorrrrrrrr');
              setShowError(true);
            }
        }else{
          console.log('no match')
          setPasswordMatch(false);
        }       
        } 
        

 return (
    <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
    <div className="container max-w-screen-lg mx-auto">
      <div>
        <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
          <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
            <div className="text-gray-600">
              <p className="font-medium text-lg">Register Account</p>
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
                  <p className="error">Username  or email already used!</p>
                </div>
              </>
              ):(
                <></>
              )
              }
              {passwordMatch === false ? (
                <>
                <div className="md:col-span-5">
                  <p className="error">Passwords do not match!</p>
                </div>
              </>
              ):(
                <></>
              )
              }
             
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
                  <label htmlFor="text">Password</label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,12}" 
									 title="One number, one uppercase, one lowercase letter, with 8 to 12 characters"
                    onChange={(e) => setPassword(e.target.value)}
                  required/>
                </div>
                <div className="md:col-span-5">
                  <label htmlFor="text">Repeat Password</label>
                  <input
                    type="password"
                    name="password2"
                    id="password2"
                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    placeholder=""
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,12}" 
									 title="One number, one uppercase, one lowercase letter, with 8 to 12 characters"
                    onChange={(e) => setPassword2(e.target.value)}
                  required/>
                </div>
                <div className="md:col-span-5">
                  <label htmlFor="text">Account Type</label>
                  <select  onChange={(e) => setAccountType(e.target.value)} required>
                  {/* <option value="" disabled>Select User Type</option> */}
                  <option value="garageOwner">Garage Owner</option>
                  <option value="driver">Driver</option>                 
                  
                </select>
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

export default SignUp;