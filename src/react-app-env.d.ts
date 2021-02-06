/// <reference types="react-scripts" />

declare namespace NodeJS {
  interface ProcessEnv {
    REACT_APP_YOUTUBE_API_KEY?: string
    REACT_APP_YOUTUBE_API_ENDPOINT?: string
  }
}
