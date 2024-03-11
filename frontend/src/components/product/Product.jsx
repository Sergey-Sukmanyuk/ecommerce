import { Link } from "react-router-dom";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Rating from "../rating/Rating";


const Product = ({ product }) => {
  return (
    <Card>
      <Link to={`/product/${product.slug}`}>
        <img className="card-img-top" src={product.image} alt={product.name} />
      </Link>
      <Card.Body>
        <Link to={`/product/${product.slug}`}>
          <Card.Title>{product.name}</Card.Title>
        </Link>
        <Rating rating={product.rating} numReviews={product.numReviews} />
        <Card.Text>
          <span className="currency-symbol">$</span>
          {product.price}
        </Card.Text>
        <Button className="btn-primary">
          Add to cart
        </Button>
      </Card.Body>
    </Card>
  );
};

export default Product;
