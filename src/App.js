import './App.css';
import Home from './Screens/Home';
// import Garage from './components/Garage';
import SignIn from './Screens/sign_in';
// import SignOut from './Screens/sign_out';
import SignUp from './Screens/sign_up';
import GarageOwnerForm from './Screens/garage-owner-form';
import DriverForm from './Screens/driver-form';
import RegisterGarage from './Screens/RegisterGarage';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import RequestService from './Screens/RequestService';
import StarRating from './Screens/ReviewForm';
import GarageOwner  from './Screens/garage-owner-interface';
import Garage from './Screens/garage-details';
import Driver from './Screens/driver-interface';
import GarageDetail from './Screens/garage-details';
import UserDetail from './Screens/view-profile';
import AddService from './Screens/add-service';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path='/sign-in' element={<SignIn/>}/>
        {/* <Route path='/sign-out' element={<SignOut/>}/> */}
        <Route path='/sign-up' element={<SignUp/>} />
        <Route path='/garage-owner-details' element={<GarageOwnerForm/>} />
        <Route path='/driver-details' element={<DriverForm/>} />
        <Route path="/register-garage" element={<RegisterGarage />}/>        
        <Route path="/request-service" element={<RequestService />}/>
        <Route path="/review" element={<StarRating />}/>
        <Route path='/garage-owner' element={<GarageOwner />}/>
        <Route path='/garage' element={<Garage />}/>
        <Route path='/driver' element={<Driver />}/>
        <Route path='/garage-detail' element={<GarageDetail />}/>
        <Route path='/user-detail' element={<UserDetail />}/>
        <Route path='/add-service' element={<AddService />} />
      </Routes>
    </BrowserRouter>   
 
  );
}

export default App;
