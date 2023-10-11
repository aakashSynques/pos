import { createStore, combineReducers } from "redux";
import cartReducer from "./reducers/cartReducer"; // Import the cartReducer
import outletReducer from "./reducers/outletReducer"; // assign outlet
import outletIdReducer from "./reducers/outletIdReducer";
import selectedOutletReducer from "./reducers/selectedOutletReducer";
import customerReducer from "./reducers/customerReducer";
import deliveryReducer from "./reducers/deliveryReducer";
import pickUpDateTimeReducer from "./reducers/pickUpDateTimeReducer";
import allProductReducer from "./reducers/allProductReducer";
import recentBookingReducer from "./reducers/recentBookingReducer";
import inputReducer from "./reducers/inputFieldReducer";
import customerAccReducer from "./reducers/customerAccReducer";
import cashReducer from "./reducers/cashReducer";
import saveSaleReducer from "./reducers/saveSaleReducer";
import KOTtableNoReducer from "./reducers/KOTtableNoReducer";
import pendingSaleProcessReducer from "./reducers/pendingSaleProcessReducer";


const rootReducer = combineReducers({
  cart: cartReducer,
  outlets: outletReducer,
  selectedOutletId: outletIdReducer,
  selectedOutlet: selectedOutletReducer,
  customer: customerReducer,
  delivery: deliveryReducer,
  pickup: pickUpDateTimeReducer,
  recentBooking: recentBookingReducer,
  allProducts: allProductReducer,
  inputFocus: inputReducer,
  customerAccount: customerAccReducer,
  totalCash: cashReducer,
  getSaveSale: saveSaleReducer,
  table: KOTtableNoReducer,
  pendingSaleProcess : pendingSaleProcessReducer,
});

const store = createStore(rootReducer);
export default store;
