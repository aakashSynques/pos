const outletReducer = (state = [], action) => {
    switch (action.type) {
      case "SET_OUTLET_LIST":
        return action.payload;
      default:
        return state;
    }
  };
  
  export default outletReducer;
  