import * as actionTypes from "../Actions/actionTypes";
const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.INIT_COMPONENT:
      return {
        ...state,
        error: null
      };

    case actionTypes.AUTH_START:
      return {
        ...state,
        error: null,
        loading: true
      };
    case actionTypes.AUTH_SUCCESS:
      return {
        ...state,
        token: action.authData.idToken,
        userId: action.authData.localId,
        error: null,
        loading: false
      };
    case actionTypes.AUTH_LOGOUT:
      return {
        ...state,
        token: null,
        userId: null
      };

    case actionTypes.AUTH_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false
      };
    default:
      return state;
  }
};
export default reducer;
