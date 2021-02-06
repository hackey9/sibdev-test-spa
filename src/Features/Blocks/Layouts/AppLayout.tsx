import AppContainerElement, {
  AppBodyContainerElement,
  AppHeaderContainerElement,
} from "Features/Blocks/Layouts/Elements/AppContainerElement"
import FullscreenBackgroundElement from "Features/Blocks/Layouts/Elements/FullscreenBackgroundElement"
import React, {FC, PropsWithChildren, ReactNode} from "react"


export type AppLayoutProps = PropsWithChildren<{
  header?: ReactNode
}>

const AppLayout: FC<AppLayoutProps> = ({header, children}) => (
  <FullscreenBackgroundElement>
    <AppContainerElement>
      <AppHeaderContainerElement>{header}</AppHeaderContainerElement>
      <AppBodyContainerElement>{children}</AppBodyContainerElement>
    </AppContainerElement>
  </FullscreenBackgroundElement>
)
export default AppLayout
