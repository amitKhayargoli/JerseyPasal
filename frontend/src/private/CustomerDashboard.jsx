import React from "react";
import "./CustomerDashboard.css"


import CustomerHome from "../PrivateComponents/CustomerHome"
import CustomerJersey from "../PrivateComponents/CustomerJersey";
import Footer from "../LPComponents/Footer";


function CustomerDashboard() {
    return(
        
        <div className="CustomerDashboardContainer">
            <CustomerHome/>
            <CustomerJersey/>
            <Footer/>
        </div>
    )
}

export default CustomerDashboard;
