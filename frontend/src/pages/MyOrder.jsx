import _ from 'lodash'
import moment from 'moment'

//import react & relations
import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {withRouter, useHistory} from 'react-router-dom'

//import UI libs
import {Card, Col, Row, Button, Input, Radio, InputNumber, Space, Typography} from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faArrowLeftLong} from '@fortawesome/free-solid-svg-icons'

//import assets

//import components

//import actions
import ActionCart from '../actions/Cart'

//init info

const MyOrder = props => {
  const history = useHistory()
  const dispatch = useDispatch()

  return (
    <>
        <Row gutter={[24, 0]}>
          <Col xs={{ span: 22, offset: 1 }}
               lg={{ span: 12, offset: 6}}
               md={{ span: 16, offset: 4 }}
          >
            My order......
          </Col>
        </Row>


    </>
  )
}

export default MyOrder
