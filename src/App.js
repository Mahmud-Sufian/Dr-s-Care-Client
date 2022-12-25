import { Route, Routes } from 'react-router-dom';
import './App.css'; 
import About from './pages/About/About';
import Appointment from './pages/Appointment/Appointment';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import RequireAuth from './pages/Login/RequireAuth';
import SignUp from './pages/Login/SignUp';
import Navbar from './pages/Shared/Navbar';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Dashboard from './pages/Dashboard/Dashboard';
import MyReview from './pages/Dashboard/MyReview';
import MyAppointment from './pages/Dashboard/MyAppointment';
import Users from './pages/Dashboard/Users';
import RequireAdmin from './pages/Login/requireAdmin';
import AddDoctor from './pages/Dashboard/AddDoctor';
import Managedoctors from './pages/Dashboard/Managedoctors';
import Payment from './pages/Dashboard/Payment';

function App() {
  return (
    <div className="max-w-7xl mx-auto px-8">
      <Navbar></Navbar>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/appointment' element={<RequireAuth><Appointment></Appointment></RequireAuth>}></Route> 
        <Route path='/dashboard' element={<RequireAuth><Dashboard></Dashboard></RequireAuth>}>
          <Route index element={<MyAppointment></MyAppointment>}></Route>
          <Route path='review' element={<MyReview></MyReview>}></Route>
          <Route path='payment/:id' element={<Payment></Payment>}></Route>
          <Route path='users' element={<RequireAdmin><Users></Users></RequireAdmin>}></Route>
          <Route path='addDoctor' element={<RequireAdmin><AddDoctor></AddDoctor></RequireAdmin>}></Route>
          <Route path='manageDoctor' element={<RequireAdmin><Managedoctors></Managedoctors></RequireAdmin>}></Route> 
        </Route> 

        <Route path='/login' element={<Login></Login>}></Route> 
        <Route path='/signup' element={<SignUp></SignUp>}></Route> 
        <Route path='/about' element={<About></About>}></Route>
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
