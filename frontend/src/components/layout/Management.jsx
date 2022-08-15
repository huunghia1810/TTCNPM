import _ from "lodash";

import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Layout } from "antd";
import Header from "./Header";
import Footer from "./Footer";

//----------import pages---------------
import OrderListManagement from './../../pages/admin/OrderListManagement'
import OrderDetailManagement from './../../pages/admin/OrderDetailManagement'
import PageNotFound from "./../layout/PageNotFound/PageNotFound";

//import actions

const { Content } = Layout;

const Main = (props) => {
  const dispatch = useDispatch();

  let { entity, action } = useParams();

  const [childComponent, setChildComponent] = useState(false);

  useEffect(() => {
    handleUpdateMainContent();
  }, []);

  useEffect(() => {
    handleUpdateMainContent();
  }, [entity, action]);

  //handler
  const handleUpdateMainContent = () => {
    let mainComponent = null;
    entity = _.isUndefined(entity) ? 'home' : entity;
    switch (entity) {
      case 'order':
        if(_.isUndefined(action) || (!_.isUndefined(action) && action === 'list')) {
          mainComponent = <OrderListManagement></OrderListManagement>
        }else if(action === 'detail') {
          mainComponent = <OrderDetailManagement></OrderDetailManagement>
        }
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
        <Header />
        <Content className="content-ant">{childComponent || ""}</Content>
        <Footer />
      </Layout>
    </>
  );
};

export default Main;
