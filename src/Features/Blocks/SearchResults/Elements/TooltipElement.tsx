import React, {FC} from "react"
import css from "./TooltipElement.module.scss"


const TooltipElement: FC<{onClick?: () => void}> = ({onClick}) => {

  return (
    <div className={css.position}>
      <div className={css.box}>
        <span>Поиск сохранён в разделе «Избранное»</span>
        <div className={css.link} onClick={onClick}>Перейти в избранное</div>
      </div>
    </div>
  )
}
export default TooltipElement
