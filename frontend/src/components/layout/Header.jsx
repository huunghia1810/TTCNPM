import moment from 'moment';
import _ from 'lodash';
import 'moment/locale/vi';

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import {
  Avatar,
  Badge,
  Breadcrumb,
  Button,
  Col,
  Drawer,
  Dropdown,
  Input,
  Layout,
  List,
  Menu,
  Row,
  Switch,
} from 'antd';

import { NavLink, Link } from 'react-router-dom';

//----------import constants---------------

//----------import actions---------------

//import assets
import logoImg from '../../assets/images/logo.png';
import menuImg from '../../assets/images/menu.png';
import myOrderImg from '../../assets/images/my-order.png';
import { LogoutOutlined } from '@ant-design/icons';
import ActionUser from '../../actions/User'

//init info
const { Header } = Layout;

const MyHeader = props => {
  const dispatch = useDispatch();

  const { isAdmin } = props;
  const [numberCartItems, setNumberCartItems] = useState(null);

  //store
  const storeCart = useSelector(state => state.Cart) || {};

  useEffect(() => {}, []);

  useEffect(() => {
    const items = _.get(storeCart, 'info.items');
    if (items) {
      setNumberCartItems(items.length);
    } else {
      setNumberCartItems(null);
    }
  }, [storeCart]);

  //------------------------render section----------------------------------
  //------------------------render section----------------------------------

  return (
    <>
      <Header>
        <div className="header-col header-brand">
          <Link to="/">
            <img src={logoImg} alt="Order system" width={50} height={50} />
          </Link>
          <span className="header-brand-separator">&nbsp;</span>
        </div>
        <Row style={{ width: '100%' }} gutter={[24, 0]}>
          <Col className="header-col header-nav" span={24} md={6}>
            {!isAdmin && (
              <>
                <Link to="/">
                  <img
                    src={menuImg}
                    alt="Order system"
                    width={20}
                    height={20}
                  />
                  <span> Menu</span>
                </Link>
                <Link to="/my-orders">
                  <img src={myOrderImg} alt="My order" width={20} height={20} />
                  <span> My Order</span>
                </Link>
              </>
            )}
          </Col>
          <Col
            span={24}
            md={18}
            style={{ textAlign: 'right' }}
            className="header-control"
          >
            {isAdmin ? (
              <>
                <LogoutOutlined onClick={() => dispatch(ActionUser.signOut())} style={{fontSize: "25px"}} />
              </>
            ) : (
              <Link to="/cart">
                <Badge size="small" count={numberCartItems}>
                  <FontAwesomeIcon
                    style={{ fontSize: 25, color: '#606c38' }}
                    icon={faCartShopping}
                  />
                </Badge>
              </Link>
            )}
          </Col>
        </Row>
      </Header>
    </>
  );
};

export default MyHeader;
