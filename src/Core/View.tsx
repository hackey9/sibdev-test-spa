import FavoritePage from "Features/Pages/FavoritePage"
import LoginPage from "Features/Pages/LoginPage"
import SearchPage from "Features/Pages/SearchPage"
import SearchResultsPage from "Features/Pages/SearchResultsPage"
import {AnimateSharedLayout} from "framer-motion"
import React, {FC} from "react"
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom"


const View: FC = () => {

  return (
    <BrowserRouter>
      <AnimateSharedLayout>
        <Switch>
          <Route exact strict path={"/"} render={() => <Redirect to={"/login"}/>}/>
          <Route exact strict path={"/login"} component={LoginPage}/>
          <Route exact strict path={"/search/"} component={SearchPage}/>
          <Route exact strict path={"/search/:query/:count-by-:sort/"} component={SearchResultsPage}/>
          <Route exact strict path={"/favorite/"} component={FavoritePage}/>
          <Route render={() => <Redirect to={"/login"}/>}/>
        </Switch>
      </AnimateSharedLayout>

    </BrowserRouter>
  )
}
export default View
