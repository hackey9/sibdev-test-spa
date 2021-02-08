import * as backend from "Services/BackendAPI"
import * as youtube from "Services/YouTubeAPI"
import * as token from "Services/AuthToken"

const API = {
  backend,
  youtube,
  token
}
export default API


export type Api = typeof API
