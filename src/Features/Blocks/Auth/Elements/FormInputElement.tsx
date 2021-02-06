import clsx from "clsx"
import Input from "Features/Elements/Input/Input"
import Label from "Features/Elements/Input/Label"
import React, {FC, PropsWithChildren} from "react"
import css from "./Auth.module.scss"


export type FormInputElementProps = PropsWithChildren<{
  type: "username" | "password"
  value: string
  onChange: (value: string) => void
  password?: boolean
  disabled?: boolean
  error?: boolean
}>

const FormInputElement: FC<FormInputElementProps> = ({type, value, onChange, password, disabled, error}) => {

  const isUsername = type === "username"

  return (
    <div className={clsx(css.inputContainer, isUsername ? css.inputUsername : css.inputPassword)}>
      <Label error={error}>{isUsername ? "Логин" : "Пароль"}</Label>
      <Input value={value} onChange={onChange} password={password} disabled={disabled}/>
    </div>
  )
}
export default FormInputElement
