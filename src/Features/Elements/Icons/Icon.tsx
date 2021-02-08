import clsx from "clsx"
import React, {FC, PropsWithChildren} from "react"
import css from "./Icon.module.scss"


export type FollowIconProps = PropsWithChildren<{
  type: "follow" | "grid" | "list",
  active?: boolean
  onClick?: () => void
}>

const Icon: FC<FollowIconProps> = ({type, active, onClick}) => {

  return (
    <div
      onClick={onClick}
      className={clsx(css.icon, {
        [css.active]: active,
        [css.typeFollow]: type === "follow",
        [css.typeGrid]: type === "grid",
        [css.typeList]: type === "list",
      })}
    />
  )
}
export default Icon
