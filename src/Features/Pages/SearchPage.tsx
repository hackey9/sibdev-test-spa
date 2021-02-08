import {useIsAuthorized} from "Core/useIsAuthorized"
import AppHeader from "Features/Blocks/Header/AppHeader"
import AppLayout from "Features/Blocks/Layouts/AppLayout"
import AppSearch from "Features/Blocks/Search/AppSearch"
import React, {FC, useCallback} from "react"
import {useHistory} from "react-router"
import {Redirect} from "react-router-dom"


const SearchPage: FC = () => {

  const authState = useIsAuthorized()

  const history = useHistory()

  const handleSearch = useCallback(q => {
    const uri = `/search/${encodeURIComponent(q)}/12-by-relevance/`
    history.push(uri)
  }, [history])

  if (authState === "anonymous") {
    return <Redirect to={"/login"}/>
  }

  if (authState === "background") {
    return null
  }

  return (
    <AppLayout
      header={<AppHeader page={"search"}/>}
      children={<AppSearch onSearch={handleSearch}/>}
    />
  )
}
export default SearchPage
