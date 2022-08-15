import _ from "lodash";
import queryString from 'query-string'

//import react & relations
import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { useHistory } from "react-router-dom";
import "./../../assets/styles/admin.css";

//import UI libs
import { Col, Row, Layout, Form, Input, Button, Card } from "antd";
import MyFooter from "../../components/layout/Footer";
import { KeyOutlined } from "@ant-design/icons";

//import actions
import ActionUser from '../../actions/User'

//init info
const { Content } = Layout;

const Admin = props => {
  const history = useHistory()
  const dispatch = useDispatch()

  //store
  const User = useSelector(state => state.User) || {}

  const objParams = queryString.parse(props.location.search)

  useEffect(() => {
    dispatch(ActionUser.checkAuth())
  },[])

  useEffect(() => {
    if(Object.keys(User.authInfo).length) {
      handleRedirect()
    }
  },[User])

  //handlers
  const handleRedirect = () => {
    if(!_.isUndefined(objParams.redirect) && objParams.redirect !== '/sign-out') {
      props.history.push(objParams.redirect)
    } else {
      props.history.push('/management/order/list')
    }
  }

  const onFinish = (values) => {
    const { email, password } = values
    dispatch(ActionUser.signIn({email, password}))
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Layout className="container login-admin">
      <Content>
        <Row>
          <Col span={7} />
          <Col span={10}>
            <Card className="login-box">
              <div className="login-key">
                <KeyOutlined className="login-key" />
              </div>
              <div className="login-title">ADMIN PANEL</div>
              <Form
                name="basic"
                layout="vertical"
                className="login-form"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
              >
                <Form.Item
                  label="Username"
                  name="email"
                  rules={[
                    { required: true, message: "Please input your email!" },
                  ]}
                >
                  <Input placeholder='Email' />
                </Form.Item>

                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    { required: true, message: "Please input your password!" },
                  ]}
                >
                  <Input type="password" placeholder='Password' />
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit" block>
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </Col>
          <Col span={7} />
        </Row>
      </Content>
      <MyFooter />
    </Layout>
  );
};

export default Admin;
