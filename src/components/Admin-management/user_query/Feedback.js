import React, { useEffect, useRef, useState } from "react";
import {
  SearchOutlined,
  UploadOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Button, Input, Space, Table, Modal, Select } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { SERVER_URL } from "../../../Globals";

const Feedback = () => {
  const [viewmsg, setViewmsg] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [state, setState] = useState({
    data: [],
  });
  const [msg, setMsg] = useState("");
  const data = state.data;
  useEffect(() => {
    axios.get(SERVER_URL + "api/contact/user-feedback").then((res) => {
      console.log(res.data.data);
      console.log(res.data.data);
      setState({
        data: res.data.data,
      });
    });
  }, []);
  //modal function
  const show = (detail) => {
    console.log("show data", detail);
    setViewmsg(true);
    setMsg(detail.message);
  };

  const resetshow = () => {
    setViewmsg(false);
  };

  //search filter
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div
        style={{
          padding: 8,
        }}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
  });

  const columns = [
    {
      title: "Name",
      dataIndex: "username",
      key: "username",
      width: "15%",
      fixed: "left",
      ...getColumnSearchProps("username"),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: "15%",
      fixed: "left",
      ...getColumnSearchProps("email"),
    },
    {
      title: "Mobile",
      dataIndex: "mobile",
      key: "mobile",
      width: "16%",
      ...getColumnSearchProps("mobile"),
    },
    {
      title: "Read Message",
      dataIndex: "",
      width: "10%",

      key: "x",
      render: (data) => (
        <Button
          type="primary"
          onClick={() => {
            show(data);
          }}
        >
          Message
        </Button>
      ),
    },
  ];

  return (
    <>
      <Table columns={columns} dataSource={data} />
      <div>
        <Modal
          title="Edit items"
          open={viewmsg}
          bodyStyle={{ overflowY: "auto", maxHeight: "calc(100vh - 200px)" }}
          okText="Ok"
          onCancel={() => {
            resetshow();
          }}
          onOk={() => {
            resetshow();
          }}
        >
          <div>
            <p>{msg}</p>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default Feedback;
