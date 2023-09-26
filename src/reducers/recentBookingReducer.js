import { SET_RECENT_BOOKINGS } from '../action/actionTypes';

const initialState = {
  recentBookings: [],
};

const recentBookingReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_RECENT_BOOKINGS:
      return {
        ...state,
        recentBookings: action.payload,
      };
    default:
      return state;
  }
};

export default recentBookingReducer;

