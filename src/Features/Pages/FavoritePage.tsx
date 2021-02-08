import {useIsAuthorized} from "Core/useIsAuthorized"
import AppFavorite from "Features/Blocks/Favorite/AppFavorite"
import AppHeader from "Features/Blocks/Header/AppHeader"
import AppLayout from "Features/Blocks/Layouts/AppLayout"
import React, {FC, useCallback} from "react"
import {useDispatch} from "react-redux"
import {Redirect} from "react-router-dom"
import {Order} from "Services/YouTubeAPI"


const FavoritePage: FC = () => {

  const dispatch = useDispatch()

  const handleDelete = useCallback((id: number) => {
    console.log({requested: "delete", id})
  }, [])

  const handleChange = useCallback((id: number, newQuery: string, newTitle: string, newOrder: Order, newCount: number) => {
    console.log({requested: "change", id})
  }, [])


  const authState = useIsAuthorized()
  if (authState === "anonymous") {
    return <Redirect to={"/login"}/>
  }

  if (authState === "background") {
    return null
  }

  return (
    <AppLayout header={<AppHeader page={"favorite"}/>}>
      <AppFavorite onDelete={handleDelete} onChange={handleChange}/>

    </AppLayout>
  )
}
export default FavoritePage
