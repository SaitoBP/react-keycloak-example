import React from 'react'

import { BrowserRouter, Route } from 'react-router-dom'

/* Pages */
import MainPage from './MainPage'
import Public from './Public'
import Private from './Private'

const Router = () => {
  return (
    <BrowserRouter>
      <Route exact path='/' component={MainPage} />
      <Route path='/public' component={Public} />
      <Route path='/private' component={Private} />
    </BrowserRouter>
  )
}

export default Router
