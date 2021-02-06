import clsx from "clsx"
import React, {FC, PropsWithChildren} from "react"
import css from "./Layouts.module.scss"


export type AppContainerElementProps = PropsWithChildren<{}>

const AppContainerElement: FC<AppContainerElementProps> = ({children}) => (
  <div className={clsx(css.appContainer)}>
    {children}
  </div>
)
export default AppContainerElement


export const AppHeaderContainerElement: FC = ({children}) => (
  <div className={clsx(css.header)}>
    {children}
  </div>
)


export const AppBodyContainerElement: FC = ({children}) => (
  <div className={clsx(css.main)}>
    {children}
  </div>
)


export const AppLayoutAdaptiveContainer: FC = ({children}) => (
  <div className={css.adaptiveAppContainer}>
    {children}
  </div>
)
