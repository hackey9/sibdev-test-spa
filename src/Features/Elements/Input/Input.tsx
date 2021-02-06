import clsx from "clsx"
import React, {ChangeEventHandler, FC, PropsWithChildren, useCallback, useReducer} from "react"
import css from "./Input.module.scss"


export type InputProps = PropsWithChildren<{
  value: string
  onChange: (value: string) => void
  password?: boolean
  disabled?: boolean
  appendAt?: "left" | "right" | "both"
  placeholder?: string
}>

const Input: FC<InputProps> = ({password, value, onChange, disabled, children, appendAt, placeholder}) => {

  const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback(e => {
    !disabled && onChange?.(e.target.value)
  }, [disabled, onChange])

  const [protect, invertProtect] = useReducer((protect: boolean) => !protect, Boolean(password))

  return (
    <div className={clsx(css.inputWrapper, {
      [css.appendRight]: appendAt === "right",
      [css.appendLeft]: appendAt === "left",
      [css.appendBoth]: appendAt === "both",
    })}>
      <input
        type={protect ? "password" : "text"}
        value={value}
        onChange={handleChange}
        className={clsx({[css.withEyePadding]: password})}
        disabled={disabled}
        placeholder={placeholder}
      />
      {password && (
        <div className={clsx(css.eye, {[css.eyeActive]: protect})} onClick={invertProtect}/>
      )}
      {children}
    </div>
  )
}
export default Input
