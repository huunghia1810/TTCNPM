//import react & relations
import { Card, Col, Radio, Row, Table } from "antd";
import React from "react";
import { columns, data, dataproject, project } from "./dataOrder";

const OrderDetailManagement = (props) => {
  const onChange = (e) => console.log(`radio checked:${e.target.value}`);
  return (
    <div className="tabled">
      <Row gutter={[24, 0]}>
        <Col xs="24" xl={24}>
          Lorem ipsum dolor sit amet.
        </Col>
      </Row>
    </div>
  );
};

export default OrderDetailManagement;
