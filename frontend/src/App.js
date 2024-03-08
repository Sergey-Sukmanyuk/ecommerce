import { BrowserRouter, Outlet, Routes, Route } from "react-router-dom";

import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import LinkContainer from "react-router-bootstrap/LinkContainer";

import "./App.css";

import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import ErrorPage from "./pages/ErrorPage";

function App() {
  return (
    <div className="d-flex flex-column site-container">
      <BrowserRouter>
        <header>
          <Navbar bg="dark" variant="dark">
            <Container>
              <LinkContainer to="/">
                <Navbar.Brand>eCommerce</Navbar.Brand>
              </LinkContainer>
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
            </Routes>
            <Outlet />
          </Container>
        </main>
        <footer>
          <div className="text-center">All rights reserved</div>
        </footer>
      </BrowserRouter>
    </div>
  );
}

export default App;
