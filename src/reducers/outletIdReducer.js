
// const initialState = {
//     // other states in your store
//     selectedOutletId: null,
//   };
  
//   const outletIdReducer = (state = initialState, action) => {
//     switch (action.type) {
//       // other cases
//       case "SET_SELECTED_OUTLET_ID":
//         return {
//           ...state,
//           selectedOutletId: action.payload,
//         };
//       default:
//         return state;
//     }
//   };
  
//   export default outletIdReducer;
  

 // reducers/index.js
const initialState = {
  // ... other initial states
  selectedOutletId: null,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_SELECTED_OUTLET_ID":
      return {
        ...state,
        selectedOutletId: action.payload,
      };
    // ... other cases
    default:
      return state;
  }
};

export default rootReducer;