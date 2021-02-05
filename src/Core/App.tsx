import React, {FC} from "react"
import {useSelector} from "react-redux"
import css from "./App.module.scss"


const App: FC = () => {
  const bar = useSelector(s => s.foo)

  return (
    <div className={css.test}>
      It works!
      <br/>
      ({bar})
    </div>
  )
}
export default App
