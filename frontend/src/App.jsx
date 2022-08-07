import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Switch, Route, Redirect, BrowserRouter as Router, useHistory} from 'react-router-dom'
import _ from 'lodash'

import Home from './pages/Home'
import ModalDialogs from './components/ModalDialogs/ModalDialogs'
import PageNotFound from './components/layout/PageNotFound/PageNotFound'

import 'antd/dist/antd.css'
import './assets/styles/main.css'
import './assets/styles/responsive.css'


const App = props => {

  return (
    <div className='App'>
      <Router>
        <Switch>
          <Route path='/home' exact component={Home} />
          <Route path='/' exact component={Home}></Route>
          <Route component={PageNotFound} />
        </Switch>
      </Router>
    </div>
  )
}

export default App
