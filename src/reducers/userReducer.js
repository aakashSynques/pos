// login reducers
const initialState = {
    user: null, // Initially, user is set to null
  };
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case "SET_USER":
        return {
          ...state,
          user: action.payload,
        };
      case "LOGOUT_USER":
        return {
          ...state,
          user: null,
        };
      default:
        return state;
    }
  };
  
  export default userReducer;