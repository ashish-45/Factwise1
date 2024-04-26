import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

const CartDetails = ({ cartData }) => {
  const params = useParams();
  const { index } = params;

  const cart = cartData.find((cart) => cart.id === parseInt(index));

  console.log(cart,"cart");

  if (!cart) {
    return <div>Cart not found</div>;
  }


  return (
    <div>
      <h2>Cart Details</h2>
      <p>Cart ID: {cart.id}</p>
      <p>Total Products: {cart.totalProducts}</p>
      <div>
        {cart.products.map((product, index) => (
          <div className="product" key={index}>
            <img src={product.thumbnail} alt="" />
            <div className="product-info">
              <p className="product-title">{product.title}</p>
              <p className="product-price">Price: ${product.price}</p>
            </div>
          </div>
        ))}
      </div>
      <p className="total">Total: ${cart.total}</p>
    </div>
  );
};

export default CartDetails;
