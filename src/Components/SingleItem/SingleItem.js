import React from 'react';
import book from "../book.jpeg";
import "./SingleItem.css";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Button from '@mui/material/Button';
import {connect} from "react-redux";
import * as Actions from "../../Redux/actions";

function SingleItem({product, addToCart}) {
  return (
      <div className="container">
          <div className="item-img">
              <img src={product.image} alt="" />
          </div>
          <div className="item-description">
              <h2 className="product-title">{product.title}</h2>
              <p className="price">M.R.P. &nbsp;<span>₹ {product.price}</span></p>
              <p className="description">Description</p>
              <p className="description-detail">{product.description}</p>
              <Button variant="contained" onClick={() => addToCart(product.id)} style={{backgroundColor:"rgb(13, 240, 219)", color: "rgb(43, 43, 43)", fontWeight: "500"}}><ShoppingCartOutlinedIcon/>&nbsp; ADD TO CART</Button>
          </div>
      </div>
  );
}

const mapStateToProps = (state) => {
    return {
        product: state.currentItem 
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addToCart: (Id) => dispatch({type: Actions.ADD_TO_CART, payload: {id: Id}})
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SingleItem);
