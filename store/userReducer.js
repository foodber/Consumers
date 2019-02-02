import { users } from "../db/fire";
import firebase from "firebase";
import "firebase/auth";

const initialState = {
  user: {}
};

const LOG_IN = "LOG_IN";

const SIGN_UP = "SIGN_UP";

const LOG_OUT = "LOG_OUT";

const logInAction = user => {
  return {
    type: LOG_IN,
    user
  };
};

const signUpAction = user => {
  return {
    type: SIGN_UP,
    user
  };
};

const logOutAction = () => {
  return {
    type: LOG_OUT
  };
};

export const logIn = userId => {
  return async dispatch => {
    try {
      const user = await users.doc(userId).get();
      const userData = user.data();
      dispatch(logInAction(userData));
    } catch (error) {
      console.log(error);
    }
  };
};

export const signUp = userId => {
  return async dispatch => {
    try {
      const user = await users.doc(userId).get();
      const userData = user.data();
      dispatch(signUpAction(userData));
    } catch (error) {
      console.log(error);
    }
  };
};

export const logOut = () => {
  return async dispatch => {
    try {
      await firebase.auth().signOut();
      dispatch(logOutAction());
    } catch (error) {
      console.log(error);
    }
  };
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOG_IN:
      return { ...state, user: action.user };
    case SIGN_UP:
      return { ...state, user: action.user };
    case LOG_OUT:
      return { ...state, user: {} };
    default:
      return state;
  }
}
