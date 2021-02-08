import FavoriteItem, {FavoriteContainer} from "Features/Blocks/Favorite/Elements/FavoriteItem"
import FavoriteLayout, {FavoriteLayoutHead, FavoriteLayoutList} from "Features/Blocks/Favorite/Elements/FavoriteLayout"
import {AppLayoutAdaptiveContainer} from "Features/Blocks/Layouts/Elements/AppContainerElement"
import Headline from "Features/Elements/Headline/Headline"
import React, {FC, PropsWithChildren, useCallback, useState} from "react"
import {useDispatch} from "react-redux"
import {Order} from "Services/YouTubeAPI"


export type AppFavoriteProps = PropsWithChildren<{
  onDelete: (id: number) => void
  onChange: (id: number, newQuery: string, newTitle: string, newOrder: Order, newCount: number) => void
}>

const AppFavorite: FC<AppFavoriteProps> = ({onDelete, onChange}) => {

  const dispatch = useDispatch()

  const [favorites, setFavorites] = useState<{ id: number, title: string }[]>([{title: "test", id: 5}])

  const handleChange = useCallback((id: number) => {

  }, [])
  const handleDelete = useCallback((id: number) => {

  }, [])

  return (
    <AppLayoutAdaptiveContainer>
      <FavoriteLayout>
        <FavoriteLayoutHead>
          <Headline>Избранное</Headline>
        </FavoriteLayoutHead>
        <FavoriteLayoutList>
          {favorites && (
            <FavoriteContainer>
              {favorites.map(({title, id}) => (
                <FavoriteItem title={title} key={id} onChange={handleChange} id={id}/>
              ))}
            </FavoriteContainer>
          )}
        </FavoriteLayoutList>
      </FavoriteLayout>
    </AppLayoutAdaptiveContainer>
  )
}
export default AppFavorite
