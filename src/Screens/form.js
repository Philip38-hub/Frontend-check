import React, {useState, useEffect} from 'react';
//import "./RequestService.css"


const baseUrl = 'http://192.168.1.102:8000';
const RequestService = () => {
    const [garage, setGarage] = useState({});
    const [driverName, setDriverName] = useState(null);
    const [email, setEmail] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState(null);

    useEffect(() => {
        getGarage()
    }, [])

    let garage_id = sessionStorage.getItem('garage_id')
    console.log(garage_id)

    const getGarage = async() => {
        let response = await fetch(`${baseUrl}/garages-list/${garage_id}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        })
        let data = await response.json()
        setGarage(data)
    }
    console.log("Garage: ", garage)

    const handleSubmit = async(e) => {
        e.preventDefault();
        const response = await fetch(
          `${baseUrl}/notifications/request-service/`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({
              destination_address: garage.phone_number,
              content: "string",
              driver_phone_number: phoneNumber,
              driver_name: driverName,
              garage_name: garage.name,
              driver_location: {
                "lat": 2.456,
                "longitude": 35.5678
              },
              notification_type: "sms",
            }),
          }
        );
        const service_request = await response.json()
        if (service_request.status_code === 200 || 201) {
          alert(
            "You Service Request Has Been Successfully Submitted!!\n Welcome The Garage Will Contact You Shortly"
          );
          window.location.replace("/");
        } 
    }

    return (
      <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
        <div className="container max-w-screen-lg mx-auto">
          <div>
            <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
              <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                <div className="text-gray-600">
                  <p className="font-medium text-lg">Request Service</p>
                  <hr />
                  <p>
                    Please note that the information you fill here will be used
                    by the garage to contact you!
                  </p>
                  <br />
                  <hr />
                  <h4 className="font-medium text-lg">Garage Detail</h4>
                  <hr />
                  <h4 className="font-medium text-lg">Name: {garage.name}</h4>
                  <h4 className="font-medium text-lg">
                    Phone: {garage.phone_number}
                  </h4>
                  <h4 className="font-medium text-lg">
                    Location: {garage.town}, {garage.country}
                  </h4>
                </div>

                <div className="lg:col-span-2">
                  <form
                    className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5"
                    onSubmit={handleSubmit}
                  >
                    <div className="md:col-span-5">
                      <label htmlFor="full_name">Full Name</label>
                      <input
                        type="text"
                        name="full_name"
                        id="full_name"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        onChange={(e) => setDriverName(e.target.value)}
                      />
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
                      />
                    </div>

                    <div className="md:col-span-5">
                      <label htmlFor="text">Phone Number</label>
                      <input
                        type="text"
                        name="phone_number"
                        id="phone_number"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        placeholder="254745XXXXXXXX"
                        onChange={(e) => setPhoneNumber(e.target.value)}
                      />
                    </div>

                    <div className="md:col-span-5">
                      <label htmlFor="text">Service Needed</label>
                      <input
                        type="text"
                        name="service_requested"
                        id="service_requested"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        placeholder="Wheel Change"
                      />
                    </div>

                    <div className="md:col-span-3">
                      <label htmlFor="address">Address / Street</label>
                      <input
                        type="text"
                        name="address"
                        id="address"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        placeholder=""
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label htmlFor="city">City</label>
                      <input
                        type="text"
                        name="city"
                        id="city"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        placeholder=""
                      />
                    </div>

                                                 
                    <div className="md:col-span-5 text-right">
                      <div className="inline-flex items-end">
                        <button
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
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
    );
}

export default RequestService