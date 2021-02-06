import clsx from "clsx"
import React, {FC, PropsWithChildren} from "react"
import css from "./Layouts.module.scss"



export type LoginFormElementProps = PropsWithChildren<{}>

const LoginFormElement: FC<LoginFormElementProps> = ({children}) => {

  return (
    <div className={clsx(css.form)}>
      {children}
    </div>
  )
}
export default LoginFormElement
