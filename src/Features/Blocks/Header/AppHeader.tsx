import HeaderContainerElement from "Features/Blocks/Header/Elements/HeaderContainerElement"
import HeaderNavItem, {HeaderNavContainer} from "Features/Blocks/Header/Elements/HeaderNavElements"
import HeaderWrapperElement from "Features/Blocks/Header/Elements/HeaderWrapperElement"
import SibdevLogoElement from "Features/Blocks/Header/Elements/SibdevLogoElement"
import {AppLayoutAdaptiveContainer} from "Features/Blocks/Layouts/Elements/AppContainerElement"
import React, {FC, PropsWithChildren, useCallback} from "react"
import {useDispatch} from "react-redux"
import {logoutAsync} from "Store/Auth"


export type AppHeaderProps = PropsWithChildren<{
  page?: "search" | "follow"
}>

const AppHeader: FC<AppHeaderProps> = ({page}) => {

  const dispatch = useDispatch()

  const handleLogout = useCallback(() => {
    dispatch(logoutAsync())
  }, [dispatch])

  const isSearch = page === "search"
  const isFollow = page === "follow"

  return (
    <HeaderWrapperElement>
      <AppLayoutAdaptiveContainer>

        <HeaderContainerElement>
          <SibdevLogoElement/>
          <HeaderNavContainer type={"nav"}>
            <HeaderNavItem active={isSearch}>Поиск</HeaderNavItem>
            <HeaderNavItem active={isFollow}>Избранное</HeaderNavItem>
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
