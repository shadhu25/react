const configureStore = require("@reduxjs/toolkit").configureStore;
const createLogger = require("redux-logger").createLogger;
const cakeReducer = require("../features/cake/cakeSlice");
const iceCreamReducer = require("../features/icecream/icecreamSlice");
const userReducer = require('../features/user/userSlice')
const logger = createLogger();

const store = configureStore({
  reducer: {
    cake: cakeReducer,
    iceCream: iceCreamReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

module.exports = store;
