import React, {FC} from "react"
import css from "./Modal.module.scss"


const ModalWindow: FC = ({children}) => {

  return (
    <div className={css.window}>
      {children}
    </div>
  )
}
export default ModalWindow



export const ModalWindowHeader: FC = ({children}) => <div className={css.header}>{children}</div>
export const ModalWindowFields: FC = ({children}) => <div className={css.fields}>{children}</div>
export const ModalWindowButtons: FC = ({children}) => <div className={css.buttonGroup}>{children}</div>

export const ModalWindowField: FC = ({children}) => <div className={css.fieldsItem}>{children}</div>
