import {useIsAuthorized} from "Core/useIsAuthorized"
import AppFavorite from "Features/Blocks/Favorite/AppFavorite"
import AppHeader from "Features/Blocks/Header/AppHeader"
import AppLayout from "Features/Blocks/Layouts/AppLayout"
import React, {FC, useCallback} from "react"
import {useDispatch} from "react-redux"
import {Redirect} from "react-router-dom"
import {Favorite} from "Services/BackendAPI/Favorites"
import {addOrUpdateAsync, removeAsync} from "Store/Favorites"


const FavoritePage: FC = () => {

  const dispatch = useDispatch()

  const handleDelete = useCallback((id: string) => {
    dispatch(removeAsync({id}))
  }, [dispatch])

  const handleChange = useCallback(async (favorite: Favorite) => {
    await dispatch(addOrUpdateAsync(favorite))
  }, [dispatch])


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
