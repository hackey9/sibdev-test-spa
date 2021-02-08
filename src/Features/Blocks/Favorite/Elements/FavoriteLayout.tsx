import React, {FC} from "react"
import css from "./Favorite.module.scss"


const FavoriteLayout: FC = ({children}) => {

  return (
    <div className={css.layout}>
      {children}
    </div>
  )
}
export default FavoriteLayout


export const FavoriteLayoutHead: FC = ({children}) => <div className={css.layoutHead}>{children}</div>
export const FavoriteLayoutList: FC = ({children}) => <div className={css.layoutList}>{children}</div>
