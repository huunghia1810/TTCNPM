import _ from 'lodash'

import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Switch, Route, Redirect, BrowserRouter as Router, useHistory} from 'react-router-dom'

//import components
import Main from './components/layout/Main'
import ModalDialogs from './components/ModalDialogs/ModalDialogs'
import PageNotFound from './components/layout/PageNotFound/PageNotFound'

//import assets
import 'antd/dist/antd.css'
import './assets/styles/main.css'
import './assets/styles/responsive.css'

//import actions
import ActionIdentity from './actions/Identity'
import ActionCart from './actions/Cart'
import Admin from './pages/Admin'

const App = props => {
  const dispatch = useDispatch()

  const storeIdentity = useSelector(state => state.Identity) || {}

  useEffect(() => {
    dispatch(ActionIdentity.generateIdentity()) //if not exist slot number -> generate & set in localStorage
    dispatch(ActionCart.generateCart())
  },[])

  useEffect(() => {
    if(!_.isNull(storeIdentity.identityKey)) {
      dispatch(ActionIdentity.getIdentityInfo(storeIdentity.identityKey))
    }
    dispatch(ActionIdentity.generateIdentity()) //if not exist slot number -> generate & set in localStorage
  },[storeIdentity.identityKey])

  return (
    <div className='App'>
      <Router>
        <Switch>
          <Route path='/admin' exact component={Admin}></Route>
          <Route path={'/:entity'} component={Main} />
          <Route path='/' exact component={Main}></Route>
          <Route component={PageNotFound} />
        </Switch>
      </Router>
    </div>
  )
}

export default App
