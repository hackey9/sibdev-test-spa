import clsx from "clsx"
import React, {FC, PropsWithChildren} from "react"
import css from "./Headline.module.scss"


export type HeadlineProps = PropsWithChildren<{
  children?: string
  level?: 1 | 2
}>

const Headline: FC<HeadlineProps> = ({children, level}) => {

  return (
    <div className={clsx(css.headline, {
      [css.level2]: level === 2,
    })}>
      {children}
    </div>
  )
}
export default Headline
