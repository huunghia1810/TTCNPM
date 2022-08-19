import _ from "lodash";

import React, { useState, useEffect } from "react";
import {Link, useLocation, useParams} from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPhone} from '@fortawesome/free-solid-svg-icons'
import {Col, Layout, Menu, Row} from 'antd'

import MyHeader from "./Header";
import Footer from "./Footer";

//----------import pages---------------
import Home from "./../../pages/Home";
import Cart from "./../../pages/Cart";
import Order from "./../../pages/Order";
import MyOrder from "./../../pages/MyOrder";
import Rating from "./../../pages/Rating";
import PageNotFound from "./../layout/PageNotFound/PageNotFound";

//import actions
import ActionIdentity from "../../actions/Identity";

//import socket
import feathersClient from './../../feathersClient'

//init info
const { Content, Header } = Layout;

const Main = (props) => {
  const dispatch = useDispatch();

  let { entity, action } = useParams();

  const [childComponent, setChildComponent] = useState(false);
  const storeOrder = useSelector(state => state.Order) || {}

  useEffect(() => {
    handleUpdateMainContent();
  }, []);

  useEffect(() => {
    handleUpdateMainContent();
  }, [entity, action]);

  const handleUpdateMainContent = () => {
    let mainComponent = null;
    entity = _.isUndefined(entity) ? "home" : entity;
    switch (entity) {
      case "home":
        mainComponent = <Home></Home>;
        break;
      case "cart":
        mainComponent = <Cart></Cart>;
        break;
      case "order":
        mainComponent = <Order></Order>;
        break;
      case "my-orders":
        mainComponent = <MyOrder></MyOrder>;
        break;
      case "rating":
        mainComponent = <Rating></Rating>;
        break;
      default:
        mainComponent = <PageNotFound></PageNotFound>;
        break;
    }
    if (mainComponent === null) {
      mainComponent = <PageNotFound></PageNotFound>;
    }
    setChildComponent(mainComponent);
  };

  return (
    <>
      <Layout className="layout-default layout-signin">
        <MyHeader />
        <Row gutter={[24, 0]}>
          <Col span={24} style={{paddingTop: 20, textAlign: 'center'}}>
            <h3 className="text-fill" style={{paddingTop: 10, paddingBottom: 10}}>
              <FontAwesomeIcon icon={faPhone} />&nbsp; 0909 090 909
            </h3>
          </Col>
        </Row>

        <Content className="content-ant">{childComponent || ""}</Content>
        <Footer />
      </Layout>
    </>
  );
};

export default Main;
