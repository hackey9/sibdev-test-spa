import AppHeader from "Features/Blocks/Header/AppHeader"
import AppLayout from "Features/Blocks/Layouts/AppLayout"
import AppSearch from "Features/Blocks/Search/AppSearch"
import React, {FC, useCallback} from "react"
import {useSelector} from "react-redux"
import {useHistory} from "react-router"
import {Redirect} from "react-router-dom"


const SearchPage: FC = () => {

  const isAuthorized = useIsAuthorized()

  const history = useHistory()

  const handleSearch = useCallback(q => {
    history.push("/search?" + new URLSearchParams({q}).toString())
  }, [history])

  if (!isAuthorized) {
    return <Redirect to={"/login"}/>
  }

  return (
    <AppLayout
      header={<AppHeader page={"search"}/>}
      children={<AppSearch onSearch={handleSearch}/>}
    />
  )
}
export default SearchPage


function useIsAuthorized() {
  const user = useSelector(s => s.auth.data?.user)

  return Boolean(user)
}
