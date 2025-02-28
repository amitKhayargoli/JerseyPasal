import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Signup from './public/Signup'
import Login from './public/Login'
import Landingpage from './public/Landingpage'
import AdminDashboard from './private/AdminDashboard'
import CustomerDashboard from './private/CustomerDashboard'
// import PrivateRoute from "./PrivateRoute";

function App() {

  return (
    <Router>
    <Routes>
    <Route index element={<Landingpage/>} />
      <Route path="/Signup" element={<Signup/>}/>
      <Route path="/Login" element={<Login/>}/>
      <Route path="/AdminDashboard/*" element={<AdminDashboard />} />
      <Route path="/CustomerDashboard" element={<CustomerDashboard/>}/>
      {/* <Route
          path="/CustomerDashboard"
          element={
            <PrivateRoute>
              <CustomerDashboard />
            </PrivateRoute>
          }
        /> */}
      
    </Routes>
    </Router>
  )
}

export default App
