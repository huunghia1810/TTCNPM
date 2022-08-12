import _ from "lodash";

//import react & relations
import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  FrownOutlined,
  MehOutlined,
  SendOutlined,
  SmileOutlined,
} from "@ant-design/icons";
//import UI libs
import {
  Col,
  Row,
  Layout,
  Typography,
  Card,
  List,
  Avatar,
  Rate,
  Input,
  Button,
} from "antd";
import { feedbackImg } from "../assets/images";
import "./../assets/styles/feedback.css";
const data = [
  {
    title: "Ant Design Title 1",
  },
  {
    title: "Ant Design Title 2",
  },
];
const { Meta } = Card;
const customIcons = {
  1: <FrownOutlined size={20} />,
  2: <FrownOutlined />,
  3: <MehOutlined />,
  4: <SmileOutlined />,
  5: <SmileOutlined />,
};
const { TextArea } = Input;
const { Content } = Layout;
const { Title, Text } = Typography;
const Rating = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();

  return (
    <>
      <Content className="feedback">
        <Row gutter={[24, 0]}>
          <Col span={10}>
            <div className="col-feedback">
              <Title>
                Hãy thoải mái để lại feedback cho nhà hàng của chúng tôi
              </Title>
              <div>
                <img src={feedbackImg} alt="feedback system" />
              </div>
            </div>
          </Col>
          <Col span={14}>
            <Row>
              <Col span={20}>
                <div className="form-feedback">
                  <div className="card-feedback">
                    <Title level={3}>Feedback</Title>
                    <div className="card-order">
                      <Title level={5}>Order #123</Title>
                      <Text type="secondary">23/2/2022 00:00:00</Text>
                      <List
                        itemLayout="horizontal"
                        dataSource={data}
                        renderItem={(item) => (
                          <List.Item>
                            <Row style={{ width: "100%" }} gutter={[16, 0]}>
                              <Col span={4}>
                                <div className="img-food-box">
                                  <img
                                    className="img-food"
                                    alt=""
                                    src="https://thegangs.onha.vn/images/repo/Tomahawk%20Beef%20890k%20(%201kg%20).jpg"
                                  />
                                </div>
                              </Col>
                              <Col span={20}>
                                <Title level={5}>Đùi cừu nướng</Title>
                                <Text type="secondary">
                                  Đùi cừu nướng trọng lương 300gr
                                </Text>
                                <div className="detail-food">
                                  <Text level={5}>100.000d</Text>
                                  <Text level={5}>Số lượng: 1</Text>
                                  <Text level={5}>Lựa chọn: Sốt cay</Text>
                                </div>
                              </Col>
                            </Row>
                          </List.Item>
                        )}
                      />
                      <div className="detail-food">
                        <Text type="secondary">3 món</Text>
                        <Title level={5}>10 000 000đ</Title>
                      </div>
                    </div>
                    <Title level={4}>
                      Quý khách cảm thấy như thế nào về đơn hàng này?
                    </Title>
                    <Rate
                      defaultValue={4}
                      style={{ fontSize: "50px" }}
                      character={({ index }) => customIcons[index + 1]}
                    />
                    <TextArea
                      style={{ marginTop: "20px", marginBottom: "20px" }}
                      rows={4}
                      placeholder="Vui lòng nói cho chúng tôi biết tại sao bạn đánh giá như thế"
                    />
                    <Button
                      type="primary"
                      icon={<SendOutlined />}
                      shape="round"
                      block
                    >
                      Gửi feedback
                    </Button>
                  </div>
                </div>
              </Col>
              <Col span={4}></Col>
            </Row>
          </Col>
        </Row>
      </Content>
    </>
  );
};

export default Rating;
