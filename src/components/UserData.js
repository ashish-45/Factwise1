import { useState } from "react";
import { Link } from "react-router-dom";

const UserData = ({ cartData, deleteItem }) => {
  const [searchQuery, setSearchQuery] = useState("");


  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredCartData = cartData.filter((cart) =>
    cart.products.some((product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <>
      <h2 style={{ textAlign: "center" }}>Cart Data</h2>
      <input
        type="text"
        value={searchQuery}
        onChange={handleChange}
        placeholder="Search"
        style={{padding:'5px', display:'flex',justifyContent:'center', alignContent:'center',margin:'0 auto',marginBottom:'1rem'}}
      />
      <div
        className=""
        style={{
          display: "flex",
          justifyContent: "space-around",
          flexWrap: "wrap",
        }}
      >
        {filteredCartData.map((cart, index) => (
          <div className="card" key={index}>
            <Link
              to={{ pathname: `/cartdetails/${cart.id}`, state: { cart } }}
              style={{ textDecoration: "none", color: "inherit" }}
            >
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
            </Link>
            <button
              className="btn btn-danger"
              onClick={() => deleteItem(cart.id)}
            >
              remove
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default UserData;
