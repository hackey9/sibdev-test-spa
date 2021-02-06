import clsx from "clsx"
import React, {FC} from "react"
import css from "./Header.module.scss"


const HeaderWrapperElement: FC = ({children}) => (
  <div className={clsx(css.wrapper)}>
    {children}
  </div>
)
export default HeaderWrapperElement
