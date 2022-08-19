import _ from 'lodash';
import moment from 'moment';

//import react & relations
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import feathersClient from './../../feathersClient'

//import UI libs
import Highlighter from 'react-highlight-words';
import {
  Card,
  Col,
  Descriptions,
  Radio,
  Row,
  Table,
  Tag,
  Dropdown,
  Menu,
  Space,
  Button,
  Input,
} from 'antd';
import { DownOutlined, SearchOutlined } from '@ant-design/icons';

//import actions
import ActionOrder from '../../actions/Order';

//import constants
import * as constantOrder from '../../constants/Order'
import ActionMenu from '../../actions/Menu'

//import socket
import feathersClient from './../../feathersClient'

//init info
const { ORDER_STATUS } = constantOrder;
const OrderListManagement = props => {
  const dispatch = useDispatch()
  const history = useHistory()
  const searchInput = useRef(null)

  const [tableData, setTableData] = useState([])
  const [searchText, setSearchText] = useState('')
  const [searchedColumn, setSearchedColumn] = useState('')

  //store
  const storeMenu = useSelector(state => state.Menu) || {};
  const storeOrder = useSelector(state => state.Order) || {};

  useEffect(() => {
    dispatch(ActionOrder.getOrders())

    /*feathersClient.service('orders')
      .on('patched', message => {
        handleListenChangeOrders(message)
      })*/
  }, [])

  useEffect(() => {
    if(filterStatus.length) {
      dispatch(ActionOrder.getOrders({status: filterStatus}))
    } else {
      dispatch(ActionOrder.getOrders())
    }
  }, [filterStatus])

  useEffect(() => {
    _setDataTables()
  }, [storeOrder])

  //handlers
  const onChangeFilterStatus = e => {
    setFilterStatus(e.target.value)
  }
  const handleChangeOrderStatus = (id, status) => {
    dispatch(ActionOrder.updateOrderById(id, {status}))
  }
  const handleListenChangeOrders = message => {
    console.log('handleListenChangeOrders', message, storeOrder.listOrders)
  }
  
  //Todo: render tables
  //for filter columns of table
  const getColumnSearchProps = dataIndex => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : '',
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => searchInput.current.select(), 100);
      }
    },
    render: text =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = clearFilters => {
    clearFilters();
    setSearchText('');
  };

  // table code start
  const columns = [
    //{title: 'Order Id', dataIndex: 'id', key: 'id', width: '2%'},
    {
      title: 'Table No',
      dataIndex: 'tableNo',
      key: 'tableNo',
      width: '5%',
      ...getColumnSearchProps('tableNo'),
    },
    {
      title: 'Cart Info',
      dataIndex: 'cartInfo',
      key: 'cartInfo',
      width: '35%',
    },

    { title: 'Total (VND)', key: 'total', dataIndex: 'total', width: '15%' },
    { title: 'Status', key: 'status', dataIndex: 'status', width: '15%' },
    {
      title: 'Customer Info',
      key: 'customerInfo',
      dataIndex: 'customerInfo',
      width: '20%',
    },
    { title: 'Action', key: 'action', dataIndex: 'action', width: '10%' },
  ];

  const _setDataTables = () => {
    let _tableData = [];

    if (storeOrder?.listOrders?.length) {
      _tableData = storeOrder?.listOrders
        .filter(order => {
          return filter ? order?.status === filter : true;
        })
        .map(order => {
          const _tableDataItem = { key: order.id };

          //prepare data cartInfo
          const cartInfo = JSON.parse(order.cartInfo);
          const { items } = cartInfo;
          let numTotal = 0;
          const htmlCartInfo = items.map((item, index) => {
            const curItemInfo = ActionMenu.getMenuItemById(
              item.id,
              storeMenu.configs,
            );

            //calculate total
            let curTotalQuantity = 0;
            if (Array.isArray(item.quantity)) {
              item.quantity.map(q => {
                curTotalQuantity += parseInt(q.quantity);
              });
            } else {
              curTotalQuantity += parseInt(item.quantity);
            }
            numTotal += curItemInfo.price * curTotalQuantity;

            return (
              <Descriptions className="cart-info-item" key={index}>
                <Descriptions.Item label="Name" span={3}>
                  <span style={{ color: '#1890ff' }}>{curItemInfo.name}</span>
                </Descriptions.Item>
                <Descriptions.Item label="Price" span={3}>
                  {curItemInfo.price.toLocaleString()}
                </Descriptions.Item>
                {Array.isArray(item.quantity) ? (
                  <Descriptions.Item label="Option(s)" span={3}>
                    {item.quantity.map((q, qIndex) => {
                      const curOptions = curItemInfo.options.find(
                        op => op.id == q.id,
                      );
                      return (
                        <div key={qIndex}>
                          <span>{curOptions.name}:</span>{' '}
                          <span className="text-danger">{q.quantity}</span>
                          &nbsp;&nbsp;
                        </div>
                      );
                    })}
                  </Descriptions.Item>
                ) : (
                  <Descriptions.Item label="Quantity" span={3}>
                    <span className="text-danger">{item.quantity}</span>
                  </Descriptions.Item>
                )}
                {item.note && (
                  <Descriptions.Item label="Note" span={3}>
                    {item.note}
                  </Descriptions.Item>
                )}
              </Descriptions>
            );
          });

          //prepare render
          //_tableDataItem.id = order.id
          _tableDataItem.tableNo = order.slotNumber;
          _tableDataItem.cartInfo = htmlCartInfo;
          _tableDataItem.total = (
            <strong style={{ color: '#1890ff' }}>
              {numTotal.toLocaleString()}
            </strong>
          );
          let color = 'red';
          switch (order.status) {
            case ORDER_STATUS.NEW:
              color = 'green';
              break;
            case ORDER_STATUS.PREPARING:
              color = 'orange';
              break;
            case ORDER_STATUS.SERVED:
              color = 'purple';
              break;
            case ORDER_STATUS.DONE:
              color = 'cyan';
              break;
            default:
              break;
          }
          _tableDataItem.status = (
            <>
              <Tag color={color}>
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </Tag>
            </>
          );
          _tableDataItem.customerInfo = (
            <>
              <Descriptions>
                <Descriptions.Item label="Full Name" span={3}>
                  {order.customerName}
                </Descriptions.Item>
                <Descriptions.Item label="Phone" span={3}>
                  {`0${order.customerPhone.substr(2)}`}
                </Descriptions.Item>
              </Descriptions>
            </>
          );

          //prepare data action
          const arrStatusRemain = Object.values(ORDER_STATUS)
            .filter(stt => stt != order.status && stt != ORDER_STATUS.DRAFT)
            .map((keyStt, k) => {
              return {
                key: keyStt,
                label: (
                  <span
                    onClick={() => handleChangeOrderStatus(order.id, keyStt)}
                  >
                    {keyStt}
                  </span>
                ),
                //label: (<span>{keyStt}</span>),
              };
            });

          _tableDataItem.action = (
            <>
              <Space size="middle">
                <Dropdown overlay={<Menu items={[...arrStatusRemain]} />}>
                  <Button className="text-success">
                    <Space>
                      Change Status
                      <DownOutlined />
                    </Space>
                  </Button>
                </Dropdown>
              </Space>
            </>
          );

          return _tableDataItem;
        });
    }

    setTableData(_tableData);
  };

  return (
    <div className="tabled">
      <Row gutter={[24, 0]}>
        <Col xs="24" xl={24}>
          <Card
            bordered={false}
            className="criclebox tablespace mb-24"
            title="Orders management"
            extra={
              <>
                <Radio.Group defaultValue='a' onChange={onChange}>
                  <Radio.Button value='z'>Tất cả</Radio.Button>
                  <Radio.Button value='a'>Đơn mới </Radio.Button>
                  <Radio.Button value='b'>Nhận đơn</Radio.Button>
                  <Radio.Button value='c'>Phục vụ</Radio.Button>
                  <Radio.Button value='d'>Thanh toán</Radio.Button>
                  <Radio.Button value='e'>Hoàn thành</Radio.Button>
                </Radio.Group>
              </>
            }
          >
            <div className="table-responsive">
              <Table
                columns={columns}
                dataSource={tableData}
                pagination={{pageSize: 2}}
                className='ant-border-space'
              />
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default OrderListManagement;
