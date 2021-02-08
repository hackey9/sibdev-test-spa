import TooltipElement from "Features/Blocks/SearchResults/Elements/TooltipElement"
import Icon from "Features/Elements/Icons/Icon"
import Search from "Features/Elements/Search/Search"
import React, {FC, PropsWithChildren, useCallback, useState} from "react"
import css from "./SearchResults.module.scss"


export type SearchWithFollowElementProps = PropsWithChildren<{
  onSearch: SearchAsyncHandler
  query: string
  onFollow: FollowHandler
  followed?: boolean
  onGoFollow?: () => void
}>

const SearchWithFollowElement: FC<SearchWithFollowElementProps> = ({onSearch, query, onFollow, followed, onGoFollow}) => {

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
        <Icon type={"follow"} active={followed} onClick={onFollow}/>
        {followed && (
          <TooltipElement onClick={onGoFollow}/>
        )}
      </div>
    </Search>
  )
}
export default SearchWithFollowElement


export type SearchAsyncHandler = (query: string) => Promise<any>
export type FollowHandler = () => void
