const initialState = {
  selectedOutlet: {},
};

const selectedOutletReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_SELECTED_OUTLET_DATA":
      return {
        ...state,
        selectedOutlet: action.payload,
      };
    // ... other cases
    default:
      return state;
  }
};

export default selectedOutletReducer;
