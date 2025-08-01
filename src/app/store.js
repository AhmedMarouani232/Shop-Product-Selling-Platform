import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers/index';
import {saveToLocalStorage, loadFromLocalStorage} from "../utils.js";
// import authMiddleware from "./middlewares/authMiddleware";


let store = configureStore({
  reducer: rootReducer,
  // Temporarily disable authMiddleware to debug redirect loop
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authMiddleware),
});

if(typeof window !== 'undefined'){

  store = configureStore({
    reducer: rootReducer,
    preloadedState: loadFromLocalStorage(),
    // Temporarily disable authMiddleware to debug redirect loop
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authMiddleware),
    devTools: process.env.REACT_APP_MODE === 'development' ? true : false
  });

  // listen for store changes and use saveToLocalStorage to
  // save them to localStorage
  store.subscribe(() => {
      saveToLocalStorage(store.getState());
  });
}

export default store;