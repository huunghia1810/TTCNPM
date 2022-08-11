import _ from 'lodash'
import moment from 'moment'

//import react & relations
import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {withRouter, useHistory} from 'react-router-dom'

//import UI libs
import {Card, Col, Row, Switch, Button, Layout, Menu, Typography, List} from 'antd'
import Masonry from 'react-masonry-css'

//import assets

//import components

//import actions
import ActionMenu from '../actions/Menu'

//init info
const { Content } = Layout

const Rating = props => {
const history = useHistory()
  const dispatch = useDispatch()

  return (
    <>
      <Content className='signin'>
        <Row gutter={[24, 0]}>
          <Col span={22} offset={1}>
            Rating
          </Col>

        </Row>
      </Content>
    </>
  )
}

export default Rating
