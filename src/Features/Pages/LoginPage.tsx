import LoginForm, {LoginAsyncHandler} from "Features/Blocks/Auth/LoginForm"
import LoginLayout from "Features/Blocks/Layouts/LoginLayout"
import React, {FC, useCallback} from "react"
import delay from "Utils/delay"


const LoginPage: FC = () => {

  // TODO: replace with dispatch redux action
  const handleLogin: LoginAsyncHandler = useCallback(async (username, password) => {
    await delay(400)

    if (username.length === 0)
      return "username"

    if (username !== password)
      return "password"

  }, [])

  return (
    <LoginLayout>
      <LoginForm onLogin={handleLogin}/>
    </LoginLayout>
  )
}
export default LoginPage
