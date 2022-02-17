import logo from './logo.svg';
import './App.css';
import Header from './Components/Header/Header';
import Products from './Components/Products/Products';
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import SingleItem from './Components/SingleItem/SingleItem';
import Cart from './Components/Cart/Cart';

function App() {
  return (
    <>
    <Router>
      <Header />
      <Switch>
      <Route exact path="/">
        <Products />
      </Route>
      <Route exact path="/cart">
        <Cart />
      </Route>
      <Route exact path="/product/:id">
        <SingleItem />
      </Route>
      </Switch>
    </Router>
    </>
  );
}

export default App;
