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

const Home = props => {
const history = useHistory()
  const dispatch = useDispatch()

  //state
  const [htmlMenu, setHtmlMenu] = useState(null)

  //store
  const storeMenu = useSelector(state => state.Menu) || {}

  useEffect(() => {
    if(!Object.keys(storeMenu.configs).length) {
      dispatch(ActionMenu.getMenu())
    }
  }, [])

  useEffect(() => {
    console.log(`menu configs`, storeMenu)
    handleRenderMenu()
  }, [storeMenu])

  //handler
  const handleClickMenuItem = item => {
    dispatch(ActionMenu.pickMenuItem(item))
    history.push('/order')
  }

  const handleRenderMenu = () => {
    const { configs } = storeMenu
    let htmlMenu = null

    if(Array.isArray(configs)) {
      htmlMenu = configs.map((i, index) => {
        const { category, items } = i;
        const { name: catName, img: catImg } = category
        return (
          <Card
            key={index}
            bordered={false}
            className="card-project"
            cover={<img src={catImg} />}
          >
            <div className="content">
              <div className="card-title">{catName}</div>
            </div>

            <List
              className="list-item"
              size="large"
              itemLayout='vertical'
              dataSource={items}
              renderItem={(item, k) => (
                <List.Item
                  key={k}
                  onClick={() => handleClickMenuItem(item)}
                  extra={
                    <>
                      <span>{item.price.toLocaleString()}</span>
                      {/*<img
                            width={272}
                            alt="logo"
                            src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                          />*/}
                    </>
                  }
                >{item.name}</List.Item>
              )}
            />
          </Card>
        )
      })
    }

    setHtmlMenu(htmlMenu)
  }

  const breakpointColumnsObj = {
    default: 3,
    1200: 2,
    850: 1,
  }

  return (
    <>
      <Content className='signin'>
        <Row gutter={[24, 0]}>
          <Col span={22} offset={1}>
            {/*<Col xs={{ span: 24, offset: 0 }}
                 lg={{ span: 22, offset: 1 }}
                 md={{ span: 12 }}
            >*/}
            <Masonry
              breakpointCols={breakpointColumnsObj}
              className="order-masonry-grid"
              columnClassName="order-masonry-grid_column"
              columnAttrs={{ className: 'should be overridden', 'data-test': '', style: { '--test': 'test' }}}
            >
              {htmlMenu}
            </Masonry>
          </Col>

        </Row>
      </Content>
    </>
  )
}

export default Home
