import clsx from "clsx"
import React, {FC, PropsWithChildren} from "react"
import css from "./Headline.module.scss"


export type HeadlineProps = PropsWithChildren<{
  children?: string
}>

const Headline: FC<HeadlineProps> = ({children}) => {

  return (
    <div className={clsx(css.headline, {})}>
      {children}
    </div>
  )
}
export default Headline
