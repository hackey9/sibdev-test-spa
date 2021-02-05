import {configureStore, getDefaultMiddleware, Store} from "@reduxjs/toolkit"
import rootReducer, {RootState} from "Store/rootReducer"


export default function createStore(preloadedState?: Partial<RootState>): Store {

  return configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware({
      thunk: {extraArgument: null},
    }),
    preloadedState,
  })
}

