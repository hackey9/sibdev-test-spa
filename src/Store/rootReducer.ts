import {combineReducers} from "redux"


const rootReducer = combineReducers({
  foo: () => "bar",
})
export default rootReducer


export type RootState = ReturnType<typeof rootReducer>


declare module "react-redux" {
  interface DefaultRootState extends RootState {
  }
}
