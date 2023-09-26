import {
  SET_INPUT_FIELD_FOCUS,
  SET_INPUT_FIELD_BLUR,
} from "../action/actionTypes";

const initialState = {
  isInputFocus: false,
};

const inputReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_INPUT_FIELD_FOCUS:
      return {
        ...state,
        isInputFocus: true,
      };
    case SET_INPUT_FIELD_BLUR:
      return {
        ...state,
        isInputFocus: false,
      };

    default:
      return state;
  }
};

export default inputReducer;
