import clsx from "clsx"
import React, {FC, PropsWithChildren} from "react"
import css from "./Headline.module.scss"


export type HeadlineProps = PropsWithChildren<{
  level?: 1 | 2 | 3
}>

const Headline: FC<HeadlineProps> = ({children, level}) => {

  return (
    <div className={clsx(css.headline, css[`level${level}`])}>
      {children}
    </div>
  )
}
export default Headline
