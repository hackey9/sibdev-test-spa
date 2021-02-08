import clsx from "clsx"
import React, {FC, PropsWithChildren} from "react"
import css from "./Icon.module.scss"


export type IconProps = PropsWithChildren<{
  type: "favorite" | "grid" | "list",
  active?: boolean
  onClick?: () => void
}>

const Icon: FC<IconProps> = ({type, active, onClick}) => {

  return (
    <div
      onClick={onClick}
      className={clsx(css.icon, {
        [css.active]: active,
        [css.typeFavorite]: type === "favorite",
        [css.typeGrid]: type === "grid",
        [css.typeList]: type === "list",
      })}
    />
  )
}
export default Icon
