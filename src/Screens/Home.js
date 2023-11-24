import React, { useState } from "react";
// import { IconBase } from "react-icons";
import StarRatings from "react-star-ratings";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { geocodeByAddress, getLatLng } from "react-google-places-autocomplete";
import { garagesMock } from "../mock/garagesMock";
import Garage from "../components/home/Garage";
import logo from "../Assets/Images/checkmech.png";
import verified from "../Assets/Images/verified.jpg";
import africanmech from "../Assets/Images/africanmech.jpg";
// import {SignOut} from './sign_out';

const BASE_URL = "http://127.0.0.1:8000";

const Home = () => {
  const [garages, setGarages] = useState([]);

  const getLatandLon = address => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(({ lat, lng }) => {
        console.log("Successfully got latitude and longitude", { lat, lng });
        getGarages({ lat, lng });
      });
  };

  const getGarages = ({ lat, lng }) => {
    fetch(`${BASE_URL}/garages/?latitude=${lat}&longitude=${lng}`)
      .then(response => response.json())
      .then(response => {
        response.forEach(g => g.is_verified);
        console.log(response);
        setGarages(response);
      })
      .catch(err => console.log(err));
  };

  return (
    <>
      {/* navbar */}
      {/* <nav className="p-5 bg-white shadow md:flex md:items-center md:justify-between">
                <div>
                    <span className="text-2xl font-[poppins]">
                        <img className="h-10 inline" src="https://mir-s3-cdn-cf.behance.net/projects/404/29a86280526481.Y3JvcCwxMTUxLDkwMSwxMjUsMA.jpg" />CheckMech
                    </span>

                </div>
                <ul className="md:flex md:items-center z-[-1] md:z-auto md:static absolute  w-full left-0 md:w-auto bg-green ">
                    <li className="mx-6 my-6 md:my-0">
                        <a href="#" className="text-x1  text-cyan-700 hover:text-yellow-400 duration-500">CheckMech</a>
                    </li>
                    <li className="mx-6 my-6 md:my-0">
                        <a href="#" className="text-x1 text-cyan-700 hover:text-yellow-400 duration-500">Garage details</a>
                    </li>
                    <li className="mx-6 my-6 md:my-0">
                        <a href="#" className="text-x1 text-cyan-700 hover:text-yellow-400 duration-500">About Us</a>
                    </li>
                    <button className="bg-cyan-700 text-white font-[poppins] duration-500 px-6 py-2 mx-4 rounded hover:text-cyan-700 hover:bg-yellow-400">Register Garage</button>
                    <button className="bg-cyan-700 text-white font-[poppins] duration-500 px-6 py-2 mx-4 rounded hover:text-cyan-700 hover:bg-yellow-400">Driver</button>

                </ul>

            </nav> */}

      <nav className="bg-white px-2 sm:px-4 py-2.5 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
        <div className="container flex flex-wrap items-center justify-between mx-auto">
          <a href="http://127.0.0.1:8000" className="flex items-center">
            <span className="text-2xl font-[poppins] text-cyan-700">
              <img className="h-11 inline" w="11px" h="11px" src={logo} alt="checkmech logo" />
              {/* CheckMech */}
            </span>
          </a>
          <div className="flex md:order-2">
          <a
              href="/sign-in"
              className="bg-cyan-700 text-white font-[poppins] duration-500 px-6 py-2 mx-4 rounded hover:text-cyan-700 hover:bg-yellow-400"
            >
              Sign In
            </a>
            {/* <a
              href="/register-garage"
              className="bg-cyan-700 text-white font-[poppins] duration-500 px-6 py-2 mx-4 rounded hover:text-cyan-700 hover:bg-yellow-400"
            >
              Register Garage
            </a> */}
            {/* <button className="bg-cyan-700 text-white font-[poppins] duration-500 px-6 py-2 mx-4 rounded hover:text-cyan-700 hover:bg-yellow-400">
              Get Service
            </button> */}
            {/* <button className="bg-cyan-700 text-white font-[poppins] duration-500 px-6 py-2 mx-4 rounded hover:text-cyan-700 hover:bg-yellow-400" onClick={SignOut}>
              Logout
            </button> */}
            <button
              data-collapse-toggle="navbar-sticky"
              type="button"
              className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-sticky"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
            <ul className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white ">
              {/* <li>
                <a
                  href="#"
                  className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
                  aria-current="page"
                >
                  CheckMech
                </a>
              </li> */}
              {/* <li>
                <a
                  href="#"
                  className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 "
                >
                  Garage Details
                </a>
              </li> */}
              {/* <li>
                <a
                  href="#"
                  className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 "
                >
                  About Us
                </a>
              </li> */}
            </ul>
          </div>
        </div>
      </nav>

      <div className="h-[50px] relative">
        <img className="w-full absolute mix-blend-overlay" src={africanmech} alt="a mechanic working on a car in a garage" />
        <div className="pt-28">
          <h1 className="text-white text-3xl md:text-6xl text-center  font-bold">Why Check Mech?</h1>
          <h2 className="text-white text-2xl md:text-4xl text-center  font-light-300 mt-5">Car trouble can happen anywhere, anytime!</h2>
          <h2 className="text-white text-2xl md:text-4xl text-center  font-light-300 mt-5">Lookup garages; get the service you need.</h2>
        </div>
        <br />
        <div className="flex justify-center gap-4 mb-8">
          <div className="flex justify-center">
            <div className="mb-3 xl:w-96">
              <div className=" input-group relative flex flex-wrap items-stretch w-full mb-4">
                {/* <input type="search" className=" form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" placeholder="Search" aria-label="Search" aria-describedby="button-addon2" /> */}

                {/* <GooglePlacesAutocomplete
                  apiKey="AIzaSyA36Zk210sTg92NDoR4Pa_s_6zD3NMpf1U"
                  selectProps={{
                    styles: {
                      input: provided => ({
                        ...provided,
                        width: "300px",
                      }),
                    },
                    onChange: value => {
                      console.log(value);
                      getLatandLon(value.value.description);
                    },
                    placeholder: "Search location...",
                  }}
                /> */}
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 flex grid md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-4 place-items-center">
          {garages.map((garage, index) => (
            <Garage key={`${index}`} garage={garage} />
          ))}
        </div>
        <br />
        <footer
          className="bg-cyan-700 h-12 fixed 
          bottom-1 p-4 inset-x-0"
        >
          {/* <h1 className="text-white text-center">CheckMech</h1> */}
          <div className="text-center text-white">© {new Date().getFullYear()} Copyright by Check Mech</div>
        </footer>
      </div>
    </>
  );
};

export default Home;
