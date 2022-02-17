import React from 'react';
import watch from "../watch.jpeg";
import speaker from "../speaker.jpg";
import book from "../book.jpeg";
import ProductItem from './Product/ProductItem';
import "./Products.css";
import {connect} from "react-redux";

function Products({products}) {
  return  (
      <div className="products-container">
        {
          products.map((product) => (
            <ProductItem key= {product.id} product={product}/>
          ))
        }
      </div>
  );
}

const mapStateToProps = (state) => {
  return {
    products: state.products
  }
}

export default connect(mapStateToProps)(Products);
