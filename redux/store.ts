import { configureStore, Action, combineReducers } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
import { createWrapper, HYDRATE } from "next-redux-wrapper";
import { AnyAction } from "@reduxjs/toolkit";
import { debug } from "console";
// ...

const combinedReducer = combineReducers({
  cartSlice,
});

const reducer = (
  state: ReturnType<typeof combinedReducer>,
  action: AnyAction
) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    };
    return nextState;
  } else {
    return combinedReducer(state, action);
  }
};

const makeStore = () =>
  configureStore({
    reducer: { cartSlice },
  });

type Store = ReturnType<typeof makeStore>;
export type RootState = ReturnType<Store["getState"]>;
export type AppDispatch = Store["dispatch"];

export const wrapper = createWrapper(makeStore, { debug: true });
