import App from "Core/App"
import React, {createElement, FC, StrictMode} from "react"
import {render} from "react-dom"
import {Provider} from "react-redux"
import createStore from "Store/createStore"
import "./index.css"
import reportWebVitals from "./reportWebVitals"


const store = createStore()

const Root: FC = () => (
  <StrictMode>
    <Provider store={store}>
      <App/>
    </Provider>
  </StrictMode>
)

render(createElement(Root), document.getElementById("root"))

reportWebVitals()
