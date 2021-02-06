import doNothing from "Utils/doNothing"


const ep = process.env.REACT_APP_YOUTUBE_API_ENDPOINT as string
const key = process.env.REACT_APP_YOUTUBE_API_KEY as string

const API = {
  search: async (query: string, count: number, order: Order = "relevance", signal?: AbortSignal): Promise<SearchApiResult> => {

    if (count === 0) return {count: 0, total: 0, ids: []}
    if (count > 50) throw new Error("Requested count of data cannot be {$gt: 50}")
    if (query.length === 0) throw new Error("Cannot request empty string")

    const body = new URLSearchParams({
      key,
      q: query,
      type: "video",
      maxResults: count.toString(),
      order,
    })
    const response = await fetch(ep + "search?" + body.toString(), {signal})
    const json = await response.json()

    if (isYoutubeApiSearchResponse(json)) {
      return {
        total: json.pageInfo.totalResults,
        count: json.pageInfo.resultsPerPage,
        ids: json.items.map(item => item.id.videoId),
      }
    }
    throw new Error("Youtube API error (search)")
  },
  video: async (ids: string[], signal?: AbortSignal): Promise<VideoApiResult> => {
    const body = new URLSearchParams({
      key,
      id: ids.join(","),
      part: "statistics,snippet,id",
    })
    const response = await fetch(ep + "videos?" + body.toString(), {signal})
    const json = await response.json()

    if (isYoutubeApiVideosResponse(json)) {
      return {
        count: json.pageInfo.totalResults,
        videos: json.items.map(video => ({
          id: video.id,
          title: video.snippet.title,
          channel: video.snippet.channelTitle,
          imageUrl: video.snippet.thumbnails.default.url,
          viewCount: +video.statistics.viewCount,
        })),
      }
    }
    throw new Error()
  },
}
export default API


type YoutubeApiSearchResponse = {
  pageInfo: {
    totalResults: number
    resultsPerPage: number
  }
  items: Array<{
    id: {
      videoId: string
    }
  }>
}

type YoutubeApiVideosResponse = {
  pageInfo: {
    totalResults: number
    resultsPerPage: number
  }
  items: Array<{
    id: string
    snippet: {
      channelTitle: string
      title: string
      thumbnails: {
        default: {
          url: string
        }
      }
    }
    statistics: {
      viewCount: number
    }
  }>
}

function isYoutubeApiSearchResponse(json: any): json is YoutubeApiSearchResponse {

  if (typeof json !== "object") return false
  if (!Array.isArray(json.items)) return false

  doNothing() // ide try to change my code

  return true
}

function isYoutubeApiVideosResponse(json: any): json is YoutubeApiVideosResponse {
  return isYoutubeApiSearchResponse(json) // FIXME
}

export type SearchApiResult = {
  total: number
  count: number
  ids: string[]
}

export type VideoApiResult = {
  count: number
  videos: Array<{
    id: string
    title: string
    channel: string
    viewCount: number
    imageUrl: string
  }>
}

export type Order = "date" | "rating" | "relevance" | "title" | "viewCount"
