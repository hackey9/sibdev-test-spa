import {AppLayoutAdaptiveContainer} from "Features/Blocks/Layouts/Elements/AppContainerElement"
import SearchInfoElement, {ViewType} from "Features/Blocks/SearchResults/Elements/SearchInfoElement"
import SearchLayoutElement from "Features/Blocks/SearchResults/Elements/SearchLayoutElement"
import SearchWithFollowElement, {
  FollowHandler,
  SearchAsyncHandler,
} from "Features/Blocks/SearchResults/Elements/SearchWithFollowElement"
import VideoElement, {VideoContainer} from "Features/Blocks/SearchResults/Elements/VideoElement"
import Headline from "Features/Elements/Headline/Headline"
import React, {FC, PropsWithChildren, useState} from "react"
import {VideoApiResult} from "Services/YouTubeAPI"


export type AppSearchResultsProps = PropsWithChildren<{
  query: string
  onSearch: SearchAsyncHandler
  onFollow: FollowHandler
  data?: VideoApiResult
}>

const AppSearchResults: FC<AppSearchResultsProps> = ({query, onSearch, onFollow, data}) => {

  const [view, setView] = useState<ViewType>("list")

  return (
    <AppLayoutAdaptiveContainer>

      <SearchLayoutElement
        header={<Headline level={2}>Поиск видео</Headline>}
        search={
          <SearchWithFollowElement onSearch={onSearch} onFollow={onFollow}/>
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
          <>Nothing to show</>
        )}

      </SearchLayoutElement>

    </AppLayoutAdaptiveContainer>
  )
}
export default AppSearchResults

export type {SearchAsyncHandler, FollowHandler} from "Features/Blocks/SearchResults/Elements/SearchWithFollowElement"
