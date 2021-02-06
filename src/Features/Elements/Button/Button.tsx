import clsx from "clsx"
import React, {FC, PropsWithChildren, useCallback} from "react"
import css from "./Button.module.scss"


export type ButtonProps = PropsWithChildren<{
  disabled?: boolean
  secondary?: boolean
  onClick?: () => void
  children?: string
  appendTo?: "right" | "left" | "both"
}>

const Button: FC<ButtonProps> = ({children, disabled, secondary, onClick, appendTo}) => {

  const handleClick = useCallback(() => {
    onClick?.()
  }, [onClick])

  return (
    <div
      className={clsx(css.button, {
        [css.disabled]: disabled,
        [css.secondary]: secondary,
        [css.appendRight]: appendTo === "right",
      })}
      onClick={handleClick}
    >
      {children}
    </div>
  )
}
export default Button
