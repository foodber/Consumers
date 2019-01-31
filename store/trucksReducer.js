import * as firebase from "firebase";

var config = {
  apiKey: "AIzaSyDluonuaPcLFWSjnA7h8EaRCKxZnUHJ19g",
  authDomain: "foodber-65c10.firebaseapp.com",
  databaseURL: "https://foodber-65c10.firebaseio.com",
  projectId: "foodber-65c10",
  storageBucket: "foodber-65c10.appspot.com",
  messagingSenderId: "669394895252"
};

firebase.initializeApp(config);
const db = firebase.database().ref()

const GOT_ALL_TRUCKS = 'GOT_ALL_TRUCKS'
const GOT_TRUCK_MENU = 'GOT_TRUCK_MENU'
const ADD_ORDER = 'ADD_ORDER'

const initialState = {
    allTrucks: [],
    menu: []
}

const gotAllTrucks = allTrucks => {
    return {
        type: GOT_ALL_TRUCKS,
        allTrucks
    }
}

const gotMenuForTruck = menu => {
    return {
        type: GOT_TRUCK_MENU,
        menu
    }
}

const addOrder = order => {
    return {
        type: ADD_ORDER,
        order
    }
}

export const postOrder = order => {
    return async dispatch => {
        try {
            const truckKey = order.cart[0].truckName
            //in setValue is where we will pass in the current logged
            //in user
            let addedOrder = await db.child('truckOrder').child(truckKey).child('user5')
            let newObj = {}
            order.cart.map(eachItem => {
                const [itemName, quantity] = Object.keys(eachItem)
                newObj[itemName] = eachItem[quantity]
            })
            addedOrder.set(newObj)
            const action = addOrder(addedOrder)
            dispatch(action)
        } catch (error) {
            console.error(error)
        }
    }
}

export const fetchTruckMenu = key => {
    return async dispatch => {
        try {
            const menu = await db.child('truckMenus').child(key).once('value')
            const data = menu.val()
            dispatch(gotMenuForTruck(data))
        } catch (error) {
            console.error(error)
        }
    }
}

export const fetchAllTrucks = () => {
    return async dispatch => {
        try {
            const trucks = await db.child('trucks').once('value')
            const data = trucks.val()
            dispatch(gotAllTrucks(Object.values(data)))
        } catch (error) {
            console.error(error)
        }
    }
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GOT_ALL_TRUCKS:
            return {...state, allTrucks: [...action.allTrucks]}
        case GOT_TRUCK_MENU:
            return {...state, menu: action.menu}
        default:
            return state
    }
}
