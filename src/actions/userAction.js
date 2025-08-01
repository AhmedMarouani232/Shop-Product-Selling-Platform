import { userActions } from "./actionTypes";
;
export const updateIsAuthenticated =
(isAuthenticated) =>
async (dispatch) => {
  try {
    dispatch({
      type: userActions.UPDATE_IS_AUTHENTICATED,
      data: isAuthenticated,
    })
  } catch (e) {
    console.error(e)
  }
}

export const loginSucceed = 
(token) => 
  async (dispatch) => {
  dispatch({
    type: userActions.LOGIN_SUCCEED,
    data: token,
  });
}

export const logoutAction = 
() => 
  async (dispatch) => {
  dispatch({
    type: userActions.LOGOUT,
  });
}

export const addLoggedUser = 
(data) => 
  async (dispatch) => {
  dispatch({
    type: userActions.ADD_LOGGED_USER,
    data: data,
  });
}

export const renewToken = 
(data) => 
  async (dispatch) => {
  dispatch({
    type: userActions.RENEW_TOKEN,
    data: data,
  });
}
