import clsx from "clsx"
import React, {FC} from "react"
import css from "./Auth.module.scss"



const LoginFormLayoutElement: FC = ({children}) => {

  return (
    <div className={clsx(css.layout)}>
      {children}
    </div>
  )
}
export default LoginFormLayoutElement
