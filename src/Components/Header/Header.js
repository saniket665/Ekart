import React, {useState, useEffect} from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {makeStyles} from "@material-ui/core/styles";
import "./Header.css";
import {Link} from "react-router-dom";
import {connect} from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  tools: {
    position: "relative",
  },
  title: {
    flexGrow: 1
  }
}))

function Header({cart}) {
  const classes = useStyles();
  const [cartCount, setCartCount] = useState(0);
  useEffect(() => {
    let count = 0;
    cart.forEach((item) => {
      count += item.qty;
    })
    setCartCount(count);
  }, [cart, cartCount])
  return <div className={classes.root}>
      <AppBar style={{backgroundColor: "rgb(41, 227, 201)"}} position="static">
        <Toolbar className={classes.tools}>
          <Typography variant="h6" className={classes.title}>
          <Link to="/">Shopping Cart</Link>
          </Typography>
          <Link to = "/cart">
          <Button color="inherit">Cart <ShoppingCartIcon style={{marginLeft: "10%"}} /><span className="cart-count">{cartCount}</span></Button>
          </Link>
        </Toolbar>
      </AppBar>
  </div>;
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart
  }
}
export default connect(mapStateToProps)(Header);
