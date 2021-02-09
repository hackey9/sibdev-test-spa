import FavoriteItem, {FavoriteContainer} from "Features/Blocks/Favorite/Elements/FavoriteItem"
import FavoriteLayout, {FavoriteLayoutHead, FavoriteLayoutList} from "Features/Blocks/Favorite/Elements/FavoriteLayout"
import {AppLayoutAdaptiveContainer} from "Features/Blocks/Layouts/Elements/AppContainerElement"
import SaveRequestModal, {SaveHandler} from "Features/Blocks/Modal/SaveRequestModal"
import Headline from "Features/Elements/Headline/Headline"
import React, {FC, PropsWithChildren, useCallback, useEffect, useMemo, useState} from "react"
import {useDispatch, useSelector} from "react-redux"
import {Favorite} from "Services/BackendAPI/Favorites"
import {loadAsync} from "Store/Favorites"


export type AppFavoriteProps = PropsWithChildren<{
  onDelete: (id: string) => void
  onChange: (favorite: Favorite) => Promise<void>
}>

const AppFavorite: FC<AppFavoriteProps> = ({onDelete, onChange}) => {

  const dispatch = useDispatch()

  const {items, loading} = useSelector(s => s.favorites)

  const favorites = useMemo(() => items ? Object.entries(items).map(([, item]) => item) : null, [items])

  useEffect(() => {
    const task = dispatch(loadAsync())

    return () => task.abort()
  }, [dispatch])

  const [edit, setEdit] = useState<Favorite>()

  const handleChange = useCallback((id: string) => {
    setEdit(items?.[id])
  }, [items])

  const handleCancel = useCallback(() => {
    setEdit(undefined)
  }, [])

  const handleSave: SaveHandler = useCallback(async (id, query, title, order, count) => {
    await onChange?.({id, query, order, count, title})
    setEdit(undefined)
  }, [onChange])

  return (
    <AppLayoutAdaptiveContainer>
      <FavoriteLayout>
        <FavoriteLayoutHead>
          <Headline>Избранное</Headline>
        </FavoriteLayoutHead>
        <FavoriteLayoutList>
          {favorites && (
            <FavoriteContainer>
              {favorites.map(({title, id, count, order, query}, index) => (
                <FavoriteItem
                  title={title}
                  key={id}
                  onChange={handleChange}
                  id={id}
                  onDelete={onDelete}
                  count={count}
                  order={order}
                  query={query}
                  index={index}
                />
              ))}
            </FavoriteContainer>
          )}
          {loading && "Loading..."}
        </FavoriteLayoutList>
      </FavoriteLayout>
      {edit && (
        <SaveRequestModal
          query={edit.query}
          count={edit.count}
          title={edit.title}
          order={edit.order}
          onCancel={handleCancel}
          isEdit
          onSave={handleSave}
          id={edit.id}
        />
      )}
    </AppLayoutAdaptiveContainer>
  )
}
export default AppFavorite
