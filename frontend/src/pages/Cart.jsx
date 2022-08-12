import _ from 'lodash'
import moment from 'moment'

//import react & relations
import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link, useHistory} from 'react-router-dom'

//import UI libs
import {Card, Col, Row, Button, Descriptions, Typography, Form, Input, Switch} from 'antd'

//import assets
import avatarDummyImg from "../assets/images/avatar-dummy.jpg";

//import components

//import actions
import ActionMenu from '../actions/Menu'
import ActionCart from '../actions/Cart'

//init info
const { Title } = Typography;


const Home = props => {
  const history = useHistory()
  const dispatch = useDispatch()

  //state
  const [htmlCartItem, setHtmlCartItem] = useState(null)
  const [total, setTotal] = useState(0)

  //store
  const storeMenu = useSelector(state => state.Menu) || {}
  const storeCart = useSelector(state => state.Cart) || {}

  useEffect(() => {
    if(Object.keys(storeMenu.configs).length) {
      handleRender()
    }
  }, [])

  useEffect(() => {
    if(Object.keys(storeMenu.configs).length) {
      handleRender()
    }
  }, [storeMenu, storeCart])

  //handlers
  const handleRemoveItem = item => {
    const {id} = item
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
              title={<h6 className="font-semibold m-0">Cart Information</h6>}
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

          <Col xs={{ span: 22, offset: 1 }}
               lg={{ span: 7, offset: 0}}
               md={{ span: 22, offset: 1 }}
          >
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
            >
              <Title className="mb-15">Sign In</Title>
              <Title className="font-regular text-muted" level={5}>
                Enter your email and password to sign in
              </Title>
              <Form
                layout="vertical"
                className="row-col"
              >
                <Form.Item
                  className="username"
                  label="Email"
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Please input your email!",
                    },
                  ]}
                >
                  <Input placeholder="Email" />
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{ width: "100%" }}
                  >
                    SIGN IN
                  </Button>
                </Form.Item>
              </Form>
            </Card>
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
