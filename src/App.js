import './App.css';
import Home from './Screens/Home';
// import Garage from './components/Garage';
import SignIn from './Screens/sign_in';
// import SignOut from './Screens/sign_out';
import SignUp from './Screens/sign_up';
import GarageOwner from './Screens/garage-owner-form';
import Driver from './Screens/driver-form';
import RegisterGarage from './Screens/RegisterGarage';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import RequestService from './Screens/RequestService';
import StarRating from './Screens/ReviewForm';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path='/sign-in' element={<SignIn/>}/>
        {/* <Route path='/sign-out' element={<SignOut/>}/> */}
        <Route path='/sign-up' element={<SignUp/>} />
        <Route path='/garage-owner-details' element={<GarageOwner/>} />
        <Route path='/driver-details' element={<Driver/>} />
        <Route path="/register-garage" element={<RegisterGarage />}/>        
        <Route path="/request-service" element={<RequestService />}/>
        <Route path="/review" element={<StarRating />}/>
      </Routes>
    </BrowserRouter>
    
 
  );
}

export default App;
