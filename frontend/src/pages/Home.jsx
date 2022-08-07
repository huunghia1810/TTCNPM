import _ from 'lodash'
import moment from 'moment'

//import react & relations
import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'

//import UI libs
import {Card, Col, Row, Switch, Button, Layout, Menu, Typography, List} from 'antd'
import Masonry from 'react-masonry-css'

//import assets
import project1 from '../assets/images/home-decor-1.jpeg'
import project2 from '../assets/images/home-decor-2.jpeg'
import project3 from '../assets/images/home-decor-3.jpeg'

//import components

//init info
const { Content } = Layout

const Home = props => {

  const breakpointColumnsObj = {
    default: 3,
    1200: 2,
    850: 1,
  }
  const project = [
    {
      img: project1,
      titlesub: "Project #1",
      title: "Modern",
      disciption:
        "As Uber works through a huge amount of internal management turmoil.",
    },
    {
      img: project2,
      titlesub: "Project #2",
      title: "Scandinavian",
      disciption:
        "Music is something that every person has his or her own specific opinion about.",
    },
    {
      img: project3,
      titlesub: "Project #3",
      title: "Minimalist",
      disciption:
        "Different people have different taste, and various types of music, Zimbali Resort",
    },
    {
      img: project3,
      titlesub: "Project #3",
      title: "Minimalist",
      disciption:
        "Different people have different taste, and various types of music, Zimbali Resort",
    },
  ]

  const dataList = [
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.',
  ];

  const items = project.map((p, index) => {
    return (
      <>
        <Card
          key={index}
          bordered={false}
          className="card-project"
          cover={<img src={p.img} />}
        >
          <div className="content">
            <div className="card-tag">{p.titlesub}</div>
            <h5>{p.titile}</h5>
            <p>{p.disciption}</p>
            <Row gutter={[6, 0]} className="card-footer">
              <Col span={12}>
                <Button type="button">VIEW PROJECT</Button>
              </Col>
              <Col span={12} className="text-right">
                <div>abc</div>
              </Col>
            </Row>

            <List
              class="list-item"
              size="large"
              bordered
              dataSource={dataList}
              renderItem={item => (
                <List.Item>{item}</List.Item>
              )}
            />
          </div>
        </Card>
      </>
    )
  })

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
              {items}
            </Masonry>
          </Col>

        </Row>
      </Content>
    </>
  )
}

export default Home
