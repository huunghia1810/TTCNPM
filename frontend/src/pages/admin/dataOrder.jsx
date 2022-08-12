import React from "react";
import {
  Row,
  Col,
  Card,
  Radio,
  Table,
  Upload,
  message,
  Progress,
  Button,
  Avatar,
  Typography,
  Space,
} from "antd";

import {
  DeleteOutlined,
  InfoCircleOutlined,
  ToTopOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { feedbackImg } from "../../assets/images";
const { Title } = Typography;

const formProps = {
  name: "file",
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  headers: {
    authorization: "authorization-text",
  },
  onChange(info) {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};
// table code start
const columns = [
  {
    title: "ĐƠN HÀNG",
    dataIndex: "name",
    width: "32%",
  },
  {
    title: "TỔNG TIỀN",
    dataIndex: "total",
    render: (item) => `${item}đ`,
  },

  {
    title: "TRẠNG THÁI",
    dataIndex: "status",
    render: () => (
      <Radio.Group defaultValue="a" size="large">
        <Radio.Button value="a">Đơn mới </Radio.Button>
        <Radio.Button value="b">Nhận đơn</Radio.Button>
        <Radio.Button value="c">Phục vụ</Radio.Button>{" "}
        <Radio.Button value="d">Thanh toán</Radio.Button>
        <Radio.Button value="e">Hoàn thành</Radio.Button>
      </Radio.Group>
    ),
  },
  {
    key: "action",
    render: (_, record) => (
      <Space>
        <a>
          <InfoCircleOutlined />
        </a>

        <a>
          <DeleteOutlined />
        </a>
      </Space>
    ),
  },
];

const data = [
  { key: 1, name: "order #1", total: 1000000, status: "3" },
  { key: 2, name: "order #2", total: 1000000, status: "3" },
  { key: 3, name: "order #3", total: 1000000, status: "3" },
  { key: 4, name: "order #4", total: 1000000, status: "3" },
];
export { formProps, columns, data };
