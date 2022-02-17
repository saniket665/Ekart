import {createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import ShopReducer from "./ShopReducer"; 


const store = createStore(ShopReducer, composeWithDevTools());

export default store;