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

function App() {
  return (
    <div className="max-w-7xl mx-auto px-8">
      <Navbar></Navbar>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/appointment' element={<RequireAuth><Appointment></Appointment></RequireAuth>}></Route> 
        <Route path='/login' element={<Login></Login>}></Route> 
        <Route path='/signup' element={<SignUp></SignUp>}></Route> 
        <Route path='/about' element={<About></About>}></Route>
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
