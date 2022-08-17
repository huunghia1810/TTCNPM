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

//import constants
import * as constantOrder from '../constants/Order'

//import components
import NotificationDialogs from '../components/NotificationDialogs/NotificationDialogs'

//import actions
import ActionCart from '../actions/Cart'

//init info
const { Title } = Typography
const { TextArea } = Input
const { ORDER_STATUS } = constantOrder
const [successNotificationDialogs] = NotificationDialogs(['success'])

const Order = props => {
  const history = useHistory()
  const dispatch = useDispatch()

  //state
  const [itemOptionSelected, setItemOptionSelected] = useState(null)
  const [itemMenuSelected, setItemMenuSelected] = useState({})
  const [quantityOfItem, setQuantityOfItem] = useState(1)
  const [itemNote, setItemNote] = useState(null)

  //store
  const storeMenu = useSelector(state => state.Menu) || {}
  const storeCart = useSelector(state => state.Cart) || {}

  useEffect(() => {
    handleRenderItemMenuSelected()
  }, [storeMenu])

  useEffect(() => {
    if(Object.keys(storeCart.info).length) {
      console.log('Cart Info: ', storeCart.info)
    }
  }, [storeCart])

  useEffect(() => {
    if(itemMenuSelected.options) {
      if(_.isNull(itemOptionSelected)) {
        setItemOptionSelected(itemMenuSelected.options[0].id)
      }
    }
  }, [itemMenuSelected])

  useEffect(() => {
    handleRenderItemMenuSelected()
  }, [])

  //handler
  const handleSelectItemOption = e => {
    setItemOptionSelected(e.target.value)
  }
  const handleRenderItemMenuSelected = () => {
    if(!Object.keys(storeMenu.menuItemSelected).length) {
      setTimeout(() => {
        history.push('/')
      }, 200)
    }

    setItemMenuSelected(storeMenu.menuItemSelected)
  }
  const handleAddItemToCart = () => {
    const {info} = storeCart
    info.items = info.items || []
    info.status = info.status || ORDER_STATUS.DRAFT

    const curItem = info.items.find(item => item.id === itemMenuSelected.id)
    if(!curItem) { //note exist any item
      const tmpObjItem = {
        id: itemMenuSelected.id,
        note: itemNote,
      }
      if(_.isNull(itemOptionSelected)) {
        tmpObjItem.quantity = parseInt(quantityOfItem)
      } else {
        tmpObjItem.quantity = [
          {
            id: itemOptionSelected,
            quantity: parseInt(quantityOfItem)
          }
        ]
      }
      info.items = [...info.items, tmpObjItem]
    } else {
      if(!_.isNull(itemNote)) {
        curItem.note = itemNote
      }
      if(_.isNull(itemOptionSelected)) {
        curItem.quantity += parseInt(quantityOfItem)
      } else {
        const idxExisted = curItem.quantity.findIndex(ob => ob.id === itemOptionSelected)
        if(idxExisted !== -1) {
          curItem.quantity[idxExisted].quantity += parseInt(quantityOfItem)
        } else {
          curItem.quantity.push({
            id: itemOptionSelected,
            quantity: parseInt(quantityOfItem)
          })
        }
      }
    }

    dispatch(ActionCart.setCart({...info}))

    successNotificationDialogs.show({
      message: 'Add item to cart successfully',
      description: ` `,
      placement: 'top',
      duration: 1.5,
    })
    setTimeout(() => {
      history.push('/')
    }, 1550)
  }
  const handleChangeNumber = value => {
    value = _.isNumber(value) ? value : 1
    setQuantityOfItem(value)
  }
  const handleChangeNote = e => {
    setItemNote(e.target.value)
  }

  return (
    <>
        <Row gutter={[24, 0]}>
          <Col xs={{ span: 22, offset: 1 }}
               lg={{ span: 12, offset: 6}}
               md={{ span: 16, offset: 4 }}
          >
            <Card className="card-billing-info"
                  title={<h3 className="font-semibold m-0">Pick item</h3>}
                  extra={<Button type="link" onClick={() => history.push('/')} className="darkbtn">
                    <strong><FontAwesomeIcon icon={faArrowLeftLong} /> Add more</strong>
                  </Button>}
                  bordered="false">
              <div style={{width: '100%', paddingLeft: 24, paddingRight: 24}}>
                <Row>
                  <Col span={16}>
                    <Title level={5}>{itemMenuSelected.name || 'Loading...'}</Title>
                  </Col>
                  <Col span={8} style={{textAlign: 'right'}}>{itemMenuSelected.price ? itemMenuSelected.price.toLocaleString() : null}</Col>
                </Row>
                <p className="item-desc">{itemMenuSelected.description || null}</p>

                {
                  itemMenuSelected.options ? (
                    <Radio.Group onChange={handleSelectItemOption} value={itemOptionSelected}>
                      <Space direction="vertical">
                        {
                          itemMenuSelected.options.map(op => (<Radio key={op.id} value={op.id}>{op.name}</Radio>))
                        }
                      </Space>
                    </Radio.Group>
                  ) : null
                }
                <div style={{marginTop: 20, textAlign: 'left'}}>
                  <label htmlFor="">Notes</label>: <TextArea style={{marginBottom: 15}} rows={4} onChange={handleChangeNote} />
                  <label htmlFor="">Number</label>: <br/><InputNumber min={1} max={10} onChange={handleChangeNumber} defaultValue={1}  /><br/>
                </div>
                <div style={{textAlign: 'center'}}>
                  <Button onClick={() => handleAddItemToCart()} style={{marginTop: 20}} type="button" className="text-success">
                    Add To Cart
                  </Button>
                </div>
              </div>
              {/*<div className="col-action">
              <InputNumber min={1} max={10} defaultValue={3} onChange={onChange} />
                <Button type="link" danger>
                  DELETE
                </Button>
                <Button type="link" className="darkbtn">
                   EDIT
                </Button>
              </div>*/}
            </Card>
          </Col>
        </Row>


    </>
  )
}

export default Order
