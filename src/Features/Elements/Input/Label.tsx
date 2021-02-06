import clsx from "clsx"
import React, {FC, PropsWithChildren} from "react"
import css from "./Input.module.scss"


export type LabelProps = PropsWithChildren<{
  children?: string
  error?: boolean
}>

const Label: FC<LabelProps> = ({children, error}) => (
  <div className={clsx(css.label, {[css.error]: error})}>
    {children}
  </div>
)
export default Label
