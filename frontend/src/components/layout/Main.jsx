import _ from 'lodash'

import React, { useState, useEffect } from 'react'
import {useLocation, useParams} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'

import {Layout} from 'antd'
import Header from './Header'
import Footer from './Footer'

//----------import pages---------------
import Home from './../../pages/Home'
import Cart from './../../pages/Cart'
import PageNotFound from './../layout/PageNotFound/PageNotFound'

const { Content } = Layout

const Main = props => {
  let { entity, action } = useParams()

  const [childComponent, setChildComponent] = useState(false)

  useEffect(() => {
    handleUpdateMainContent()
  },[])

  useEffect(() => {
    handleUpdateMainContent()
  },[entity, action])

  const handleUpdateMainContent = () => {
    let mainComponent = null
    entity = _.isUndefined(entity) ? 'home' : entity;
    switch (entity) {
      case 'home':
        mainComponent = <Home></Home>
        break
      case 'cart':
        mainComponent = <Cart></Cart>
        break
      default:
        mainComponent = <PageNotFound></PageNotFound>
        break
    }
    if(mainComponent === null) {
      mainComponent = <PageNotFound></PageNotFound>
    }
    setChildComponent(mainComponent)
  }
  
  return (
    <>
      <Layout className='layout-default layout-signin'>
        <Header />
        <Content className='content-ant'>
          {childComponent || ''}
        </Content>
        <Footer />
      </Layout>
    </>
  )
}

export default Main