import { useContext } from "react";
import { Store } from "../store";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import MessageBox from "../components/message/MessageBox";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const CartPage = () => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  return (
    <div>
      <Helmet>
        <title>Shopping cart</title>
      </Helmet>
      <h1>Shopping cart</h1>
      <Row>
        <Col md={8}>
          {cartItems.length === 0 ? (
            <MessageBox>
              Cart is empty. <Link to="/"> Go Shopping</Link>
            </MessageBox>
          ) : (
            <ListGroup>
              {cartItems.map((item) => (
                <ListGroup.Item key={item._id}>
                  <Row className="align-items-center">
                    <Col md={4}>
                      <img
                        className="img-fluid rounded img-thumbnail"
                        src={item.image}
                        alt={item.name}
                      />{" "}
                      <Link to={`/product/${item.slug}`}>{item.name}</Link>
                    </Col>
                    <Col md={3}>
                      <Button variant="light" disabled={item.qty === 1}>
                        <i className="fas fa-minus-circle"></i>
                      </Button>
                      <span className="cart-qty">{item.qty}</span>
                      <Button
                        variant="light"
                        disabled={item.qty === item.countInStock}
                      >
                        <i className="fas fa-plus-circle"></i>
                      </Button>
                    </Col>
                    <Col md={3}>${item.price}</Col>
                    <Col md={2}>
                      <Button variant="light">
                        <i className="fas fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <ListGroup>
                <ListGroup.Item>
                  <h3 className="subtotal">
                    Subtotal
                    <span>
                      {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                    </span>
                    items: $
                    <span>
                      {cartItems.reduce(
                        (acc, item) => acc + item.price * item.qty,
                        0
                      )}
                    </span>
                  </h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-grid">
                    <Button
                      type="button"
                      variant="primary"
                      disabled={cartItems.length === 0}
                    >
                      Proceed To Checkout
                    </Button>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CartPage;
