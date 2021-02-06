import clsx from "clsx"
import React, {FC, PropsWithChildren} from "react"
import css from "./Header.module.scss"


export type HeaderNavElementsProps = PropsWithChildren<{
  active?: boolean
}>

const HeaderNavItem: FC<HeaderNavElementsProps> = ({children, active}) => {

  return (
    <div className={clsx(css.item)}>
      {children}
      {active && <div className={css.itemActiveLine}/>}
    </div>
  )
}
export default HeaderNavItem

export const HeaderNavContainer: FC<{ type: "nav" | "userpanel" }> = ({children, type}) => (
  <div className={clsx(type === "nav" ? css.nav : css.userpanel)}>
    {children}
  </div>
)
