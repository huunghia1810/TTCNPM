//import react & relations
import { Card, Col, Radio, Row, Table } from "antd";
import React from "react";
import { columns, data, dataproject, project } from "./dataOrder";

const OrderListManagement = (props) => {
  const onChange = (e) => console.log(`radio checked:${e.target.value}`);
  return (
    <div className="tabled">
      <Row gutter={[24, 0]}>
        <Col xs="24" xl={24}>
          <Card
            bordered={false}
            className="criclebox tablespace mb-24"
            title="Quản lý đơn hàng"
            extra={
              <>
                <Radio.Group defaultValue="a" onChange={onChange}>
                  <Radio.Button value="z">Tất cả</Radio.Button>
                  <Radio.Button value="a">Đơn mới </Radio.Button>
                  <Radio.Button value="b">Nhận đơn</Radio.Button>
                  <Radio.Button value="c">Phục vụ</Radio.Button>
                  <Radio.Button value="d">Thanh toán</Radio.Button>
                  <Radio.Button value="e">Hoàn thành</Radio.Button>
                </Radio.Group>
              </>
            }
          >
            <div className="table-responsive">
              <Table
              
                columns={columns}
                dataSource={data}
                pagination={false}
                className="ant-border-space"
              />
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default OrderListManagement;
