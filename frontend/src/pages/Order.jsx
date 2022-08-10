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

//init info
const { Title } = Typography
const { TextArea } = Input

const Order = props => {
  const history = useHistory()

  //state
  const [itemOptionSelected, setItemOptionSelected] = useState(null)
  const [itemMenuSelected, setItemMenuSelected] = useState({})
  const [numberOfItem, setNumberOfItem] = useState(1)
  const [itemNote, setItemNote] = useState(null)

  //store
  const storeMenu = useSelector(state => state.Menu) || {}

  useEffect(() => {
    handleRenderItemMenuSelected()
  }, [storeMenu])

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
  const handleAddItemToCart = item => {

  }
  const handleChangeNumber = value => {
    value = _.isNumber(value) ? value : 1
    setNumberOfItem(value)
  }
  const handleChangeNote = value => {
    setItemNote(value)
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
                  <label htmlFor="">Notes</label>: <TextArea style={{marginBottom: 15}} rows={4} onchange={() => handleChangeNote} />
                  <label htmlFor="">Number</label>: <br/><InputNumber min={1} max={10} onChange={() => handleChangeNumber} defaultValue={1}  /><br/>
                </div>
                <div style={{textAlign: 'center'}}>
                  <Button onClick={() => handleAddItemToCart} style={{marginTop: 20}} type="button" className="text-success">
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
