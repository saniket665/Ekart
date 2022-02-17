import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {makeStyles} from "@material-ui/core/styles";
import "./ProductItem.css";
import {connect} from "react-redux";
import * as Actions from "../../../Redux/actions";
import {useHistory} from "react-router-dom";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    marginBottom: "5%"
  },
  media: {
    height: "41vh"
  },
})
function ProductItem({product, addToCart, viewItem}) {
  const classes = useStyles();
  const history = useHistory();
  const setCurrentItem = () => {
    viewItem(product);
    history.push(`/product/${product.id}`)
  }

  return <div>
    <Card className = {classes.root}>
      <CardMedia
        className={classes.media}
        image={product.image}
        alt={product.title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {product.title}
        </Typography>
        <Typography variant="body2" color="textsecondary" style={{height: "26vh"}}>
          {product.description}
        </Typography>
        <Typography variant="h5" align="center" mt={2}>
          {product.price}&nbsp;₹
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => setCurrentItem()}>VIEW ITEM</Button>
        <Button size="small" onClick={() => addToCart(product.id)}>ADD TO CART</Button>
      </CardActions>
    </Card>
  </div>;
}

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (Id) => dispatch({type: Actions.ADD_TO_CART, payload: {id: Id}}),
    viewItem: (product) => dispatch({type: Actions.OPEN_CURRENT_ITEM, payload: {item: product}})
  }
}

export default connect(null, mapDispatchToProps)(ProductItem);