import clsx from "clsx"
import Button from "Features/Elements/Button/Button"
import React, {FC, PropsWithChildren, useCallback} from "react"
import css from "./Auth.module.scss"


export type ButtonElementProps = PropsWithChildren<{
  children?: string
  onClick?: () => void
  disabled?: boolean
}>

const ButtonElement: FC<ButtonElementProps> = ({onClick, disabled}) => {

  const handleClick = useCallback(() => {
    !disabled && onClick?.()
  }, [disabled, onClick])

  return (
    <div className={clsx(css.button, {[css.disabled]: disabled})}>
      <Button disabled={disabled} onClick={handleClick} secondary>Войти</Button>
    </div>
  )
}
export default ButtonElement
