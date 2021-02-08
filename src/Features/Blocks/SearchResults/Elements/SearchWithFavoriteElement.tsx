import TooltipElement from "Features/Blocks/SearchResults/Elements/TooltipElement"
import Icon from "Features/Elements/Icons/Icon"
import Search from "Features/Elements/Search/Search"
import React, {FC, PropsWithChildren, useCallback, useState} from "react"
import css from "./SearchResults.module.scss"


export type SearchWithFavoriteElementProps = PropsWithChildren<{
  onSearch: SearchAsyncHandler
  query: string
  onFavorite: FavoriteHandler
  favorite?: boolean
  onGoFavorite?: () => void
}>

const SearchWithFavoriteElement: FC<SearchWithFavoriteElementProps> = ({onSearch, query, onFavorite, favorite, onGoFavorite}) => {

  const [text, setText] = useState(query)
  const [loading, setLoading] = useState(false)

  const handleSearch = useCallback(() => {
    if (!loading) {

      let shouldUpdateState = true

      setLoading(true)
      onSearch(text).finally(() => {
        shouldUpdateState && setLoading(false)
      })

      return () => void (shouldUpdateState = false)
    }
  }, [loading, onSearch, text])

  return (
    <Search
      onChange={setText}
      value={text}
      onClick={handleSearch}
      placeholder={"Что хотите посмотреть?"}
      disabled={loading}
    >
      <div className={css.rectForIcon}>
        <Icon type={"favorite"} active={favorite} onClick={onFavorite}/>
        {favorite && (
          <TooltipElement onClick={onGoFavorite}/>
        )}
      </div>
    </Search>
  )
}
export default SearchWithFavoriteElement


export type SearchAsyncHandler = (query: string) => Promise<any>
export type FavoriteHandler = () => void
