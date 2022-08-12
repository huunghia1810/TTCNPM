import _ from "lodash";

//import react & relations
import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import "./../../assets/styles/admin.css";

//import UI libs
import { Col, Row, Layout, Form, Input, Button, Card } from "antd";
import MyFooter from "../../components/layout/Footer";
import { KeyOutlined } from "@ant-design/icons";

const { Content, Footer } = Layout;

const Admin = (props) => {
const history = useHistory()

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const onDoubleClick = () => history.push('/order-management')
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
                  name="username"
                  rules={[
                    { required: true, message: "Please input your username!" },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    { required: true, message: "Please input your password!" },
                  ]}
                >
                  <Input.Password />
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit" block
                  onDoubleClick={onDoubleClick}
                  >
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
