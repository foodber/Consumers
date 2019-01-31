//import db from '../db/fireStore';
import { allTrucks } from '../db/fire';

const GOT_ALL_TRUCKS = 'GOT_ALL_TRUCKS';
const GOT_TRUCK_MENU = 'GOT_TRUCK_MENU';
const ADD_ORDER = 'ADD_ORDER';

const initialState = {
  allTrucks: [],
  menu: [],
};

const gotAllTrucks = allTrucks => {
  return {
    type: GOT_ALL_TRUCKS,
    allTrucks,
  };
};

const gotMenuForTruck = menu => {
  return {
    type: GOT_TRUCK_MENU,
    menu,
  };
};

const addOrder = order => {
  return {
    type: ADD_ORDER,
    order,
  };
};

export const postOrder = order => {
  return async dispatch => {
    try {
      const truckKey = await order.cart[0].truckName;
      //in setValue is where we will pass in the current logged
      //in user
      let addedOrder = await db
        .child('truckOrder')
        .child(truckKey)
        .child('user5');
      let newObj = {};
      order.cart.map(eachItem => {
        const [itemName, quantity] = Object.keys(eachItem);
        newObj[itemName] = eachItem[quantity];
      });
      addedOrder.set(newObj);
      const action = addOrder(addedOrder);
      dispatch(action);
    } catch (error) {
      console.error(error);
    }
  };
};

export const fetchTruckMenu = key => {
  return async dispatch => {
    try {
      const menu = await db
        .child('truckMenus')
        .child(key)
        .once('value');
      const data = menu.val();
      dispatch(gotMenuForTruck(data));
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
    case GOT_TRUCK_MENU:
      return { ...state, menu: action.menu };
    default:
      return state;
  }
}
