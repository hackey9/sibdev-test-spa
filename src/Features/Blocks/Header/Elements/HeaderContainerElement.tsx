import React, {FC} from "react"
import css from "./Header.module.scss"


const HeaderContainerElement: FC = ({children}) => (
  <div className={css.container}>
    {children}
  </div>
)
export default HeaderContainerElement
