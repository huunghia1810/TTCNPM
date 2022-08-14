import _ from 'lodash'
import moment from 'moment'

//import react & relations
import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link, useHistory} from 'react-router-dom'

//import UI libs
import {Card, Col, Row, Button, Descriptions, Typography, Form, Input, Select} from 'antd'

//import assets
import avatarDummyImg from "../assets/images/avatar-dummy.jpg";

//import components
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner'
import NotificationDialogs from '../components/NotificationDialogs/NotificationDialogs'

//import actions
import ActionMenu from '../actions/Menu'
import ActionCart from '../actions/Cart'
import Order from '../actions/Order'


//import constants
import * as constantOrder from '../constants/Order'

//init info
const { Title } = Typography
const { Option } = Select
const { ORDER_STATUS } = constantOrder
const [errorNotificationDialogs, successNotificationDialogs] = NotificationDialogs(['error', 'success'])

const Home = props => {
  const history = useHistory()
  const dispatch = useDispatch()
  const [form] = Form.useForm()

  //state
  const [htmlCartItem, setHtmlCartItem] = useState(null)
  const [total, setTotal] = useState(0)
  const [onSubmit, setOnSubmit] = useState(false)
  const [userInfo, setUserInfo] = useState({
    fullName: '',
    phone: '',
  })

  //store
  const storeMenu = useSelector(state => state.Menu) || {}
  const storeCart = useSelector(state => state.Cart) || {}

  useEffect(() => {
    if(Object.keys(storeMenu.configs).length) {
      handleRender()
    }
    handleDefaultUserInfo()
  }, [])

  useEffect(() => {
    if(Object.keys(storeMenu.configs).length) {
      handleRender()
    }
  }, [storeMenu, storeCart])

  //handlers
  const onSubmitForm = async values => {
    setOnSubmit(true)
    const dataPrepared = values
    debugger
    dispatch(Order.sendOrder(dataPrepared, handleSubmitDone.bind(this)))
  }
  const onSubmitFormFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }
  const handleSubmitDone = (status = false, data) => {
    if(status) { //success
      const cartInfo = {...storeCart.info}
      cartInfo.status = ORDER_STATUS.NEW
      dispatch(ActionCart.setCart(cartInfo))
    } else { //fail
      errorNotificationDialogs.show({
        message: 'Submit fail',
        description: `${data.message}`,
        placement: 'top',
        duration: 1.5,
      })
    }
    setOnSubmit(false)
  }

  const handleDefaultUserInfo = () => {
    try {
      const defaultFormValue = {}
      defaultFormValue.phone = defaultFormValue.phone.substr(2)

      form.setFieldsValue(defaultFormValue)
    } catch (e) {}
  }
  const handleRemoveItem = item => {
    let items = _.get(storeCart, 'info.items') || []
    items = items.filter(i => i.id != item.id)
    try {
      const cartInfo = {...storeCart.info}
      cartInfo.items = [...items]
      dispatch(ActionCart.setCart(cartInfo))
    } catch (e) {
      console.log(`handleRemoveItem error: ${e.message}`)
    }
  }
  const calculateTotal = () => {
    let numTotal = 0
    const items = _.get(storeCart, 'info.items') || []
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
  const handleRender = () => {
    calculateTotal()
    handleRenderCartItem()
  }
  const handleRenderCartItem = () => {
    const items = _.get(storeCart, 'info.items') || []

    const tmpHtml = items.map((item, index) => {
      const curItemInfo = ActionMenu.getMenuItemById(item.id, storeMenu.configs)

      return (
        <Col span={24} key={index}>
          <Card className="card-billing-info cart-item" bordered="false">
            <div className="col-info">
              <Descriptions title={curItemInfo.name}>
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
                        item.quantity.map(q => {
                          const curOptions = curItemInfo.options.find(op => op.id == q.id)
                          return (
                            <div key={index}><span>{curOptions.name}:</span> <span className="text-danger">{q.quantity}</span></div>
                          )
                        })
                      }
                    </Descriptions.Item>
                  ) : (
                    <Descriptions.Item label="Quantity" span={3}>
                      <p className="text-danger">{item.quantity}</p>
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
            </div>
            <div className="col-action">
              <Button type="link" danger onClick={() => handleRemoveItem(item)}>
                REMOVE
              </Button>
            </div>
          </Card>
        </Col>
      )
    })

    setHtmlCartItem(tmpHtml)
  }

  //render
  const prefixSelector = (
    <Form.Item name="phonePrefix" noStyle>
      <Select disabled={true} style={{ width: 70 }}>
        <Option value="84">+84</Option>
      </Select>
    </Form.Item>
  )
  const htmlSpin = onSubmit ? <LoadingSpinner/> : null

  return (_.get(storeCart, 'info.items') || []).length ? (
    <>
        <Row gutter={[24, 0]}>
          <Col xs={{ span: 22, offset: 1 }}
                 lg={{ span: 15, offset: 1 }}
                 md={{ span: 22, offset: 1 }}
            >
            <Card
              className="header-solid h-full cart-list"
              bordered={false}
              title={<h6 className="font-semibold m-0">Cart Info</h6>}
              bodyStyle={{ paddingTop: "0" }}
            >
              <Row gutter={[24, 24]}>
                {htmlCartItem}
                <Col className="cart-total-content" span={24}>
                  <Card className="card-billing-info cart-item cart-item-right" bordered="false">
                    <div className="col-info">
                      <Descriptions className="text-danger" title={'Total: ' + total.toLocaleString() + ' VND'}>
                      </Descriptions>
                    </div>
                  </Card>
                </Col>
              </Row>
            </Card>
          </Col>

          <Col className="tabled" xs={{ span: 22, offset: 1 }}
               lg={{ span: 7, offset: 0}}
               md={{ span: 22, offset: 1 }}
          >
            {htmlSpin}
            <Title className="mb-15" level={4}>User info</Title>
            {/*<Title className="font-regular text-muted" level={5}>
              Enter your email and password to sign in
            </Title>*/}
            <Form
              form={form}
              name='UserInfoForm'
              layout="vertical"
              className="row-col"
              initialValues={{ ...userInfo, phonePrefix: '84' }}
              onFinish={onSubmitForm}
              onFinishFailed={onSubmitFormFailed}
            >
              <Form.Item
                name='fullName'
                rules={[
                  { required: true, message: 'Please input your name!' },
                  { pattern: /^[A-Za-z0-9 ]+$/, message: 'Full Name is invalid' },
                  { min: 3, message: 'Length of Full name must be >= 3 characters' },
                ]}
              >
                <Input disabled={onSubmit} placeholder='Full Name' />
              </Form.Item>

              <Form.Item
                name="phone"
                rules={[
                  { min: 6, max: 8, message: 'Length of Phone number from 8 to 10 characters' },
                  { pattern: /^\d*$/, message: 'Phone number must be numeric!' },
                ]}
              >
                <Input disabled={onSubmit} addonBefore={prefixSelector}/>
              </Form.Item>

              <Form.Item>
                <Button
                  disabled={onSubmit}
                  style={{ width: '100px' }}
                  type='primary'
                  htmlType='submit'
                >
                  Save
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
    </>
  ) : (
    <Row gutter={[24, 0]}>
      <Col xs={{ span: 22, offset: 1 }}
           lg={{ span: 22, offset: 1 }}
           md={{ span: 22, offset: 1 }}
      >
        <div style={{textAlign: 'center', margin: 50}}>
          <h2>Not found any items</h2>
          <Button type='primary' onClick={() => history.push('/')}>Go Home</Button>
        </div>
      </Col>
    </Row>
  )
}

export default Home
