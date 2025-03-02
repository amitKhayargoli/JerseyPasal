import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Signup from "./public/Signup";
import Login from "./public/Login";
import Landingpage from "./public/Landingpage";
import AdminDashboard from "./private/AdminDashboard";
import CustomerDashboard from "./private/CustomerDashboard";
import AdminPrivateRoute from "./routes/AdminPrivateRoute";
import CustomerPrivateRoute from "./routes/CustomerPrivateRoute";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route index element={<Landingpage />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Login" element={<Login />} />

        <Route element={<ProtectedRoute roleRequired={"admin"} />}>
          <Route path="/AdminDashboard/*" element={<AdminDashboard />} />
        </Route>

        <Route element={<ProtectedRoute roleRequired={"user"} />}>
          <Route path="/CustomerDashboard" element={<CustomerDashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
