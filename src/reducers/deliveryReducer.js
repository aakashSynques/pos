const initialState = {
  selectedDelivery: null,
};

const deliveryReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SELECT_DELIVERY":
      return {
        ...state,
        selectedDelivery: action.payload,
      };
    default:
      return state;
  }
};

export default deliveryReducer;