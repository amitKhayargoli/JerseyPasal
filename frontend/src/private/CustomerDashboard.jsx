import React from "react";
import "./CustomerDashboard.css"
import CustomerNavbar from "../PrivateComponents/CustomerNavbar"
import CustomerHome from "../PrivateComponents/CustomerHome"
import CustomerJersey from "../PrivateComponents/CustomerJersey";

function CustomerDashboard() {
    return(
        
        <div className="CustomerDashboardContainer">
            <CustomerNavbar/>
            <CustomerHome/>
            <CustomerJersey/>
        </div>
    )
}

export default CustomerDashboard;
