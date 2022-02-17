import React, {useState, useEffect} from 'react';
import book from "../book.jpeg";
import CartItem from "./CartItem/CartItem";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "./Cart.css"
import watch from "../watch.jpeg";
import speaker from "../speaker.jpg";
import {connect} from "react-redux";
import {coupons} from "../Coupons";

function Cart({cart}) {
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [oldPrice, setOldPrice] = useState(null);

  const changeCoupon = (e) => {
    setCoupon(e.target.value)
  }

  const ApplyCoupon = () => {
    let couponm = coupon.trim().toUpperCase();
    let obj = coupons[couponm];
    if(obj === undefined) {
      setLoading(false);
      setSuccess(false);
    }
    else {
      setLoading(false);
      setSuccess(true);
      let discount = (totalPrice/100)*(obj.discount);
      let newPrice = Math.trunc(totalPrice-discount);
      setOldPrice(totalPrice);
      setTotalPrice(newPrice);
    }
  }

  const revert = () => {
    setLoading(true);
    setSuccess(false);
    setTotalPrice(oldPrice);
    setOldPrice(null);
    setCoupon("");
  }

  const tryAgain = () => {
    setLoading(true);
    setSuccess(false);
    setCoupon("");
  }

  useEffect(() => {
    let price = 0;
    let items = 0;
    cart.forEach((item) => {
      items += item.qty;
      price += item.qty * item.price;
    })
    setTotalItems(items);
    setTotalPrice(price);
  }, [cart])

  return (
    <>
    {
      cart.length === 0 ? <h1 style={{textAlign: "center", marginTop: "1%"}}>Your Cart is Empty.</h1> :
      <div className="cart-container">
          <div className="cart-items">
              <h2 className="title">Shopping Cart</h2>
              {
                  cart.map((product) => (
                      <CartItem key={product.id} product = {product} />
                  ))
              }
          </div>
          <div className="cart-summary">
              <h2 className="summary-title">Cart Summary</h2>
              <p className="cart-total">Subtotal ({totalItems} items): <span style={{color: "black", fontWeight: "bold"}}>{totalPrice}</span></p>
              {
                loading === true ?
                <>
                <div className="coupon">
                <TextField id="standard-basic" value={coupon} onChange={changeCoupon} label="Enter Coupon Code" variant="standard" color='primary'/>
                <Button variant="outlined" size="small" style={{marginLeft: "2%"}} onClick={ApplyCoupon}>Apply</Button>
                </div> 
                </>:
                <>
                {
                  success === true ? 
                  <div className='coupon-success'>
                  <h4 style={{color: "rgb(18, 216, 188)", marginTop: "3%"}}>Code Applied!</h4>
                  <Button variant="contained"  size="small" onClick={revert} style={{background: "#f50057", marginTop: "4%"}}>Revert</Button>
                  </div>
                  :
                  <div className="coupon-failure">
                    <h4 style={{color: "rgb(18, 216, 188)", marginTop: "3%"}}>Not Valid!</h4>
                    <Button variant="contained"  onClick={tryAgain} size="small" style={{background: "#f50057", marginTop: "4%"}}>Try Again</Button>
                  </div>
                }
                </>
              }
              <Button variant="contained" color="primary" style={{marginTop: "5%", marginBottom: "6%"}}>PROCEED TO BUY</Button>
              
          </div>
      </div>
      }
      </>
  );
}


const mapStateToProps = (state) => {
  return {
    cart: state.cart
  }
}

export default connect(mapStateToProps)(Cart);
