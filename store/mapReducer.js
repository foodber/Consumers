// //import db from '../db/fireStore';
// import { truckLocation } from '../db/fire';

// const GET_TRUCK_LOCATION = 'GET_TRUCK_LOCATION';
// // const SET_TRUCK_MENU = "SET_TRUCK_MENU";
// // const ADD_ORDER = "ADD_ORDER";

// const initialState = {
//   truckLocation: [],
// };

// const gotTruckLocation = truckLocation => {
//   return {
//     type: GET_TRUCK_LOCATION,
//     truckLocation,
//   };
// };

// export const fetchTruckLocation = () => {
//   return async dispatch => {
//     try {
//       const locationList = [];
//       const coordinates = await truckLocation.get();
//       coordinates.forEach(oneCoord => {
//         locationList.push(oneCoord.data());
//       });
//       dispatch(gotTruckLocation(locationList));
//     } catch (error) {
//       console.error(error);
//     }
//   };
// };

// export default function(state = initialState, action) {
//   switch (action.type) {
//     case GET_TRUCK_LOCATION:
//       return { ...state, truckLocation: [...action.truckLocation] };
//     default:
//       return state;
//   }
// }
