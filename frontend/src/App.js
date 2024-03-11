import { useContext } from "react";
import { BrowserRouter, Outlet, Routes, Route, Link } from "react-router-dom";
import { Store } from "./store";

import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import LinkContainer from "react-router-bootstrap/LinkContainer";
import Nav from "react-bootstrap/Nav";
import Badge from "react-bootstrap/Badge";

import "./App.css";

import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import ErrorPage from "./pages/ErrorPage";
import CartPage from "./pages/CartPage";

function App() {
  const { state } = useContext(Store);
  const { cart } = state;

  return (
    <BrowserRouter>
      <div className="d-flex flex-column site-container">
        <header>
          <Navbar bg="dark" variant="dark">
            <Container>
              <LinkContainer to="/">
                <Navbar.Brand>eCommerce</Navbar.Brand>
              </LinkContainer>
              <Nav className="me-auto">
                <Link className="nav-link" to="/cart">
                  Cart
                  {cart.cartItems.length > 0 && (
                    <Badge pill bg="danger">
                      {cart.cartItems.reduce((acc, item) => acc + item.qty, 0)}
                    </Badge>
                  )}
                </Link>
              </Nav>
            </Container>
          </Navbar>
        </header>
        <main>
          <Container className="mt-3">
            <Routes>
              <Route
                path="/"
                element={<HomePage />}
                errorElement={<ErrorPage />}
              />
              <Route path="/product/:slug" element={<ProductPage />} />
              <Route path="" element={<ProductPage />} />
              <Route path="/cart" element={<CartPage />} />
            </Routes>
            <Outlet />
          </Container>
        </main>
        <footer>
          <div className="text-center">All rights reserved</div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
