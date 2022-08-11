import moment from 'moment'
import _ from 'lodash'
import React, { useState, useEffect } from 'react'
import 'moment/locale/vi'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCartShopping} from '@fortawesome/free-solid-svg-icons'
import {
  Avatar,
  Badge,
  Breadcrumb, Button,
  Col, Drawer, Dropdown, Input,
  Layout, List, Menu, Row, Switch,
} from 'antd'

import { NavLink, Link } from 'react-router-dom'

//----------import constants---------------

//----------import actions---------------

//import assets
import logoImg from '../../assets/images/logo.png'
import menuImg from '../../assets/images/menu.png'

//init info
const { Header } = Layout


const MyHeader = props => {

  useEffect(() => {
  },[])

  //------------------------render section----------------------------------
  //------------------------render section----------------------------------

  const data = [
    {
      title: "New message from Sophie",
      description: <>2 days ago</>,
    }
  ];

  const menu = (
    <List
      min-width="100%"
      className="header-notifications-dropdown "
      itemLayout="horizontal"
      dataSource={data}
      renderItem={(item) => (
        <List.Item>
          <List.Item.Meta
            title={item.title}
            description={item.description}
          />
        </List.Item>
      )}
    />
  );


  return (
    <>
      <Header>
        <div className="header-col header-brand">
          <img src={logoImg} alt='Order system' width={50} height={50} />
          <span className="header-brand-separator">&nbsp;</span>
        </div>
        <Row style={{width: '100%'}} gutter={[24, 0]}>
          <Col className='header-col header-nav' span={24} md={6}>
            <Link to="/">
              <img src={menuImg} alt='Order system' width={20} height={20} />
              <span> Menu</span>
            </Link>
          </Col>
          <Col span={24} md={18} style={{textAlign: 'right'}} className="header-control">
            <Link to="/cart">
              <Badge size="small" count={4}>
                <FontAwesomeIcon style={{fontSize: 25, color: '#606c38'}} icon={faCartShopping} />
              </Badge>
            </Link>
          </Col>
        </Row>
      </Header>
    </>
  )
}

export default MyHeader
