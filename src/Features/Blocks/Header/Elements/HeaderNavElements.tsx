import clsx from "clsx"
import {motion} from "framer-motion"
import React, {FC, PropsWithChildren, useCallback} from "react"
import css from "./Header.module.scss"


export type HeaderNavElementsProps = PropsWithChildren<{
  active?: boolean
  onClick?: () => void
}>

const HeaderNavItem: FC<HeaderNavElementsProps> = ({children, active, onClick}) => {

  const handleClick = useCallback(() => void onClick?.(), [onClick])

  return (
    <div className={clsx(css.item)} onClick={handleClick}>
      {children}
      {active && (
        <motion.div
          className={css.itemActiveLine}
          layout
          layoutId={"header-active-line"}
        />
      )}
    </div>
  )
}
export default HeaderNavItem

export const HeaderNavContainer: FC<{ type: "nav" | "userpanel" }> = ({children, type}) => (
  <div className={clsx(type === "nav" ? css.nav : css.userpanel)}>
    {children}
  </div>
)
