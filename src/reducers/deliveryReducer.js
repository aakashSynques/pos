const deliveryReducer = (state = [], action) => {
    switch (action.type) {
      case "SET_DELIVERY_LIST":
        return action.payload;
      default:
        return state;
    }
  };
  
  export default deliveryReducer;