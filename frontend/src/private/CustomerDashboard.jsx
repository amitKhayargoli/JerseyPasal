import React from "react";
import "./CustomerDashboard.css"
import { CartProvider } from "../PrivateComponents/CartContext";
import CustomerHome from "../PrivateComponents/CustomerHome"
import CustomerJersey from "../PrivateComponents/CustomerJersey";
import CustomerCart from "../PrivateComponents/CustomerCart";
import Footer from "../LPcomponents/Footer";


function CustomerDashboard() {
    return(
        
        <div className="CustomerDashboardContainer">
            <CartProvider>
            <CustomerHome/>
            <CustomerJersey/>
            <CustomerCart/>
            <Footer/>
            </CartProvider>
        </div>
    )
}

export default CustomerDashboard;
