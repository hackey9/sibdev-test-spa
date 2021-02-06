import React, {FC} from "react"
import css from "./Search.module.scss"


const BigSearchLayout: FC = ({children}) => (
  <div className={css.bigSearch}>
    {children}
  </div>
)
export default BigSearchLayout


export const BigSearchLayoutHeader: FC = ({children}) => (
  <div className={css.header}>{children}</div>
)
