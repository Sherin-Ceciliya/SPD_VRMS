import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css';
import Signup from './Signup';
import Login from './Login';
import Home from './home';
import Booking from './Booking';
import Vehicle from './Vehicle';
import Staff from './Staff';
import Update from './Update';
import Display from './Display';
import Info from './Info';
import Add from './Add';
import Modify from './Modify';
import Summary from './Summary';
import Confirm from './Confirm';
import Success from './Success';
import Error from './Error';
import Dashboard from './Dashboard';
import Adddriver from './Adddriver';
import Removedriver from './Removedriver';
import DriverLogin from './DriverLogin';
import Viewreservations from './Viewreservations';
import Cancelreservation from './Cancelreservation';
import Allreservations from './Allreservations';
import Pay from './Pay';
import Damage from './Damage';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/signup' element={<Signup />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/home' element={<Home />}></Route>
        <Route path='/booking' element={<Booking />}></Route>
        <Route path='/vehicle' element={<Vehicle />}></Route>
        <Route path='/staff' element={<Staff />}></Route>
        <Route path='/update' element={<Update />}></Route>
        <Route path='/display' element={<Display />}></Route>
        <Route path='/info' element={<Info />}></Route>
        <Route path='/add' element={<Add />}></Route>
        <Route path='/modify' element={<Modify />}></Route>
        <Route path='/summary' element={<Summary />}></Route>
        <Route path='/confirm' element={<Confirm />}></Route>
        <Route path='/success' element={<Success />}></Route>
        <Route path='/error' element={<Error />}></Route>
        <Route path='/dashboard' element={<Dashboard />}></Route>
        <Route path='/adddriver' element={<Adddriver/>}></Route>
        <Route path='/removedriver' element={<Removedriver/>}></Route>
        <Route path='/DriverLogin' element={<DriverLogin/>}></Route>
        <Route path='/viewreservations' element={<Viewreservations/>}></Route>
        <Route path='/cancelreservation' element={<Cancelreservation/>}></Route>
        <Route path='/Allreservations' element={<Allreservations/>}></Route>
        <Route path='/damage' element={<Damage/>}></Route>
        <Route path='/pay' element={<Pay/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
