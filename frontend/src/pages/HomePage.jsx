import { useEffect, useReducer } from "react";
import axios from "axios";
import logger from "use-reducer-logger";
import { Helmet } from "react-helmet-async";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import Product from "../components/product/Product";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, products: action.payload, loading: false };
    case "FATCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const HomePage = () => {
  const [{ loading, error, products }, dispatch] = useReducer(logger(reducer), {
    products: [],
    loading: true,
    error: "",
  });
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get("/api/products");
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (error) {
        dispatch({ type: "FATCH_FAIL", payload: error.message });
      }
    };
    fetchData();
  }, []);

  const loader = <div>Loading...</div>;
  const errorMessage = <div> Oops! Something went wrong. Error: {error} </div>;
  const prductList = products?.map((product) => (
    <Col key={product.slug} sm={6} md={4} lg={3} className="mb-3">
      <Product product={product} />
    </Col>
  ));

  return (
    <>
      <Helmet>
        <title>eCommerce</title>
      </Helmet>
      <h1>Featured products</h1>
      <div className="products">
        <Row>{loading ? loader : error ? errorMessage : prductList}</Row>
      </div>
    </>
  );
};

export default HomePage;
