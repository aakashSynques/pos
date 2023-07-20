// import { createStore } from 'redux'

// const initialState = {
//   sidebarShow: true,
// }

// const changeState = (state = initialState, { type, ...rest }) => {
//   switch (type) {
//     case 'set':
//       return { ...state, ...rest }
//     default:
//       return state
//   }z
// }

// const store = createStore(changeState)  
// export default store




import { createStore, combineReducers } from "redux";
import cartReducer from "./reducers/cartReducer"; // Import the cartReducer
import outletReducer from "./reducers/outletReducer"; // assign outlet
import deliveryReducer from "./reducers/deliveryReducer"; // delivery mode

const rootReducer = combineReducers({
  cart: cartReducer,
  outlets: outletReducer,
  deliveries: deliveryReducer,
  // Add other reducers here if needed
});

const store = createStore(rootReducer);
export default store;