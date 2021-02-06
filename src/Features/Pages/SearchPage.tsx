import AppHeader from "Features/Blocks/Header/AppHeader"
import AppLayout from "Features/Blocks/Layouts/AppLayout"
import React, {FC} from "react"


const SearchPage: FC = () => {

  const page = "search"

  return (
    <AppLayout
      header={<AppHeader page={page}/>}
      //children={<AppSearch/>}
    />
  )
}
export default SearchPage
