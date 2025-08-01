import {userActions} from '../../actions/actionTypes';

export const userReducer = (
    state = {
      token: null,
      first_name: null,
      last_name: null,
      email: null,
      isAuthenticated: false,
      renewToken: false
    },
    action
  ) => {
    // Clone state object : always do it at the beginning because equality / inequality is at the core of flux architectural pattern
    const newState = Object.assign({}, state); // saying newState = {...state} would produce the same result
    // Look for type set in the actions file
    // these types should be as unique as possible
    switch (action.type) {
      case userActions.LOGIN_SUCCEED:
        newState.token = action.data;
        break;
      case userActions.LOGOUT:
        newState.token = null;
        newState.isAuthenticated = false;
        localStorage.removeItem("token");
        break;
      case userActions.UPDATE_IS_AUTHENTICATED:
        newState.isAuthenticated = action.data
        break;
      case userActions.ADD_LOGGED_USER:
        newState.email = action.data.email;
        newState.first_name = action.data.first_name;
        newState.last_name = action.data.last_name;
        break;
      case userActions.RENEW_TOKEN:
        newState.renewToken = action.data;
        break;
      default:
        // by default return initial state, no need to recompute things if state wasn't changed after all
        return state;
    }
    // return the modified state
    return newState;
  };


