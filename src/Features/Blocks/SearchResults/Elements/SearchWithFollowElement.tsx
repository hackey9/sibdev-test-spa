import Icon from "Features/Elements/Icons/Icon"
import Search from "Features/Elements/Search/Search"
import React, {FC, PropsWithChildren, useCallback, useState} from "react"
import css from "./SearchResults.module.scss"


export type SearchWithFollowElementProps = PropsWithChildren<{
  onSearch: SearchAsyncHandler
  onFollow: FollowHandler
}>

const SearchWithFollowElement: FC<SearchWithFollowElementProps> = ({onSearch}) => {

  const [text, setText] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSearch = useCallback(() => {
    if (!loading) {
      setLoading(true)
      onSearch(text).finally(() => {
        setLoading(false)
      })
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
        <Icon type={"follow"}/>
      </div>
    </Search>
  )
}
export default SearchWithFollowElement


export type SearchAsyncHandler = (query: string) => Promise<any>
export type FollowHandler = () => void
