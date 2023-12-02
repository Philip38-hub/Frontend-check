import React, { useState } from 'react';
import { useLocation } from "react-router-dom";

const baseUrl = 'http://192.168.1.102:8000';
const StarRating = () => {

  const location = useLocation();
  
  
  const [rating, setRating] = useState(null);
  const [customerName, setCustomerName] = useState(null);
  const [customerEmail, setCustomerEmail] = useState(null);
  const [garage, setGarage] = useState(location.state);
  const [review, setReview] = useState(null);


  console.log("Garage Object: ", garage);

  const handleReviewSubmit = async (e) => {
      e.preventDefault();

      const reviewObject = {
          "rate": rating,
          "customer": {
              "name": customerName,
              "email": customerEmail
          },
          "review": review,
          "garage": garage.id
      }
      console.log("New Review: ", reviewObject);
      await fetch(`${baseUrl}/ratings/`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(reviewObject)
      })
      .then((res) => res.json())
      .then((res) => {
          console.log("Result: ", res)
          window.location.replace("/");
      })
      .catch((err) => {
          console.log("Error: ", err)
      })


      console.log("Review Object: ", reviewObject)
      
  }

return (
//     <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
//     <div className="container max-w-screen-lg mx-auto">
//       <div>
//         <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
//           <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
//             <div className="text-gray-600">
//               <h2 className="font-medium text-lg">Review Garage</h2>
//               <hr />
//             </div>

//   <div class="lg:col-span-2" > 
//       <form className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5"
//        onSubmit={handleReviewSubmit}>
//           {/* <h3>Submit Garage Review</h3> */}
//           <br />
//           <div className="md:col-span-5">
//             <label>Customer Name</label>
//           <input type="text" name="customerName" id="customerName" 
//            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
//           onChange={(e) => setCustomerName(e.target.value)}/>
//           </div><br/>
        
//           <div className="md:col-span-5">
//           <label>Customer Email</label>
//           <input type="email" name="customerEmail" id="customerEmail" 
//            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
//           onChange={(e) => setCustomerEmail(e.target.value)}/>
//           </div><br/>

//           <div className="md:col-span-5">
//           <label>Rating (1-5) </label>
//           <input type="number" name="rating" id="rating" min={1} max={5}
//            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
//           onChange={(e) => setRating(e.target.value)}/>
//           </div><br/>

//           <div className="md:col-span-5">
//           <label>Review</label>
//           <input type="textarea" name="customerName" id="review"  
//           className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
//           onChange={(e) => setReview(e.target.value)}/>
//           </div><br/>
//           <button
//                     className="bg-cyan-700 text-white font-[poppins] duration-500 px-6 py-2 mx-4 rounded"
//                     type="submit"
//                     >Submit
//             </button>  
//  </form>
//   </div>
//   </div>
//   </div>
//   </div>
//   </div>

  <>
         <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
            <div className="container max-w-screen-lg mx-auto">
            <div>
                <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                    <div className="text-gray-600">
                    <p className="font-medium text-lg">Garage Review</p>
                    <hr />
                    </div>

                    <div className="lg:col-span-2">
                    <form onSubmit={handleReviewSubmit}>
                        <h3 className='font-medium text-lg mb-5'>Submit Garage Review</h3>
                        <hr />
                        <label>Customer Name</label>
                        <input 
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        type="text" name="customerName" id="customerName" onChange={(e) => setCustomerName(e.target.value)}/>
                        <br/>
                        <label>Customer Email</label>
                        <input 
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        type="email" name="customerEmail" id="customerEmail" onChange={(e) => setCustomerEmail(e.target.value)}/>
                        <br/>
                        <label>Rating (1-5)</label>
                        <br/>
                        <input type="number" name="rating" id="rating"  max={5} min={1}
                        className="h-10 border mt-1 rounded px-4 w-[40%] bg-gray-50" 
                        onChange={(e) => setRating(e.target.value)}/>
                        <br/>
                        <label>Review</label>
                        <input 
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" 
                        type="textarea" name="customerName" id="review" onChange={(e) => setReview(e.target.value)}/>
                        <br/>
                        <input type="submit" 
                        className="bg-cyan-700 mt-4 text-white cursor-pointer font-[poppins] duration-500 px-6 py-2 rounded hover:text-cyan-700 hover:bg-yellow-400" onClick={() => alert("Your review has been submitted.")}
                        />
                    </form>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
     
      
  </>
// * =======
//   <div>
//       <form onSubmit={handleReviewSubmit}>
        
//           <h1>Submit Garage Review</h1>
//           <hr />
//           <label>Customer Name</label>
//           <input type="text" name="customerName" id="customerName" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" onChange={(e) => setCustomerName(e.target.value)}/>
//           <br/>
//           <label>Customer Email</label>
//           <input type="email" name="customerEmail" id="customerEmail" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" onChange={(e) => setCustomerEmail(e.target.value)}/>
//           <br/>
//           <label>Rating (1-5)</label>
//           <input type="number" name="rating" id="rating" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"onChange={(e) => setRating(e.target.value)}/>
//           <br/>
//           <label>Review</label>
//           <input type="textarea" name="customerName" id="review" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" onChange={(e) => setReview(e.target.value)}/>
//           <br/>
//           <br/>
//           <input type="submit" className="bg-cyan-700 text-white font-[poppins] duration-500 px-6 py-2 mx-4 rounded hover:text-cyan-700 hover:bg-yellow-400" onClick={() => alert("Your review has been submitted.")}/>
//           {/* <input type="button" value="Submit" onClick={() => alert("Your review has been submitted.")} /> */}
//       </form>

//   </div> */}

)
}
export default StarRating;
