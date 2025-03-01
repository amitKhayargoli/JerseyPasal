import { useContext } from "react";
import { CartContext } from "./CartContext";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function CustomerCart() {
  const { cart, removeFromCart } = useContext(CartContext);

  const handlePurchase = () => {
    toast.success("Purchase successful!");
  };

  return (
    <div className="customerCartContain">
      <h1 className="customerCartHeading">Your Cart</h1>
      <table className="customerCartTable">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((product, index) => (
            <tr key={index}>
              <td>
                <img className="customerCartImage" src={product.image} alt={product.name} />
              </td>
              <td>{product.name}</td>
              <td>${product.price}</td>
              <td>
                <button className="customerCartButton" onClick={() => removeFromCart(product.id)}>
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="purchaseButton" onClick={handlePurchase}>
        Purchase
      </button>
      <ToastContainer />
    </div>
  );
}

export default CustomerCart;