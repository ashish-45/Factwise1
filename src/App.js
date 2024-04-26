import React, { useState, useEffect } from "react";
import "./App.css";
import UserData from "./components/UserData";
// import ViewAllData from './components/ViewAllData';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CartDetails from "./components/CartDetails";
import Axios from "axios";

function App() {
  const [cartData, setCartData] = useState([]);
  const API = "https://dummyjson.com/carts";

  const fetchData = async () => {
    try {
      const response = await Axios.get(API);
      setCartData(response.data.carts);
    } catch (err) {
      console.log(err, "error");
    }
  };

  useEffect(() => {
    fetchData();
  },[]);

  const deleteItem = (id) => {
    let updatedcart = cartData.filter((item) => item.id !== id);
    alert(`${id} deleted from list`);
    setCartData(updatedcart);
  };

  return (
    <Router>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <UserData
              cartData={cartData}
              setCartData={setCartData}
              deleteItem={deleteItem}
            />
          }
        ></Route>
        <Route
          exact
          path="/cartdetails/:index"
          element={<CartDetails cartData={cartData} />}
        ></Route>
      </Routes>
    </Router>
  );
}

export default App;
