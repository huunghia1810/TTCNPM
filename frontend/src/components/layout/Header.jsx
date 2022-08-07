import moment from 'moment'
import _ from 'lodash'
import React, { useState, useEffect } from 'react'
import 'moment/locale/vi'

import {
  Layout, Menu,
} from 'antd'

import { NavLink, Link } from 'react-router-dom'

//----------import constants---------------

//----------import actions---------------

//import assets
import logoImg from '../../assets/images/logo.png'
import menuImg from '../../assets/images/menu.png'
import cartImg from '../../assets/images/cart.png'

//init info
const { Header } = Layout


const MyHeader = props => {

  useEffect(() => {
  },[])

  //------------------------render section----------------------------------
  //------------------------render section----------------------------------


  return (
    <>
      <Header>
        <div className="header-col header-brand">
          <img src={logoImg} alt='Order system' width={50} height={50} />
          <span className="header-brand-separator">&nbsp;</span>
          {/*<h5>Order System</h5>*/}
        </div>
        <div className="header-col header-nav">
          <Menu mode="horizontal" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1">
              <Link to="/">
                <img src={menuImg} alt='Order system' width={20} height={20} />
                <span> Menu</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/cart">
                <img src={cartImg} alt='Order system' width={20} height={20} />
                <span>My Orders</span>
              </Link>
            </Menu.Item>
          </Menu>
        </div>
      </Header>
    </>
  )
}

export default MyHeader
