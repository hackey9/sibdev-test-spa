import Icon from "Features/Elements/Icons/Icon"
import React, {FC, PropsWithChildren} from "react"
import css from "./SearchResults.module.scss"


export type SearchInfoElementProps = PropsWithChildren<{
  query: string
  count?: number
  view: ViewType
  onChangeView: ChangeViewHandler
}>

const SearchInfoElement: FC<SearchInfoElementProps> = ({query, count, view, onChangeView}) => {

  const hasCount = typeof count === "number"

  return (
    <div className={css.resultsInfo}>
      <span className={css.infoHead}>Видео по запросу "<b>{query}</b>"</span>
      <span className={css.infoCount}>{hasCount ? count : "..."}</span>
      <div className={css.icons}>
        <Icon type={"list"} active={view === "list"} onClick={() => onChangeView("list")}/>
        <Icon type={"grid"} active={view === "grid"} onClick={() => onChangeView("grid")}/>
      </div>
    </div>
  )
}
export default SearchInfoElement

export type ViewType = "list" | "grid"
export type ChangeViewHandler = (view: ViewType) => void
