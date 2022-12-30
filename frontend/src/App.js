import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home';
import Navigation from './components/shared/Navigation/Navigation';
import Authenticate from './pages/Authenticate/Authenticate';
import GuestRoutes from './pages/GuestRoute/GuestRoutes';
import SemiAuthenticate from './pages/SemiAuthenticate/SemiAuthenticate';
import Activate from './pages/Activate/Activate';
// import Register from './pages/Register/Register';
// import Login from './pages/Login/Login';


function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>


        {/* <Route path="/register" exact element={<Register/>} />
        <Route path="/
        login" exact element={<Login/>} /> */}


        <Route element={<GuestRoutes />}>
          <Route element={<Authenticate />} path="/authenticate" />
          <Route path="/" exact element={<Home />} />
        </Route>

        <Route element={SemiAuthenticate}>
          <Route element={<Activate />} path="/activate" />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}



export default App;
