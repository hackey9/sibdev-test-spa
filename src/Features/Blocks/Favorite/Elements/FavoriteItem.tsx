import React, {FC, PropsWithChildren, useCallback} from "react"
import {useHistory} from "react-router"
import {Order} from "Services/YouTubeAPI"
import css from "./Favorite.module.scss"


export type FavoriteItemProps = PropsWithChildren<{
  title: string
  id: string
  count: number
  order: Order
  query: string
  onChange?: (id: string) => void
  onDelete?: (id: string) => void
}>

const FavoriteItem: FC<FavoriteItemProps> = ({title, onChange, onDelete, id, count, query, order}) => {

  const history = useHistory()

  const handleClick = useCallback(() => {
    history.push(`/search/${encodeURIComponent(query)}/${count}-by-${order}/`)
  }, [count, history, order, query])

  return (
    <div className={css.listItem}>
      <div className={css.listItemTitle} onClick={handleClick}>{title}</div>
      <div className={css.listItemEdit} onClick={() => void onChange?.(id)}>Изменить</div>
      <div className={css.listItemDelete} onClick={() => void onDelete?.(id)}>Удалить</div>
    </div>
  )
}
export default FavoriteItem


export const FavoriteContainer: FC = ({children}) => <div className={css.list}>{children}</div>
