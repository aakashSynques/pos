import { SET_PANDING_SALE_PROCESS } from "../action/actionTypes";

const initialState = {
    pandingSaleProcess: [],
};

const pendingSaleProcessReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PANDING_SALE_PROCESS:
            return {
                ...state,
                pandingSaleProcess: action.payload,
            };
        default:
            return state;
    }
};

export default pendingSaleProcessReducer;

