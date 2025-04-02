const store = require("./app/store");
const { fetchUsersId } = require("./features/user/userSlice");
const cakeActions = require("./features/cake/cakeSlice").cakeActions;
const iceCreamActions =
  require("./features/icecream/icecreamSlice").iceCreamActions;

console.log("InitialState:", store.getState());

const unsubscribe = store.subscribe(() => {
  // console.log("UpdatedState:", store.getState());
});

store.dispatch(cakeActions.ordered());
store.dispatch(cakeActions.ordered());
store.dispatch(cakeActions.ordered());
store.dispatch(cakeActions.restocked(3));

store.dispatch(iceCreamActions.ordered());
store.dispatch(iceCreamActions.ordered());
store.dispatch(iceCreamActions.ordered());
store.dispatch(iceCreamActions.restocked(3));

store.dispatch(fetchUsersId());

// unsubscribe()