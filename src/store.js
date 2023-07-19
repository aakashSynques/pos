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

const rootReducer = combineReducers({
  cart: cartReducer,
  // Add other reducers here if needed
});

const store = createStore(rootReducer);
export default store;