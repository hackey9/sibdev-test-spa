import {useIsAuthorized} from "Core/useIsAuthorized"
import HeaderContainerElement from "Features/Blocks/Header/Elements/HeaderContainerElement"
import HeaderNavItem, {HeaderNavContainer} from "Features/Blocks/Header/Elements/HeaderNavElements"
import HeaderWrapperElement from "Features/Blocks/Header/Elements/HeaderWrapperElement"
import SibdevLogoElement from "Features/Blocks/Header/Elements/SibdevLogoElement"
import {AppLayoutAdaptiveContainer} from "Features/Blocks/Layouts/Elements/AppContainerElement"
import React, {FC, PropsWithChildren, useCallback} from "react"
import {useDispatch} from "react-redux"
import {useHistory} from "react-router"
import {Redirect} from "react-router-dom"
import {logoutAsync} from "Store/Auth"


export type AppHeaderProps = PropsWithChildren<{
  page?: "search" | "follow"
}>

const AppHeader: FC<AppHeaderProps> = ({page}) => {

  const history = useHistory()
  const authState = useIsAuthorized()
  const dispatch = useDispatch()

  const handleLogout = useCallback(() => {
    dispatch(logoutAsync())
  }, [dispatch])

  const isSearch = page === "search"
  const isFollow = page === "follow"


  const goFollow = useCallback(() => {
    history.push("/follow/")
  }, [history])

  const goSearch = useCallback(() => {
    history.push("/search/")
  }, [history])

  if (authState === "anonymous") {
    return <Redirect to={"/login"}/>
  }

  if (authState === "background") {
    return null
  }


  return (
    <HeaderWrapperElement>
      <AppLayoutAdaptiveContainer>

        <HeaderContainerElement>
          <SibdevLogoElement/>
          <HeaderNavContainer type={"nav"}>
            <HeaderNavItem onClick={goSearch} active={isSearch}>Поиск</HeaderNavItem>
            <HeaderNavItem onClick={goFollow} active={isFollow}>Избранное</HeaderNavItem>
          </HeaderNavContainer>
          <HeaderNavContainer type={"userpanel"}>
            <HeaderNavItem onClick={handleLogout}>Выйти</HeaderNavItem>
          </HeaderNavContainer>
        </HeaderContainerElement>

      </AppLayoutAdaptiveContainer>
    </HeaderWrapperElement>
  )
}
export default AppHeader
