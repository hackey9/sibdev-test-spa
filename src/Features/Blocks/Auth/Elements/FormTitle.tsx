import React, {FC, PropsWithChildren} from "react"
import css from "./Auth.module.scss"


export type FormTitleProps = PropsWithChildren<{
  children?: string
}>

const FormTitle: FC<FormTitleProps> = ({children}) => {

  return (
    <div className={css.formTitle}>
      {children}
    </div>
  )
}
export default FormTitle
