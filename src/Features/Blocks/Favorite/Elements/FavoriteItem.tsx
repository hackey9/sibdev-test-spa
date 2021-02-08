import React, {FC, PropsWithChildren} from "react"
import css from "./Favorite.module.scss"


export type FavoriteItemProps = PropsWithChildren<{
  title: string
  id: number
  onChange?: (id: number) => void
  onDelete?: (id: number) => void
}>

const FavoriteItem: FC<FavoriteItemProps> = ({title, onChange, onDelete, id}) => {

  return (
    <div className={css.listItem}>
      <div className={css.listItemTitle}>{title}</div>
      <div className={css.listItemEdit} onClick={() => void onChange?.(id)}>Изменить</div>
      <div className={css.listItemDelete} onClick={() => void onDelete?.(id)}>Удалить</div>
    </div>
  )
}
export default FavoriteItem


export const FavoriteContainer: FC = ({children}) => <div className={css.list}>{children}</div>
