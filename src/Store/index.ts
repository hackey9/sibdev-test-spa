import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit"
import {combineReducers} from "redux"
import {Api} from "Services"
import authReducer from "Store/Auth"
import favoritesReducer from "Store/Favorites"


const rootReducer = combineReducers({
  auth: authReducer,
  favorites: favoritesReducer,
})
export type RootState = ReturnType<typeof rootReducer>


export default function createStore(api: Api, preloadedState?: Partial<RootState>) {

  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: getDefaultMiddleware({
      thunk: {extraArgument: api},
    }),
  })
}
export type AppStore = ReturnType<typeof createStore>
export type AppDispatch = AppStore["dispatch"]


declare module "react-redux" {
  export function useDispatch<D = AppDispatch>(): D;

  interface DefaultRootState extends RootState {
  }
}

declare module "redux" {
  interface Store<S extends RootState> {
    getState: () => S
  }
}

export type ThunkConfig<TReject = unknown> = {
  state: RootState;
  dispatch: AppDispatch;
  extra: Api;
  rejectValue?: TReject;
  serializedErrorType?: unknown;
}
