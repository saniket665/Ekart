import React, {useState} from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import "./CartItem.css";
import {connect} from "react-redux";
import * as Actions from "../../../Redux/actions";

function CartItem({product, removeCart, updateQty}) {
    const [qty, setQty] = useState(product.qty);
    const changeQty = (e) => {
        setQty(e.target.value);
        updateQty(product.id, parseInt(e.target.value));
    }
  return (
  <>
  <hr/>
  <div className="cart-item-container">
      <div className="cart-img">
          <img src={product.image} alt="" />
      </div>
      <div className="cart-description">
          <h3 className="cart-title">{product.title}</h3>
          <div className="cart-qty">
            <p>Qty</p>
            <input type="number" min = "1" value={qty} onChange={changeQty} className='qty-input'/>
          </div>
          <p className="cart-overview">
              {product.description}
          </p>
          <div className="price-delete-btn">
              <Button variant="contained" onClick={() => removeCart(product.id)} style={{backgroundColor: "#f50057"}}>Delete</Button>
              <p className='cart-price'>₹ {product.price}</p>
          </div>
      </div>
  </div>
  </>
  );
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateQty: (Id, qty) => dispatch({type: Actions.UPDATE_QTY, payload: {id: Id, qty: qty}}),
        removeCart: (Id) => dispatch({type: Actions.REMOVE_FROM_CART, payload: {id: Id}})
    }
}

export default connect(null, mapDispatchToProps)(CartItem);
