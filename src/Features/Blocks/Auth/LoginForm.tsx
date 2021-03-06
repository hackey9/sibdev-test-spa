import ButtonElement from "Features/Blocks/Auth/Elements/ButtonElement"
import FormInputElement from "Features/Blocks/Auth/Elements/FormInputElement"
import FormTitle from "Features/Blocks/Auth/Elements/FormTitle"
import LoginFormLayoutElement from "Features/Blocks/Auth/Elements/LoginFormLayoutElement"
import SibdevLogoElement from "Features/Blocks/Auth/Elements/SibdevLogoElement"
import React, {FC, PropsWithChildren, useCallback, useEffect, useRef, useState} from "react"


export type LoginFormProps = PropsWithChildren<{
  onLogin?: LoginAsyncHandler
}>

const LoginForm: FC<LoginFormProps> = ({onLogin}) => {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<"username" | "password" | null>(null)
  const anyError = Boolean(error)
  const usernameError = error === "username"
  const passwordError = error === "password"
  // export to local hook `useError() => {anyError, usernameError, ...}` looks be more pretty

  useEffect(() => setError(null), [username, password])

  const shouldUpdate = useRef(true) // dont touch xD
  useEffect(() => () => void (shouldUpdate.current = false), [])

  const handleClick = useCallback(() => {
    if (onLogin) {
      setLoading(true)
      onLogin(username, password).then(result => {
        result && shouldUpdate.current && setError(result)
      }).finally(() => {
        // we catch 'memory leak' warning here (fixed)
        //  when login is success
        //  because component will be unmounted by redux
        shouldUpdate.current && setLoading(false)
      })
    }
  }, [onLogin, password, username])

  return (
    <LoginFormLayoutElement>
      <SibdevLogoElement/>
      <FormTitle>Вход</FormTitle>
      <FormInputElement type={"username"} value={username} onChange={setUsername} error={usernameError}/>
      <FormInputElement type={"password"} value={password} onChange={setPassword} password error={passwordError}/>
      <ButtonElement onClick={handleClick} disabled={loading || anyError}/>
    </LoginFormLayoutElement>
  )
}
export default LoginForm


export type LoginAsyncHandler = (username: string, password: string) => Promise<void | "password" | "username">
