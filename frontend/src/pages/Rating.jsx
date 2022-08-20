import _ from 'lodash'
import moment from 'moment'

//import react & relations
import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { useHistory } from 'react-router-dom'

//import UI libs
import {FrownOutlined, MehOutlined, SendOutlined, SmileOutlined } from '@ant-design/icons'
import {Col, Row, Layout, Typography, Card, List, Rate, Input, Button, Form, Descriptions} from 'antd'

//import components
import NotificationDialogs from '../components/NotificationDialogs/NotificationDialogs'

//import constants
import * as constantOrder from '../constants/Order'

//import assets
import { feedbackImg } from '../assets/images'
import './../assets/styles/feedback.css'

//import actions
import ActionMenu from '../actions/Menu'
import ActionOrder from '../actions/Order'
import ActionRating from '../actions/Rating'

//init info
const { ORDER_STATUS } = constantOrder
const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:SS'
const [errorNotificationDialogs, successNotificationDialogs] = NotificationDialogs(['error', 'success'])
const customIcons = {
  1: <FrownOutlined size={20} />,
  2: <FrownOutlined />,
  3: <MehOutlined />,
  4: <SmileOutlined />,
  5: <SmileOutlined />,
}
const { TextArea } = Input
const { Content } = Layout
const { Title, Text } = Typography

const Rating = props => {
  const history = useHistory()
  const dispatch = useDispatch()
  const [form] = Form.useForm()

  //state
  const [onSubmit, setOnSubmit] = useState(false)
  const [orderInfo, setOrderInfo] = useState({})
  const [arrOrderItems, setArrOrderItems] = useState([])
  const [hasAccessRating, setFlagHasAccessRating] = useState(false)
  const [total, setTotal] = useState(0)

  //store
  const storeMenu = useSelector(state => state.Menu) || {}
  const storeOrder = useSelector(state => state.Order) || {}

  useEffect(() => {
    handleCheckAccessRating()
    handleSetStateOrderItems()
  }, [])

  useEffect(() => {
    handleCheckAccessRating()
    handleSetStateOrderItems()
  }, [storeOrder, storeMenu])
  
  useEffect(() => {
    handleGetOrderInfo()
  }, [arrOrderItems])

  //handlers
  const handleGetOrderInfo = () => {
    if(Object.keys(storeOrder.orderInfo).length
      && Object.keys(storeMenu.configs).length) {
      let { cartInfo } = storeOrder.orderInfo
      cartInfo = JSON.parse(cartInfo)

      const { items } = cartInfo

      let numTotal = 0
      items.map(item => {
        const curItemInfo = ActionMenu.getMenuItemById(item.id, storeMenu.configs)
        let curTotalQuantity = 0

        if(Array.isArray(item.quantity)) {
          item.quantity.map(q => {
            curTotalQuantity += parseInt(q.quantity)
          })
        } else {
          curTotalQuantity += parseInt(item.quantity)
        }
        numTotal += curItemInfo.price * curTotalQuantity
      })

      setTotal(numTotal)
    }
  }
  const handleCheckAccessRating = () => {
    const orderStatus = _.get(storeOrder, 'orderInfo.status') || undefined
    if(orderStatus === ORDER_STATUS.SERVED
      && Object.keys(storeMenu.configs).length) {
      setFlagHasAccessRating(true)
    } else {
      setFlagHasAccessRating(false)
    }
  }
  const handleSetStateOrderItems = () => {
    if(Object.keys(storeOrder.orderInfo).length
      && Object.keys(storeMenu.configs).length) {
      setOrderInfo(storeOrder.orderInfo)
      let { cartInfo } = storeOrder.orderInfo

      cartInfo = JSON.parse(cartInfo)
      setArrOrderItems(cartInfo.items || [])
    }
  }
  const handleSubmitFeedbackForm = values => {
    const id = _.get(storeOrder, 'orderInfo.id') || undefined
    if(id) {
      setOnSubmit(true)
      const dataPrepared = {
        ...values,
        orderId: id,
      }
      debugger
      //dispatch(ActionRating.sendFeedback(dataPrepared, handleSubmitFeedbackFormDone.bind(this)))
    } else {
      alert(`Not found any order!`)
    }
  }

  const handleSubmitFeedbackFormFail = errorInfo => {
    console.log('Failed:', errorInfo)
  }
  const handleSubmitFeedbackFormDone = (status = false, data) => {
    if(status) { //success
      debugger
      //dispatch(ActionOrder.setOrder(storeOrder.orderInfo))

      successNotificationDialogs.show({
        message: 'Send feedback successful',
        description: `Thank you about valuable feedback`,
        placement: 'top',
        duration: 1.5,
      })

      setTimeout(() => history.push('/'), 1550)
    } else  {
      errorNotificationDialogs.show({
        message: 'Send feedback fail',
        description: `${data.message}`,
        placement: 'top',
        duration: 1.5,
      })
    }
    setOnSubmit(false)
  }
  
  const handleRenderOrderItem = item => {
    const curItemInfo = ActionMenu.getMenuItemById(item.id, storeMenu.configs)
    //render quantity
    let curTotalQuantity = 0
    if(Array.isArray(item.quantity)) {
      item.quantity.map(q => {
        curTotalQuantity += parseInt(q.quantity)
      })
    } else {
      curTotalQuantity += parseInt(item.quantity)
    }

    return (
      <List.Item>
        <Row style={{ width: '100%' }} gutter={[16, 0]}>
          {/*<Col span={4}>
            <div className='img-food-box'>
              <img
                className='img-food'
                alt=''
                src='https://thegangs.onha.vn/images/repo/Tomahawk%20Beef%20890k%20(%201kg%20).jpg'
              />
            </div>
          </Col>*/}
          <Col span={20}>
            <Title level={5}>{curItemInfo.name}</Title>
            <div style={{paddingLeft: 20}}>
              {
                curItemInfo.description && (
                  <Text type='secondary'>
                    {curItemInfo.description}
                  </Text>
                )
              }
              <div style={{marginTop: 10}} className='detail-food'>
                <Text level={5} span={5}>Price: {curItemInfo.price.toLocaleString()}</Text>
              </div>
              <div className='detail-food'>
                {
                  Array.isArray(item.quantity) ? (
                    <div>
                      {
                        item.quantity.map((q, qIndex) => {
                          const curOptions = curItemInfo.options.find(op => op.id == q.id)
                          return (

                            <div key={qIndex}>
                              <Text level={5} span={5}>{curOptions.name}: <span className="text-danger">{q.quantity}</span></Text>
                            </div>
                          )
                        })
                      }
                    </div>
                  ) : (
                    <Text level={5} span={5}>Quantity: {item.quantity}</Text>
                  )
                }
              </div>
            </div>
          </Col>
        </Row>
      </List.Item>
    )
  }

  //render
  return hasAccessRating && (
    <>
      <Content className='feedback'>
        <Row gutter={[24, 0]}>
          <Col xs={{ span: 24}}
               lg={{ span: 8, }}
               md={{ span: 24 }}
          >
            <div className='col-feedback'>
              <Title>
                Your feedback will be improved my service. Thanks a lot!
              </Title>
              <div>
                <img src={feedbackImg} alt='feedback system' />
              </div>
            </div>
          </Col>
          <Col xs={{ span: 24}}
               lg={{ span: 16}}
               md={{ span: 24}}
          >
            <div className='form-feedback'>
              <div className='card-feedback'>
                <Title level={3}>Order Info</Title>
                <div className='card-order'>
                  <Title style={{color: '#1890ff'}} level={3}><strong>Order #{orderInfo.id}</strong></Title>
                  <Text type='secondary'>{orderInfo.createdAt ? moment(orderInfo.createdAt).format(DATE_TIME_FORMAT) : null}</Text>
                  <List
                    itemLayout='horizontal'
                    dataSource={arrOrderItems}
                    renderItem={item => handleRenderOrderItem(item)}
                  />
                  <div className='detail-food'>
                    <Text type='secondary'>Total Item(s): {arrOrderItems.length || 0}</Text>
                    <Title style={{color: '#1890ff'}} level={5}>{total ? total.toLocaleString() : 0} VND</Title>
                  </div>
                </div>
                <Title level={4}>
                  How do you feel about us?
                </Title>
                <Form form={form} name='validate_other'
                      onFinish={handleSubmitFeedbackForm}
                      onFinishFailed={handleSubmitFeedbackFormFail}
                >
                  <Form.Item name='rate' rules={[{ required: true, message: 'Please select your rate!' }]}>
                    <Rate
                      style={{ fontSize: '50px' }}
                      character={({ index }) => customIcons[index + 1]}
                    />
                  </Form.Item>
                  <Form.Item name='note'>
                    <TextArea
                      style={{ marginTop: '10px', marginBottom: '20px' }}
                      rows={4}
                      placeholder='Type your feedback...'
                    />
                  </Form.Item>
                  <Form.Item>
                    <Button type='primary' icon={<SendOutlined />} shape='round' htmlType='submit' block>
                      Send Feedback
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </div>
          </Col>
        </Row>
      </Content>
    </>
  )
}

export default Rating
