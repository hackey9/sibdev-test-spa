import React, {FC} from "react"
import css from "./Modal.module.scss"


const ModalWindowFullscreenBackface: FC = ({children}) => {

  return (
    <div className={css.layout}>
      {children}
    </div>
  )
}
export default ModalWindowFullscreenBackface
