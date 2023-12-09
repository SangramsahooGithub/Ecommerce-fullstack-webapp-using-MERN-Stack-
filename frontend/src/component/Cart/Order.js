import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";

const ConfirmOrder = () => {
  const navigate = useNavigate();
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user, isAuthenticated } = useSelector((state) => state.user);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const shippingCharges = subtotal > 1000 ? 0 : 200;

  const tax = subtotal * 0.18;

  const totalPrice = subtotal + tax + shippingCharges;

  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;

  const Payment = () => {
    const data = {
      subtotal,
      shippingCharges,
      tax,
      totalPrice,
    };

    sessionStorage.setItem("orderInfo", JSON.stringify(data));

    navigate("/process/payment");
  };

  return (
    <>
      {isAuthenticated ? (
        <>
          <MetaData title={`Your Orders`} />
          <div className="container my-3 ">
            <h4 className="text-center mb-5">Order Details </h4>
            <div className="row    shadow-lg rounded-3 p-3">
              <div className="col-md-4 col-12 ">
                <h6 className="fw-bold">Shipping Details : </h6>
                <p><small>Name: {user.name}</small></p>
                <p> <small>Phone: {shippingInfo.phoneNo}</small></p>
                <p> <small>Address: {address}</small></p>
              </div>

              <div className="col-md-4 col-12 ps-5  cartitems ">
                <h6 className="fw-bold">Your Cart Items : </h6>

                {cartItems &&
                  cartItems.map((item) => (
                    <div key={item.product}>
                      <img
                        src={item.image}
                        alt="Product"
                        style={{ width: "50px",marginBottom:"10px" }}
                      />
                      <Link
                        to={`/product/${item.product}`}
                        className="orderlink"
                      >
                       <small> {item.name}</small>
                      </Link>

                      <span>
                       <small> {item.quantity} X ₹{item.price} ={" "}</small>
                        <b><small>₹{item.price * item.quantity}</small></b>
                      </span>
                    </div>
                  ))}
              </div>

              <div className="col-md-4 col-12 ps-5 cartorder">
                <h6 className="fw-bold">Order Summary :</h6>
                <div>
                  <div>
                    <p><small>Subtotal: ₹{subtotal}</small></p>
                  </div>
                  <div>
                    <p><small>Shipping Charges: ₹{shippingCharges}</small></p>
                  </div>
                  <div>
                    <p><small>GST: ₹{tax}</small></p>
                  </div>
                </div>

                <div className="orderSummaryTotal">
                  <p>
                    <b><small>Total: ₹{totalPrice}</small></b>
                  </p>
                </div>

                <button
                  onClick={Payment}
                  className="btn  neumorphin"
                >
                  <small>Proceed To Payment</small> <i class="fa-solid fa-angles-right"></i>
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default ConfirmOrder;
