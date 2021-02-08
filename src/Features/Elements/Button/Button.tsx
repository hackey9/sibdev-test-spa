import clsx from "clsx"
import React, {FC, MouseEventHandler, PropsWithChildren, useCallback} from "react"
import css from "./Button.module.scss"


export type ButtonProps = PropsWithChildren<{
  disabled?: boolean
  secondary?: boolean
  onClick?: () => void
  children?: string
  appendTo?: "right" | "left" | "both"
}>

const Button: FC<ButtonProps> = ({children, disabled, secondary, onClick, appendTo}) => {

  const handleClick: MouseEventHandler<HTMLButtonElement> = useCallback(e => {
    e.preventDefault()
    onClick?.()
  }, [onClick])

  return (
    <button
      className={clsx(css.button, {
        [css.disabled]: disabled,
        [css.secondary]: secondary,
        [css.appendRight]: appendTo === "right",
      })}
      onClick={handleClick}
      type={"submit"}
    >
      {children}
    </button>
  )
}
export default Button
