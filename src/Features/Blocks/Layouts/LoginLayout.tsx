import FullscreenBackgroundElement from "Features/Blocks/Layouts/Elements/FullscreenBackgroundElement"
import LoginFormElement from "Features/Blocks/Layouts/Elements/LoginFormElement"
import React, {FC, PropsWithChildren} from "react"


export type LoginLayoutProps = PropsWithChildren<{}>

const LoginLayout: FC<LoginLayoutProps> = ({children}) => {

  return (
    <FullscreenBackgroundElement spaces>
      <LoginFormElement>
        {children}
      </LoginFormElement>
    </FullscreenBackgroundElement>
  )
}
export default LoginLayout
