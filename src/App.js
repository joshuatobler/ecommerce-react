import "./App.css";
import React, { useState, useEffect } from "react";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import Books from "./pages/Books";
import BookInfo from "./pages/BookInfo";
import Footer from "./components/Footer";
import Cart from "./pages/Cart";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { books } from "./data";

function App() {
  const [cart, setCart] = useState([]);

  function addToCart(book) {
    setCart([...cart, { ...book, quantity: 1 }]);
    // const dupeItem = cart.find(item => parseFloat(item.id) === parseFloat(book.id));
    // if (dupeItem) {
    //   setCart(cart.map(item => {
    //     if (item.id === dupeItem.id) {
    //       return {
    //         ...item,
    //         quantity: item.quantity + 1
    //       }
    //     }
    //     else {
    //       return item;
    //     }
    //   }))
    // } else {
    //   setCart([...cart, {...book, quantity: 1}]);
    // }
  }

  // loops over every item in the cart to find the book we're working with, then updates the quantity of that book
  function changeQuantity(book, quantity) {
    setCart(
      cart.map((item) =>
        item.id === book.id
          ? {
              ...item,
              quantity: parseInt(quantity),
            }
          : item,
      ),
    );
  }

  function removeItem(book) {
    setCart(cart.filter((item) => item.id !== book.id));
  }

  function numberOfItems() {
    let counter = 0;
    cart.forEach((item) => {
      counter += item.quantity;
    });
    return counter;
  }

  useEffect(() => {
    console.log(cart);
  }, [cart]);

  return (
    <Router>
      <div className="App">
        <Nav numberOfItems={numberOfItems} />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/books" exact element={<Books books={books} />} />
          <Route
            path="/books/:id"
            element={
              <BookInfo books={books} addToCart={addToCart} cart={cart} />
            }
          />
          <Route
            path="/cart"
            element={
              <Cart
                cart={cart}
                changeQuantity={changeQuantity}
                removeItem={removeItem}
              />
            }
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
