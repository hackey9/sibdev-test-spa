import {AppLayoutAdaptiveContainer} from "Features/Blocks/Layouts/Elements/AppContainerElement"
import BigSearchLayout, {BigSearchLayoutHeader} from "Features/Blocks/Search/Elements/BigSearchLayout"
import Headline from "Features/Elements/Headline/Headline"
import Search from "Features/Elements/Search/Search"
import React, {FC, PropsWithChildren, useCallback, useState} from "react"


export type AppSearchProps = PropsWithChildren<{
  onSearch?: (query: string) => void
}>

const AppSearch: FC<AppSearchProps> = ({onSearch}) => {

  const [text, setText] = useState("")

  const handleSearch = useCallback(() => {
    onSearch?.(text)
  }, [onSearch, text])

  return (
    <AppLayoutAdaptiveContainer>
      <BigSearchLayout>
        <BigSearchLayoutHeader>
          <Headline>Поиск видео</Headline>
        </BigSearchLayoutHeader>
        <Search onChange={setText} value={text} onClick={handleSearch} placeholder={"Что хотите посмотреть?"}/>
      </BigSearchLayout>
    </AppLayoutAdaptiveContainer>
  )
}
export default AppSearch
