import clsx from "clsx"
import {ViewType} from "Features/Blocks/SearchResults/Elements/SearchInfoElement"
import React, {FC, PropsWithChildren} from "react"
import css from "./VideoElement.module.scss"



export type VideoElementProps = PropsWithChildren<{
  imageUrl: string
  title: string
  channel: string
  playCount: number
}>

const VideoElement: FC<VideoElementProps> = ({imageUrl, title, channel, playCount}) => {

  return (
    <div className={css.item}>
      <div className={css.image} style={{backgroundImage: `url("${imageUrl}")`}}/>
      <div className={css.title}>{title}</div>
      <div className={css.data}>
        <span>{channel}</span>
        <span>{playCount}</span>
      </div>
    </div>
  )
}
export default VideoElement


export type VideoContainerProps = PropsWithChildren<{
  view: ViewType
}>

export const VideoContainer: FC<VideoContainerProps> = ({children, view}) => {

  return (
    <div className={clsx(css.container, {
      [css.grid]: view === "grid",
      [css.list]: view === "list",
    })}>
      {children}
    </div>
  )
}
