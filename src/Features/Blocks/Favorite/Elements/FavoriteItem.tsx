import {AnimatePresence, motion, Variants} from "framer-motion"
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
  index: number
}>

const FavoriteItem: FC<FavoriteItemProps> = ({title, onChange, onDelete, id, count, query, order, index}) => {

  const history = useHistory()

  const handleClick = useCallback(() => {
    history.push(`/search/${encodeURIComponent(query)}/${count}-by-${order}/`)
  }, [count, history, order, query])

  return (
    <motion.div layout className={css.listItem} variants={variants} key={id} initial={"init"} animate={"idle"}
                exit={"exit"} custom={index}>
      <div className={css.listItemTitle} onClick={handleClick}>{title}</div>
      <div className={css.listItemEdit} onClick={() => void onChange?.(id)}>Изменить</div>
      <div className={css.listItemDelete} onClick={() => void onDelete?.(id)}>Удалить</div>
    </motion.div>
  )
}
export default FavoriteItem


export const FavoriteContainer: FC = ({children}) => {
  return (
    <motion.div className={css.list}>
      <AnimatePresence>
        {children}
      </AnimatePresence>
    </motion.div>
  )
}


const variants: Variants = {
  init: {
    x: -10,
    opacity: 0,
  },
  idle: (custom: number) => ({
    x: 0,
    opacity: 1,
    transition: {
      delay: custom * 0.03,
    },
  }),
  exit: {
    opacity: 0,
    x: 40,
    transition: {
      mass: 2,
    },
    pointerEvents: "none",
  },
}
