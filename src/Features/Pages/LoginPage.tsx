import {unwrapResult} from "@reduxjs/toolkit"
import {useIsAuthorized} from "Core/useIsAuthorized"
import LoginForm, {LoginAsyncHandler} from "Features/Blocks/Auth/LoginForm"
import LoginLayout from "Features/Blocks/Layouts/LoginLayout"
import React, {FC, useCallback} from "react"
import {useDispatch} from "react-redux"
import {Redirect} from "react-router-dom"
import {loginAsync} from "Store/Auth"


const LoginPage: FC = () => {

  const authState = useIsAuthorized()

  const dispatch = useDispatch()


  const handleLogin: LoginAsyncHandler = useCallback(async (username, password) => {
    try {
      const task = dispatch(loginAsync({username, password}))
      unwrapResult(await task) // can throw
    } catch (e) {
      const message = String(e["message"])

      if (/pass/.test(message)) return "password"
      if (/user/.test(message)) return "username"
    }
  }, [dispatch])

  if (authState === "authorized") {
    return <Redirect to={"/search/"}/>
  }

  if (authState === "background") {
    return null
  }

  return (
    <LoginLayout>
      <LoginForm onLogin={handleLogin}/>
    </LoginLayout>
  )
}
export default LoginPage
