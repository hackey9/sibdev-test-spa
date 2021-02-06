import clsx from "clsx"
import React, {FC} from "react"
import css from "./Layouts.module.scss"


export type FullscreenBackgroundElementProps = {
  spaces?: boolean
}

const FullscreenBackgroundElement: FC<FullscreenBackgroundElementProps> = ({children, spaces}) => {

  return (
    <div className={clsx(css.fullscreenBg, {[css.spaces]: spaces})}>
      {children}
    </div>
  )
}
export default FullscreenBackgroundElement
