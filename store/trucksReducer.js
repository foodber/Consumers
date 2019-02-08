import { allTrucks, truckOrders } from "../db/fire";
import fire from "firebase";
require("firebase/auth");

const GOT_ALL_TRUCKS = "GOT_ALL_TRUCKS";
const SET_TRUCK_MENU = "SET_TRUCK_MENU";
const ADD_ORDER = "ADD_ORDER";

const initialState = {
  allTrucks: [],
  menu: []
};

const gotAllTrucks = allTrucks => {
  return {
    type: GOT_ALL_TRUCKS,
    allTrucks
  };
};

export const setMenuForTruck = menu => {
  return {
    type: SET_TRUCK_MENU,
    menu
  };
};

const addOrder = order => {
  return {
    type: ADD_ORDER,
    order
  };
};

export const postOrder = order => {
  return async () => {
    try {
      const userId = await fire.auth().currentUser;
      const truckKey = await order.cart[0].truckName;
      if (order.cart.length !== 0) {
        let dataObj = {};
        order.cart.map(singleOrder => {
          dataObj[singleOrder.name] = singleOrder.quantity;
        });
        await truckOrders.doc(truckKey).set(
          {
            //this will be logged in user
            [userId.uid]: dataObj
          },
          { merge: true }
        );
      }
    } catch (error) {
      console.error(error);
    }
  };
};

export const fetchAllTrucks = () => {
  return async dispatch => {
    try {
      const truckList = [];
      const trucks = await allTrucks.get();
      trucks.forEach(oneTruck => {
        truckList.push(oneTruck.data());
      });
      dispatch(gotAllTrucks(truckList));
    } catch (error) {
      console.error(error);
    }
  };
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GOT_ALL_TRUCKS:
      return { ...state, allTrucks: [...action.allTrucks] };
    case SET_TRUCK_MENU:
      return { ...state, menu: action.menu };
    default:
      return state;
  }
}
