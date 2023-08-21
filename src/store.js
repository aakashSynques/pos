import { createStore, combineReducers } from "redux";
import cartReducer from "./reducers/cartReducer"; // Import the cartReducer
import outletReducer from "./reducers/outletReducer"; // assign outlet
import outletIdReducer from "./reducers/outletIdReducer";
import selectedOutletReducer from "./reducers/selectedOutletReducer";
import customerReducer from "./reducers/customerReducer";
import deliveryReducer from "./reducers/deliveryReducer";



const rootReducer = combineReducers({
  cart: cartReducer,
  outlets: outletReducer,
  selectedOutletId: outletIdReducer,
  selectedOutlet: selectedOutletReducer,
  customer: customerReducer,
  delivery: deliveryReducer,

});

const store = createStore(rootReducer);
export default store;
