

import { createStore, combineReducers } from "redux";
import cartReducer from "./reducers/cartReducer"; // Import the cartReducer
import outletReducer from "./reducers/outletReducer"; // assign outlet
import deliveryReducer from "./reducers/deliveryReducer"; // delivery mode
import outletIdReducer from "./reducers/outletIdReducer";
// import deliveryReducer from "./reducers/deliveryReducer";

const rootReducer = combineReducers({
  cart: cartReducer,
  outlets: outletReducer,
  // deliveries: deliveryReducer,
  selectedOutletId: outletIdReducer, // Use selectedOutletId key for outletIdReducer
  // Add other reducers here if needed
  delivery: deliveryReducer,   // select deliver mode reducer
});

const mapStateToProps = (state) => ({
  outletList: state.outlets || [], // Set default value as an empty array
  deliveryList: state.deliveries || [], // Set default value as an empty array
  selectedOutletId: state.selectedOutletId, // Map selectedOutletId to the appropriate state property
});

const store = createStore(rootReducer);
export default store;