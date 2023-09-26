// outletIdReducer.js
const initialState = {
  selectedOutletId: null,
};

const outletIdReducer = (state = initialState, action) => {
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

export default outletIdReducer;
