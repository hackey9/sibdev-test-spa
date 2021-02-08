import React, {FC, PropsWithChildren, ReactNode} from "react"
import css from "./SearchResults.module.scss"



export type SearchLayoutElementProps = PropsWithChildren<{
  header?: ReactNode
  search?: ReactNode
  info?: ReactNode
}>

const SearchLayoutElement: FC<SearchLayoutElementProps> = ({header, search, info, children}) => {

  return (
    <div className={css.container}>
      <div className={css.header}>{header}</div>
      <div className={css.search}>{search}</div>
      <div className={css.info}>{info}</div>
      <div className={css.items}>{children}</div>
    </div>
  )
}
export default SearchLayoutElement
