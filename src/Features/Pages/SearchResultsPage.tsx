import AppHeader from "Features/Blocks/Header/AppHeader"
import AppLayout from "Features/Blocks/Layouts/AppLayout"
import SaveRequestModal, {SaveHandler} from "Features/Blocks/Modal/SaveRequestModal"
import AppSearchResults, {SearchAsyncHandler} from "Features/Blocks/SearchResults/AppSearchResults"
import React, {FC, useCallback, useEffect, useState} from "react"
import {useDispatch} from "react-redux"
import {RouteComponentProps, useHistory, useParams} from "react-router"
import API from "Services"
import {Order, VideoApiResult} from "Services/YouTubeAPI"
import {addOrUpdateAsync} from "Store/Favorites"


const SearchResultsPage: FC<RouteComponentProps> = () => {

  const dispatch = useDispatch()
  const history = useHistory()
  const {query, order, count} = useThisPageParams()

  const [data, setData] = useState<VideoApiResult>()

  const handleSearch: SearchAsyncHandler = useCallback(async query => {
    const uri = `/search/${encodeURIComponent(query)}/12-by-relevance/`
    history.push(uri)
  }, [history])

  useEffect(() => {
    setData(undefined)
    API.youtube.search(query, count, order).then(result => {
      API.youtube.video(result.ids).then(result => {
        setData(result)
      })
    })
  }, [count, order, query])



  const [modal, setModal] = useState(false)
  const [favorite, setFavorite] = useState(false)

  useEffect(() => {
    setFavorite(false)
  }, [query, order, count])

  const handleFavorite = useCallback(() => {
    !favorite && setModal(true)
  }, [favorite])

  const handleSave: SaveHandler = useCallback(async (_, query, title, order, count) => {
    setModal(false)
    await dispatch(addOrUpdateAsync({query, title, count, order}))
    setFavorite(true)
  }, [dispatch])

  const handleCancel = useCallback(() => {
    setModal(false)
  }, [])

  return (
    <AppLayout header={<AppHeader page={"search"}/>}>
      <AppSearchResults onSearch={handleSearch} onFavorite={handleFavorite} query={query} data={data} favorite={favorite}/>
      {modal && <SaveRequestModal query={query} count={count} onSave={handleSave} onCancel={handleCancel}/>}
    </AppLayout>
  )
}
export default SearchResultsPage


function useThisPageParams() {
  const {query, count, order} = useParams<{ query: string, count: string, order: string }>()

  return {
    query: useQuery(query),
    count: useCount(count),
    order: useOrder(order),
  }
}

function useOrder(order: string): Order {
  switch (order) {
    case "relevance":
    case "date":
    case "rating":
    case "title":
    case "viewCount":
      return order
  }
  return "relevance"
}

function useCount(count: string): number {
  const number = +count

  if (Number.isInteger(number)){
    if (number >= 0 && number <= 50) return number
  }

  return 12
}

function useQuery(query: string) : string {
  return decodeURIComponent(query).trim().replace(/[^a-zа-яёA-ZА-ЯЁ0-9- _.]/,"")
}
