import _ from 'lodash';

//import react & relations
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  FrownOutlined,
  MehOutlined,
  SendOutlined,
  SmileOutlined,
} from '@ant-design/icons';
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
  Form,
} from 'antd';
import { feedbackImg } from '../assets/images';
import ActionMenu from '../actions/Menu';
import './../assets/styles/feedback.css';
import moment from 'moment';
const data = [
  {
    title: 'Ant Design Title 1',
  },
  {
    title: 'Ant Design Title 2',
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
const Rating = props => {
  const history = useHistory();
  const dispatch = useDispatch();
  const onFinish = values => {
    console.log('Received values of form: ', values);
    history.push('/');
  };
  const storeMenu = useSelector(state => state.Menu) || {};
  const storeOrder = useSelector(state => state.Order) || {};
  const renderOrder = () => {
    if (Object.keys(storeOrder.orderInfo).length) {
      let { cartInfo, status, slotNumber, createdAt } = storeOrder.orderInfo;
      let curTotalQuantity = 0;

      cartInfo = JSON.parse(cartInfo);
      let numTotal = 0;
      const { items } = cartInfo;
      return (
        <div className="card-order">
          <Title level={5}>Order #123</Title>
          <Text type="secondary">
            {moment(createdAt).format('DD/MM/YYYY hh:mm:ss')}
          </Text>
          <List
            itemLayout="horizontal"
            dataSource={items}
            renderItem={item => {
              const curItemInfo = ActionMenu.getMenuItemById(
                item.id,
                storeMenu.configs,
              );
              //calculate total
              let curQuantity = 0;
              if (Array.isArray(item.quantity)) {
                item.quantity.map(q => {
                  curQuantity = parseInt(q.quantity)
                  curTotalQuantity += parseInt(q.quantity);
                });
              } else {
                curTotalQuantity += parseInt(item.quantity);
              }
              numTotal += curItemInfo.price * curTotalQuantity;

              return (
                <List.Item>
                  <Row style={{ width: '100%' }} gutter={[16, 0]}>
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
                      <Title level={5}>{curItemInfo?.name}</Title>
                      <Text type="secondary">
                      {curItemInfo?.description}
                      </Text>
                      <div className="detail-food">
                        <Text level={5}>{curItemInfo?.price}d</Text>
                        <Text level={5}>Số lượng: {curQuantity}</Text>
                        <Text level={5}>Lựa chọn: Sốt cay</Text>
                      </div>
                    </Col>
                  </Row>
                </List.Item>
              );
            }}
          />
          <div className="detail-food">
            <Text type="secondary">{curTotalQuantity} món</Text>
            <Title level={5}>10 000 000đ</Title>
          </div>
        </div>
      );
    }
    return <></>;
  };
  return (
    <>
      <Content className="feedback">
        <Row gutter={[0, 0]}>
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
                    {renderOrder()}
                    
                    <Title level={4}>
                      Quý khách cảm thấy như thế nào về đơn hàng này?
                    </Title>
                    <Form
                      name="validate_other"
                      onFinish={onFinish}
                      initialValues={{}}
                    >
                      <Form.Item
                        name="rate"
                        rules={[
                          {
                            required: true,
                            message: 'Please select your rate!',
                          },
                        ]}
                      >
                        <Rate
                          style={{ fontSize: '50px' }}
                          character={({ index }) => customIcons[index + 1]}
                        />
                      </Form.Item>
                      <Form.Item name="note">
                        <TextArea
                          style={{ marginTop: '10px', marginBottom: '20px' }}
                          rows={4}
                          placeholder="Vui lòng nói cho chúng tôi biết tại sao bạn đánh giá như thế"
                        />
                      </Form.Item>
                      <Form.Item>
                        <Button
                          type="primary"
                          icon={<SendOutlined />}
                          shape="round"
                          htmlType="submit"
                          block
                        >
                          Gửi feedback
                        </Button>
                      </Form.Item>
                    </Form>
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
