const redux = require("redux");
const {
  legacy_createStore,
  bindActionCreators,
  combineReducers,
  applyMiddleware,
} = redux;
const produce = require("immer").produce; // For nested objects
const reduxLogger = require("redux-logger");
const logger = reduxLogger.createLogger();
const thunkMiddleware = require("redux-thunk").default;
const axios = require("axios");

// Initial States
const cakeInitialState = { noOfCake: 10 };
const iceCreamInitialState = { noOfIceCream: 20 };
const addressInitialState = {
  address: { city: "Hajipur", state: "Bihar" },
};
const asyncInitialState = {
  loading: false,
  usersId: [],
  error: "",
};

// Action Types
const CAKE_ORDERED = "CAKE_ORDERED";
const CAKE_RESTOCKED = "CAKE_RESTOCKED";
const ICECREAM_ORDERED = "ICECREAM_ORDERED";
const ICECREAM_RESTOCKED = "ICECREAM_RESTOCKED";
const UPDATE_CITY = "UPDATE_CITY";
const FETCH_USERS_REQUESTED = "FETCH_USERS_REQUESTED";
const FETCH_USERS_SUCCEEDED = "FETCH_USERS_SUCCEEDED";
const FETCH_USERS_FAILED = "FETCH_USERS_FAILED";

// Action Creators
const orderCake = (qty = 1) => ({ type: CAKE_ORDERED, payload: qty });
const restockCake = (qty = 1) => ({ type: CAKE_RESTOCKED, payload: qty });

const orderIceCream = (qty = 1) => ({
  type: ICECREAM_ORDERED, // ✅ Correct action type
  payload: qty,
});

const restockIceCream = (qty = 1) => ({
  type: ICECREAM_RESTOCKED, // ✅ Correct action type
  payload: qty,
});

const updateCity = (city) => ({
  type: UPDATE_CITY,
  payload: city,
});

const fetchUsersRequest = () => ({ type: FETCH_USERS_REQUESTED });
const fetchUsersSucceeded = (data) => ({
  type: FETCH_USERS_SUCCEEDED,
  payload: data,
});
const fetchUsersFailed = (error) => ({
  type: FETCH_USERS_FAILED,
  payload: error,
});

// Reducers
const cakeReducer = (state = cakeInitialState, action) => {
  switch (action.type) {
    case CAKE_ORDERED:
      return { ...state, noOfCake: state.noOfCake - action.payload };
    case CAKE_RESTOCKED:
      return { ...state, noOfCake: state.noOfCake + action.payload };
    default:
      return state;
  }
};

const iceCreamReducer = (state = iceCreamInitialState, action) => {
  switch (action.type) {
    case ICECREAM_ORDERED:
      return { ...state, noOfIceCream: state.noOfIceCream - action.payload };
    case ICECREAM_RESTOCKED:
      return { ...state, noOfIceCream: state.noOfIceCream + action.payload };
    default:
      return state;
  }
};

const addressReducer = (state = addressInitialState, action) => {
  switch (action.type) {
    case UPDATE_CITY:
      return produce(state, (draft) => {
        draft.address.city = action.payload;
      });
    default:
      return state;
  }
};

const asyncReducer = (state = asyncInitialState, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUESTED:
      return { ...state, loading: true };
    case FETCH_USERS_SUCCEEDED:
      return { ...state, usersId: action.payload, loading: false };
    case FETCH_USERS_FAILED:
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

// Combine Reducers
const rootReducer = combineReducers({
  cake: cakeReducer,
  iceCream: iceCreamReducer,
  address: addressReducer,
  async: asyncReducer,
});

// Create Store with Middleware
const store = legacy_createStore(
  rootReducer,
  applyMiddleware(thunkMiddleware, logger)
);

// Binding Actions
const action = bindActionCreators(
  { orderCake, restockCake, orderIceCream, restockIceCream, updateCity },
  store.dispatch
);

console.log("Initial State: ", store.getState());

const unsubscribe = store.subscribe(() => {});

// Thunk Function to Fetch Users
const fetchUsersId = () => {
  return (dispatch) => {
    dispatch(fetchUsersRequest());
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        if (response.status === 200) {
          const usersId = response.data.map((user) => user.id);
          dispatch(fetchUsersSucceeded(usersId));
        } else {
          dispatch(fetchUsersFailed("Failed to fetch users"));
        }
      })
      .catch((error) => {
        dispatch(fetchUsersFailed(error.message));
      });
  };
};

// Dispatching Actions
action.orderCake();
action.orderCake();
action.orderCake();
action.restockCake(3);
action.updateCity("Patna");
store.dispatch(fetchUsersId());

// Unsubscribe after dispatching actions
// unsubscribe();
