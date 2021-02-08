import {AppLayoutAdaptiveContainer} from "Features/Blocks/Layouts/Elements/AppContainerElement"
import SearchInfoElement, {ViewType} from "Features/Blocks/SearchResults/Elements/SearchInfoElement"
import SearchLayoutElement from "Features/Blocks/SearchResults/Elements/SearchLayoutElement"
import SearchWithFollowElement, {
  FollowHandler,
  SearchAsyncHandler,
} from "Features/Blocks/SearchResults/Elements/SearchWithFollowElement"
import VideoElement, {VideoContainer} from "Features/Blocks/SearchResults/Elements/VideoElement"
import Headline from "Features/Elements/Headline/Headline"
import React, {FC, PropsWithChildren, useCallback, useState} from "react"
import {useHistory} from "react-router"
import {VideoApiResult} from "Services/YouTubeAPI"


export type AppSearchResultsProps = PropsWithChildren<{
  query: string
  onSearch: SearchAsyncHandler
  onFollow: FollowHandler
  data?: VideoApiResult
  followed?: boolean
}>

const AppSearchResults: FC<AppSearchResultsProps> = ({query, onSearch, onFollow, data, followed}) => {

  const history = useHistory()
  const [view, setView] = useState<ViewType>("list")

  const handleFollowLink = useCallback(() => {
    history.push("/follow/")
  }, [history])

  return (
    <AppLayoutAdaptiveContainer>

      <SearchLayoutElement
        header={<Headline level={2}>Поиск видео</Headline>}
        search={
          <SearchWithFollowElement
            query={query}
            onSearch={onSearch}
            onFollow={onFollow}
            followed={followed}
            onGoFollow={handleFollowLink}
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
        ) : (
          <>TODO: Nothing to show || loading </>
        )}

      </SearchLayoutElement>

    </AppLayoutAdaptiveContainer>
  )
}
export default AppSearchResults

export type {SearchAsyncHandler, FollowHandler} from "Features/Blocks/SearchResults/Elements/SearchWithFollowElement"
