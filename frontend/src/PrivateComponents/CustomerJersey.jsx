import axios from "axios";
import { useState, useEffect } from "react";

function CustomerJersey() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/jerseys/jerseys");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="customerJerseyContain" id="jersey">
      <h1 className="customerJerseyHeading">Jersey Collection</h1>
      <p className="customerJerseySubHeading">Choose your favorite jersey</p>
      <div className="customerJerseyContainer">
        {products.map((product) => (
          <div key={product.id} className="customerJerseyCard">
            <img className="customerJerseyImage" src={product.image} alt={product.name} />
            <h3 className="customerJerseyDetails">{product.name}</h3>
            <p className="customerJerseyPrice">${product.price}</p>
            <button className="customerJerseyButton">Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CustomerJersey;