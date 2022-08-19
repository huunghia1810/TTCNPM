import _ from 'lodash'
import moment from 'moment'

//import react & relations
import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {withRouter, useHistory} from 'react-router-dom'

//import UI libs
import {Col, Row, Descriptions, Card, Button} from 'antd'

//import assets

//import components

//import actions
import ActionMenu from '../actions/Menu'
import ActionOrder from '../actions/Order'

//import socket
import feathersClient from './../feathersClient'

//init info
import io from 'socket.io-client'

var socket = io(process.env.REACT_APP_API_BASE_URL)
socket.emit('create', 'authentication', {
  strategy: 'local',
  email: 'huunghia1810@gmail.com',
  password: '123456'
}, function(error, authResult) {
  console.log(error, authResult)
  // authResult will be {"accessToken": "your token", "user": user }
  // You can now send authenticated messages to the server
});


const MyOrder = props => {
  const history = useHistory()
  const dispatch = useDispatch()

  //state
  const [htmlOrderInfo, setHtmlOrderInfo] = useState(null)

  //store
  const storeMenu = useSelector(state => state.Menu) || {}
  const storeOrder = useSelector(state => state.Order) || {}

  useEffect(() => {
    socket.on('orders patched', message => {
      handleListenChangeOrders(message)
    })
    
    /*feathersClient.service('orders')
      .on('patched', message => {
        debugger
      })*/
  }, [])

  useEffect(() => {
    handleRenderOrderInfo()
  }, [storeOrder, storeMenu])

  //handlers
  const handleRenderOrderInfo = () => {
    if(Object.keys(storeOrder.orderInfo).length
      && Object.keys(storeMenu.configs).length) {
      let { cartInfo, status, slotNumber } = storeOrder.orderInfo

      cartInfo = JSON.parse(cartInfo)

      const { items } = cartInfo
      let numTotal = 0
      let htmlCartInfo = items.map((item, index) => {
        const curItemInfo = ActionMenu.getMenuItemById(item.id, storeMenu.configs)

        //calculate total
        let curTotalQuantity = 0
        if(Array.isArray(item.quantity)) {
          item.quantity.map(q => {
            curTotalQuantity += parseInt(q.quantity)
          })
        } else {
          curTotalQuantity += parseInt(item.quantity)
        }
        numTotal += curItemInfo.price * curTotalQuantity

        return (
          <Descriptions className="cart-info-item" key={index}>
            <Descriptions.Item label="Name" span={3}>
              <span style={{color: '#1890ff'}}>{curItemInfo.name}</span>
            </Descriptions.Item>
            <Descriptions.Item label="Price" span={3}>
              {curItemInfo.price.toLocaleString()}
            </Descriptions.Item>
            {
              Array.isArray(item.quantity) ? (
                <Descriptions.Item label="Option(s)" span={3}>
                  {
                    item.quantity.map((q, qIndex) => {
                      const curOptions = curItemInfo.options.find(op => op.id == q.id)
                      return (
                        <div key={qIndex}><span>{curOptions.name}:</span> <span className="text-danger">{q.quantity}</span>&nbsp;&nbsp;</div>
                      )
                    })
                  }
                </Descriptions.Item>
              ) : (
                <Descriptions.Item label="Quantity" span={3}>
                  <span className="text-danger">{item.quantity}</span>
                </Descriptions.Item>
              )
            }
            {
              item.note && (
                <Descriptions.Item label="Note" span={3}>
                  {item.note}
                </Descriptions.Item>
              )
            }
          </Descriptions>
        )
      })

      htmlCartInfo.push(
        <Descriptions key="total">
          <Descriptions.Item label="Total (VND)" span={3}>
            <h3 style={{color: '#1890ff'}}>{numTotal.toLocaleString()}</h3>
          </Descriptions.Item>
          <Descriptions.Item label="Status" span={3}>
            <h3 className="text-danger">{status}</h3>
          </Descriptions.Item>
        </Descriptions>
      )

      setHtmlOrderInfo(htmlCartInfo)
    }
  }
  const handleListenChangeOrders = message => {
    console.log('handleListenChangeOrders', message, storeOrder.orderInfo)
    if(Object.keys(storeOrder.orderInfo).length) {
      let { slotNumber } = storeOrder.orderInfo
      if(message.slotNumber == slotNumber) {
        //handleRenderOrderInfo()
        dispatch(ActionOrder.setOrder(message))
      }
    }

  }

  return (
    !_.isNull(htmlOrderInfo) ? (
      <Row gutter={[24, 0]}>
        <Col xs={{ span: 22, offset: 1 }}
             lg={{ span: 12, offset: 6}}
             md={{ span: 16, offset: 4 }}
             style={{marginBottom: 30}}
        >
          <Card
            className="header-solid h-full cart-list"
            bordered={false}
            title={<h6 className="font-semibold m-0">Cart Info</h6>}
            bodyStyle={{ paddingTop: "0" }}
          >
            {htmlOrderInfo}
          </Card>
        </Col>
      </Row>
    ) : (
      <Row gutter={[24, 0]}>
        <Col xs={{ span: 22, offset: 1 }}
             lg={{ span: 22, offset: 1 }}
             md={{ span: 22, offset: 1 }}
        >
          <div style={{textAlign: 'center', margin: 50}}>
            <h2>Not have any order!</h2>
            <Button type='primary' onClick={() => history.push('/')}>Go Home</Button>
          </div>
        </Col>
      </Row>
      )

  )
}

export default MyOrder
