import { SET_SUBMITTED_PICKUP_DATE_TIME } from "../action/actionTypes";

const initialState = {
  submittedPickUpDateTime: null,
};

const pickUpDateTimeReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SUBMITTED_PICKUP_DATE_TIME:
      return {
        ...state,
        submittedPickUpDateTime: {
          date: action.payload.date,
          time: action.payload.time,
        },
      };
    default:
      return state;
  }
};

export default pickUpDateTimeReducer;
