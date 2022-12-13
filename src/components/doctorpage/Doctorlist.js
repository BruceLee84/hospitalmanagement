import React, { useEffect, useState } from "react";
import Navbar from "../navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { Button, Input, Select, Modal, Typography, Form } from "antd";
import "./Doctor.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { SERVER_URL } from "../../Globals";
const { Title } = Typography;

const { Option } = Select;

const items = [];

const Doctorlist = () => {
  const [form] = Form.useForm();

  const [isselecting, setIsSelecting] = useState(false);
  const [selectdetail, setSelectdetail] = useState({
    data: [],
  });

  const [details, setDetails] = useState({});
  const [department, setDepartment] = useState({
    id: "",
  });

  const [specialistData, setSpecialistData] = useState({
    data: "",
  });

  const [showSlotData, setShowSlotDay] = useState({
    data: [],
  });
  const navigate = useNavigate();

  const [state, setState] = useState({
    data: [],
  });

  const [depName, setDepName] = useState({
    name: "",
  });

  const [availableDay, setAvailableDay] = useState({
    day: [],
  });

  const [availableSlot, setAvailableSlot] = useState({
    data: "",
  });

  const [listSlot, setListSlot] = useState({
    data: [],
  });

  const [open, setOpen] = useState(false);

  const handleChange = (value) => {
    // this.setState({selectValue:e.target.value});
    console.log(value);
    setAvailableSlot({
      data: value,
    });

    console.log("value", value);
  };

  useEffect(() => {
    axios.get(SERVER_URL + "api/departements/getAllDepartments").then((res) => {
      console.log(res.data.data);
      setState({
        data: res.data.data,
      });
    });

    console.log("department_name", department.id);
    axios
      .get(SERVER_URL + "api/specialist/getspecialistByDepId", {
        params: { department_id: department.id },
      })
      .then((res) => {
        console.log("dep", res.data.result);
        console.log(res.data.result[0].specialist_id);
        setSelectdetail({
          data: res.data.result,
        });

        setSpecialistData({
          data: res.data.result[0].specialist_id,
        });
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(SERVER_URL + "api/specialistDaySlot/getDataSlotDay", {
        params: {
          department_id: department.id,
          specialist_id: specialistData.data,
        },
      })
      .then((res) => {
        console.log("specialist_data", res.data.data);
        setShowSlotDay({
          data: res.data.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(SERVER_URL + "api/specialistDaySlot/getAvailableSlot", {
        params: {
          specialist_id: details.specialist_id,
          department_id: details.department_id,
          available_day: availableSlot.data,
        },
      })
      .then((res) => {
        console.log("available_sloteeeeeee", res.data.data[0].available_slot);
        setListSlot({
          data: res.data.data[0].available_slot,
        });
      });

    axios
      .get(SERVER_URL + "api/specialistDaySlot/getAvailableDay", {
        params: {
          specialist_id: details.specialist_id,
          department_id: details.department_id,
        },
      })
      .then((res) => {
        console.log("available_dayyyy", res.data.data);

        setAvailableDay({
          data: res.data.data,
        });
      });
  }, [department.id, specialistData.data, availableSlot.data, details]);

  // console.log("selectdetail", selectdetail)

  const getData = (selectedData) => {
    console.log(selectedData);
    setDepartment({
      id: selectedData,
    });

    axios
      .get(SERVER_URL + "api/departements/getSingleDepartment", {
        params: { department_id: selectedData },
      })
      .then((res) => {
        console.log("departNameeeeee", res.data.data.department_name);
        setDepName({
          name: res.data.data.department_name,
        });
      });
  };

  //slot data
  const selectdata = (doctor_id, dep_id) => {
    console.log(doctor_id, dep_id);
    setIsSelecting(true);
    setDetails({
      ...details,
      specialist_id: doctor_id,
      department_id: dep_id,
    });

    console.log("detailsssss", details);
    setOpen(true);
  };
  //
  const resetSelect = () => {
    setIsSelecting(false);
  };

  const selectSlot = (data) => {
    console.log("data", data);
  };

  const handleSubmit = (data) => {
    console.log(data);
    setDetails({
      ...details,
      available_day: data.available_day,
      available_slot: data.available_slot,
    });

    setIsSelecting(false);
  };

  console.log("detailssssssssssssssssssssssssss", details);
  // form layout
  const responsive_layout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 24 },
      md: { span: 12 },
      lg: { span: 12 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 24 },
      md: { span: 12 },
      lg: { span: 12 },
    },
  };
  return (
    <>
      <Navbar></Navbar>
      <div>
        <button
          class="btn rounded-pill text-white btn side-button py-0 px-2 mt-3 ms-1"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasExample"
          aria-controls="offcanvasExample"
        >
          Departments
          <i class="fa-solid fa-angles-right"></i>
        </button>
        <div className="doctor-offcanvas">
          <div
            class="offcanvas offcanvas-start"
            tabIndex="-1"
            id="offcanvasExample"
            aria-labelledby="offcanvasExampleLabel"
          >
            <div class="offcanvas-header">
              <h5
                class="offcanvas-title text-white mx-auto"
                id="offcanvasExampleLabel"
              >
                Department
              </h5>
              <button
                type="button"
                class="btn-close text-reset"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div class="offcanvas-body p-0">
              <nav className="navbar py-0">
                <ul className="navbar-nav side-nav flex-fill">
                  <li className="nav-item w-100">
                    {state.data.map((det, key) => {
                      return (
                        <button
                          className="nav-link w-100 btn rounded-0 border-bottom text-white side-link"
                          onClick={() => getData(det.department_id)}
                          value={det.department_id}
                        >
                          {det.department_name}
                        </button>

                        // <Button value={det.department_name} onClick={()=>getData(det.department_name)}>{det.department_name }</Button>

                        // <ul class="nav justify-content-end">
                        //   <li class="nav-item">
                        //     {/* <a class="nav-link active"  key={key} href={det.department_name} onClick={onLinkClick}>{det.department_name}</a> */}
                        //     <Link to={"/"+det.department_name}>{det.department_name}</Link>
                        //   </li>
                        // </ul>
                      );
                    })}
                  </li>
                  {/* <li className="nav-item">
                    <button className="nav-link w-100 btn rounded-0 border-bottom text-white side-link">
                      Department2
                    </button>
                  </li>
                  <li className="nav-item">
                    <button className="nav-link w-100 btn rounded-0 border-bottom text-white side-link">
                      Department3
                    </button>
                  </li>
                  <li className="nav-item w-100">
                    <button className="nav-link w-100 btn rounded-0 border-bottom text-white side-link">
                      Department4
                    </button>
                  </li> */}
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>

      <div className="container my-2">
        <div className="row row-cols-lg-2 row-cols-xxl-3 row-cols-md-1 row-cols-1 gy-3 gx-xl-5 gx-3">
          {selectdetail.data.map((obj) => {
            console.log("obj", selectdetail.data);
            return (
              <div className="col">
                <div class="card mb-3 card-list">
                  <div class="row g-0">
                    <div class="col-md-5">
                      <img
                        src={SERVER_URL + "uploads/specialist/" + obj.image}
                        class="img-fluid rounded-start h-100 doctor-img"
                        alt="doctor-profile"
                      />
                    </div>
                    <div class="col-md-7">
                      <div class="card-body doctor-card">
                        <p class="card-title doctor-name">
                          {obj.specialist_name}
                        </p>
                        <div className="d-flex doctor-exp text-uppercase">
                          <p class="card-text me-3">{obj.specialisation}</p>
                          <p class="card-text">{obj.experience} EXP</p>
                        </div>
                        <p class="card-text doctor-avl mb-2">Department :</p>

                        <div>
                          <p class="card-text doctor-avl mb-2">
                            <span className="span">Available on</span>
                            &nbsp;<i class="fa-solid fa-calendar-days"></i> :
                            {obj.available_day.map((obj) => {
                              return <span key={obj}>{obj} &nbsp;</span>;
                            })}
                          </p>
                          <p class="card-text doctor-time">
                            <span className="span">Timing</span>
                            &nbsp;<i class="fa-regular fa-clock"></i> :
                            {obj.time}
                            &nbsp;
                          </p>
                        </div>

                        <button
                          className="btn book-btn px-1 py-1"
                          // key={index}
                          // onClick={() => {
                          //   selectdata(obj.specialist_id);
                          //   // selectdata();
                          // }}
                        >
                          Book Appointment
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          <div>
            <Modal
              title="Select Your Slot"
              visible={isselecting}
              okText="Proceed For Payment"
              onCancel={() => {
                resetSelect();
              }}
              onOk={() => {
                navigate("/payment");
                resetSelect();
              }}
              className="modal-app"
            >
              <div>
                <Form {...responsive_layout}>
                  <Form.Item
                    name="available_day"
                    label="Choose Day for Appointment"
                    // rules={[{ required: true, message: "Select day" }]}
                  >
                    <Select placeholder="Select a option below" allowClear>
                      <Option>Monday</Option>
                      <Option>Friday</Option>
                    </Select>
                  </Form.Item>
                  <Form.Item
                    name="slot_option"
                    label="Choose Slot Time"
                    // rules={[
                    //   { required: true, message: "Select consultation time" },
                    // ]}
                  >
                    <Select placeholder="Select a option below" allowClear>
                      <Option>10.00</Option>
                      <Option>2.00</Option>
                    </Select>
                  </Form.Item>
                </Form>
              </div>
            </Modal>
          </div>
        </div>
      </div>

      <div class="container mt-5 mb-5">
        {/* <div class="d-flex justify-content-between mb-3"> <span>Doctors</span> <button class="btn btn-success add">Add Doctors</button> </div> */}
        <div class="row g-2">
          {selectdetail.data.map((obj) => {
            console.log("obj", selectdetail.data);
            return (
              <div class="col-md-3">
                <div class="card p-2 py-3 text-center">
                  <div class="img mb-2">
                    {" "}
                    <img
                      src={SERVER_URL + "uploads/specialist/" + obj.image}
                      width="70"
                      class="rounded-circle"
                    />{" "}
                  </div>
                  <h5 class="mb-0">{obj.specialist_name}</h5>
                  <small>{depName.name}</small>
                  <div class="ratings mt-2">
                    {" "}
                    <i class="fa fa-star"></i> <i class="fa fa-star"></i>{" "}
                    <i class="fa fa-star"></i> <i class="fa fa-star"></i>{" "}
                  </div>
                  <div class="mt-4 apointment">
                    {" "}
                    <button
                      class="btn btn-success text-uppercase"
                      onClick={() => {
                        selectdata(obj.specialist_id, obj.department_id);
                        // selectdata();
                      }}
                    >
                      Book Appointment
                    </button>{" "}
                  </div>
                </div>
              </div>
            );
          })}

          <div>
            <Modal
              title="Select Your Slot"
              visible={isselecting}
              // onOk={(values) => {
              //   navigate("./payment");
              //   console.log("values", values)
              //   resetSelect();
              // }}

              onCancel={() => {
                resetSelect();
              }}
              footer={null}
              className="modal-app"
            >
              <div>
                <Form
                  {...responsive_layout}
                  form={form}
                  onFinish={handleSubmit}
                >
                  <Form.Item
                    name="available_day"
                    label="Choose Day for Appointment"
                    // rules={[{ required: true, message: "Select day" }]}
                  >
                    <Select
                      placeholder="Select a option below"
                      allowClear
                      onChange={handleChange}
                    >
                      {console.log("availableday.dayeeee", availableDay.data)}
                      {availableDay.data?.map((data, index) => {
                        return (
                          <Option value={data.available_day} key={index}>
                            {data.available_day}
                          </Option>
                        );
                      })}
                    </Select>
                  </Form.Item>

                  <Form.Item
                    name="available_slot"
                    label="Choose Slot Time"
                    // rules={[
                    //   { required: true, message: "Select consultation time" },
                    // ]}
                  >
                    <Select placeholder="Select a option below" allowClear>
                      {listSlot.data?.map((det, index) => {
                        return (
                          <Option value={det} key={index}>
                            {det}
                          </Option>
                        );
                      })}
                    </Select>
                  </Form.Item>

                  <Form.Item>
                    <Button htmlType="submit">Submit</Button>
                  </Form.Item>
                </Form>
              </div>
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
};

export default Doctorlist;
