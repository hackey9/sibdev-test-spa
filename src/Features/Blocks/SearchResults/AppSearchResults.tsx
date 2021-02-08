import {AppLayoutAdaptiveContainer} from "Features/Blocks/Layouts/Elements/AppContainerElement"
import SearchInfoElement, {ViewType} from "Features/Blocks/SearchResults/Elements/SearchInfoElement"
import SearchLayoutElement from "Features/Blocks/SearchResults/Elements/SearchLayoutElement"
import SearchWithFavoriteElement, {
  FavoriteHandler,
  SearchAsyncHandler,
} from "Features/Blocks/SearchResults/Elements/SearchWithFavoriteElement"
import VideoElement, {VideoContainer} from "Features/Blocks/SearchResults/Elements/VideoElement"
import Headline from "Features/Elements/Headline/Headline"
import React, {FC, PropsWithChildren, useCallback, useState} from "react"
import {useHistory} from "react-router"
import {VideoApiResult} from "Services/YouTubeAPI"


export type AppSearchResultsProps = PropsWithChildren<{
  query: string
  onSearch: SearchAsyncHandler
  onFavorite: FavoriteHandler
  data?: VideoApiResult
  favorite?: boolean
}>

const AppSearchResults: FC<AppSearchResultsProps> = ({query, onSearch, onFavorite, data, favorite}) => {

  const history = useHistory()
  const [view, setView] = useState<ViewType>("list")

  const handleFavoriteLink = useCallback(() => {
    history.push("/favorite/")
  }, [history])

  return (
    <AppLayoutAdaptiveContainer>

      <SearchLayoutElement
        header={<Headline level={2}>Поиск видео</Headline>}
        search={
          <SearchWithFavoriteElement
            query={query}
            onSearch={onSearch}
            onFavorite={onFavorite}
            favorite={favorite}
            onGoFavorite={handleFavoriteLink}
          />
        }
        info={
          <SearchInfoElement
            query={query}
            view={view}
            onChangeView={setView}
            count={data && data.count}
          />
        }
      >
        {data ? (
          <VideoContainer view={view}>
            {data.videos.map(({id, imageUrl, viewCount, title, channel}) => (
              <VideoElement
                key={id}
                imageUrl={imageUrl}
                title={title}
                channel={channel}
                playCount={viewCount}
              />
            ))}
          </VideoContainer>
        ) : null}

      </SearchLayoutElement>

    </AppLayoutAdaptiveContainer>
  )
}
export default AppSearchResults

export type {SearchAsyncHandler, FavoriteHandler} from "Features/Blocks/SearchResults/Elements/SearchWithFavoriteElement"
