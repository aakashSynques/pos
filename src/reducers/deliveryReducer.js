const deliveryReducer = (state = [], action) => {
    switch (action.type) {
      case "SET_DELIVERY_LIST":
        return action.payload;
      
      case "SET_SELECTED_DELIVERY_MODE":
        return {
          ...state,
          selectedDeliveryMode: action.payload,
        };
      
      default:
        return state;
    }
  };
  
  export default deliveryReducer;