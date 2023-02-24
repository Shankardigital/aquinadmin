import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Sidebar from "../../sidebar/Sidebar";
import CssBaseline from "@mui/material/CssBaseline";
import { Link } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import EditIcon from "@mui/icons-material/Edit";
import { Row, Col, Card, CardBody, CardTitle, Table } from "reactstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Stack from "@mui/material/Stack";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ReactPaginate from "react-paginate";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import html2canvas from "html2canvas";
import pdfMake from "pdfmake";
import Sidebarres from "../../sidebar/Sidebarres";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Typography from "@mui/material/Typography";
import Select from "react-select";
import {useNavigate} from 'react-router-dom';

function Notifications() {
  const navigate = useNavigate();
  const [editResults, seteditResults] = React.useState(false);
  const editfield = () => seteditResults(false);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [form, setform] = useState({});
  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);
  const [user1, setuser1] = useState([]);
  const [user, setuser] = useState([]);
  const [user3, setuser3] = useState([]);
  console.log(user3);

  const [Files, setFiles] = useState("");

  const [Files1, setFiles1] = useState("");
  const [selectedOptions, setSelectedOptions] = useState();
  const [Names, setNames] = useState([]);
  console.log(selectedOptions);

  const changeHandler = (e) => {
    setFiles(e.target.files);
  };

  const changeHandler1 = (e) => {
    setFiles1(e.target.files);
  };

  const handleChange = (e) => {
    let myUser = { ...form };
    myUser[e.target.name] = e.target.value;
    setform(myUser);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addCategory();
  };

  useEffect(() => {
    getCategory();
    getmemebers();
  }, []);

  const api_url = "https://aquinapi.aquin.us";

  const getCategory = () => {
    var token = sessionStorage.getItem("token");
    axios
      .post(
        "https://aquinapi.aquin.us/api/v1/admin/notify/getallnotify",
        {},

        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        setuser(res.data.notifyResult);
        console.log(res.data.notifyResult);
      },
      (error) => {
        if (error.response && error.response.status === 400) {
          toast(error.response.data.message);
        }else if (error.response && error.response.status === 401){
          toast(error.response.data.message);
          navigate("/login");
        }
      }
      );
  };

  const getmemebers = () => {
    var token = sessionStorage.getItem("token");
    axios
      .post(
        "https://aquinapi.aquin.us/api/v1/admin/member/get-selectmemberlist",
        {},

        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        setuser3(res.data.memberResult);
        console.log(res.data);
      },
      (error) => {
        if (error.response && error.response.status === 400) {
          toast(error.response.data.message);
        }else if (error.response && error.response.status === 401){
          toast(error.response.data.message);
          navigate("/login");
        }
      }
      );
  };

  const optionList = user3.map((response) => ({
    value: response._id,
    label: response.user_id,
  }));
  console.log(optionList);

  function handleSelect(details) {
    ///setSelectedOptions(current => [...current, details.value]);
    setSelectedOptions(details);
    console.log(details);
  }

  const addCategory = () => {
    var IDs = [];
    const dataArray = new FormData();
    dataArray.append("title", form.title);
    dataArray.append("description", form.description);
    console.log(selectedOptions);
    for (let i = 0; i < selectedOptions.length; i++) {
      IDs.push(selectedOptions[i].value);
    }

    dataArray.append("userList", IDs);
    for (let i = 0; i < Files.length; i++) {
      dataArray.append("notifyImg", Files[i]);
    }
    var token = sessionStorage.getItem("token");
    axios
      .post(
        "https://aquinapi.aquin.us/api/v1/admin/notify/addnotify",
        dataArray,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(
        (res) => {
          if (res.status === 200) {
            toast(res.data.message);
            handleClose();
            getCategory();
            clearForm();
          }
        },
        (error) => {
          if (error.response && error.response.status === 400) {
            toast(error.response.data.message);
          }else if (error.response && error.response.status === 401){
            toast(error.response.data.message);
            navigate("/login");
          }
        }
      );
  };

  const handleChange1 = (e) => {
    let myUser = { ...user1 };
    myUser[e.target.name] = e.target.value;
    setuser1(myUser);
  };

  const handleSubmit1 = (e) => {
    e.preventDefault();
    updateCategory();
  };

  const getpopup = (data) => {
    setuser1(data);
    handleShow1();
    handleSubmit1(data);
  };

  const updateCategory = () => {
    const data1 = user1._id;
    const dataArray = new FormData();
    dataArray.append("title", user1.title);
    dataArray.append("description", user1.description);
    dataArray.append("Status", user1.Status);
    for (let i = 0; i < Files1.length; i++) {
      dataArray.append("notifyImg", Files1[i]);
    }
    var token = sessionStorage.getItem("token");

    axios
      .put(
        "https://aquinapi.aquin.us/api/v1/admin/notify/edit-notification" +
          "/" +
          data1,
        dataArray,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(
        (res) => {
          if (res.status === 200) {
            toast(res.data.message);
            handleClose1();
            getCategory();
          }
        },
        (error) => {
          if (error.response && error.response.status === 400) {
            toast(error.response.data.message);
          }else if (error.response && error.response.status === 401){
            toast(error.response.data.message);
            navigate("/login");
          }
        }
      );
  };

  const manageDelete = (data) => {
    const confirmBox = window.confirm("Do you really want to Delete?");
    if (confirmBox === true) {
      deleteUser(data);
    }
  };

  const deleteUser = (data) => {
    var token = sessionStorage.getItem("token");
    const data1 = data._id;
    console.log(data1);
    axios
      .delete(
        "https://aquinapi.aquin.us/api/v1/admin/notify/removenotify" +
          "/" +
          data1,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(
        (res) => {
          if (res.status === 200) {
            toast(res.data.message);
            getCategory();
          }
        },
        (error) => {
          if (error.response && error.response.status === 400) {
            toast(error.response.data.message);
          }else if (error.response && error.response.status === 401){
            toast(error.response.data.message);
            navigate("/login");
          }
        }
      );
  };
  const [search, setsearch] = useState("");
  const [listPerPage] = useState(10);
  const [pageNumber, setPageNumber] = useState(0);

  const pagesVisited = pageNumber * listPerPage;
  const lists = user.slice(pagesVisited, pagesVisited + listPerPage);
  const pageCount = Math.ceil(user.length / listPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const clearForm = () => {
    setform({
      title: "",
      description: "",
    });
  };

  const genPdf = () => {
    html2canvas(document.getElementById("empTable")).then((canvas) => {
      var data = canvas.toDataURL();
      var pdfExportSetting = {
        content: [
          {
            image: data,
            width: 500,
          },
        ],
      };
      pdfMake.createPdf(pdfExportSetting).download("file.pdf");
    });
  };

  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit">
      Dashboard
    </Link>,

    <Typography key="3" color="text.primary">
      BankList
    </Typography>,
  ];

  return (
    <div>
      <Box sx={{ display: "flex" }} className="mainn">
        <div className="backgrounimgstyle">
          <Sidebar />
        </div>
        <div className="drawecontent">
          <Sidebarres />
        </div>
        <Box component="main" sx={{ flexGrow: 2, p: 4 }}>
          <Breadcrumbs aria-label="breadcrumb" style={{ paddingTop: "70px" }}>
            <Link to="/dashboard" underline="hover" key="1" color="inherit">
              Dashboard
            </Link>
            ,<Typography color="text.primary">Notifications</Typography>
          </Breadcrumbs>

          <React.Fragment>
            <Row style={{ paddingTop: "30px" }}>
              <Col xs="12">
                <Card id="cards">
                  <CardBody>
                    {/* <Row>
                      <Col>
                        <ReactHTMLTableToExcel
                          className="btn btn-primary m-2"
                          table="empTable"
                          filename="ReportExcel"
                          sheet="Sheet"
                          buttonText="Excel"
                          style={{ color: "white" }}
                        />
                        <Button
                          type="button"
                          className="btn btn-danger "
                          onClick={genPdf}
                        >
                          Pdf
                        </Button>
                        <div style={{ float: "right" }}>
                          <Button
                            className="btn btn-primary float-right"
                            style={{ color: "white" }}
                            onClick={handleShow}
                          >
                            + Add New
                          </Button>
                         
                        </div>
                      </Col>
                      <Col>
                      <Form.Group controlId="formBasicEmail">
                            <Form.Control
                              type="text"
                              placeholder="Search"
                              onChange={(e) => {
                                setsearch(e.target.value);
                              }}
                            />
                          </Form.Group>
                      </Col>
                    </Row> */}

                    <div className="row">
                      <div className="col col-md-9">
                        {/* <ReactHTMLTableToExcel
                          className="btn btn-primary m-2"
                          table="empTable"
                          filename="ReportExcel"
                          sheet="Sheet"
                          buttonText="Excel"
                        />
                        <Button
                          type="button"
                          className="btn btn-danger "
                          onClick={genPdf}
                        >
                          Pdf
                        </Button> */}
                        <div style={{ float: "right" }}>
                          <Button
                            className="btn btn-primary float-right"
                            onClick={handleShow}
                          >
                            + Add New
                          </Button>
                        </div>
                      </div>
                      <div className="col col-md-3">
                        <div className="col vbtn" style={{ float: "right" }}>
                          <Form.Group controlId="formBasicEmail">
                            <Form.Control
                              type="text"
                              placeholder="Search"
                              onChange={(e) => {
                                setsearch(e.target.value);
                              }}
                            />
                          </Form.Group>
                        </div>
                      </div>
                    </div>

                    <div className="col vbtn" style={{ float: "right" }}></div>
                    <Row className="mt-3">
                      <Col>
                        <Table striped bordered hover id="empTable">
                          <thead>
                            <tr>
                              <th>S.No</th>
                              <th>Title</th>
                              <th>Image</th>
                              <th>Description</th>
                              <th>Status</th>
                              <th style={{ width: "190px" }}>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {lists
                              .filter((value) => {
                                if (search === !null) {
                                  return value;
                                } else if (
                                  value.title
                                    .toLowerCase()
                                    .includes(search.toLowerCase())
                                ) {
                                  return value;
                                }
                              })
                              .map((data, i) => {
                                return (
                                  <tr key={i}>
                                    <td>{(pageNumber - 1) * 10 + i + 11}</td>
                                    <td>{data.title}</td>
                                    <td>
                                      {" "}
                                      <img
                                        src={api_url + "/" + data.image}
                                        style={{
                                          width: "100px",
                                          cursor: "pointer",
                                        }}
                                      ></img>
                                    </td>
                                    <td>{data.description}</td>
                                    <td>
                                      {data.Status === true 
                                        ? "active"
                                        : "Inactive"}
                                    </td>
                                    {/* <td>
                                      {" "}
                                      <EditIcon
                                        onClick={() => {
                                          getpopup(data);
                                        }}
                                        style={{
                                          fontSize: "30px",
                                          color: "black",
                                        }}
                                      />{" "}
                                      <DeleteForeverIcon
                                        onClick={() => {
                                          manageDelete(data);
                                        }}
                                        style={{
                                          fontSize: "30px",
                                          color: "red",
                                        }}
                                      />
                                    </td> */}

                                    <td>
                                      <button
                                        type="button"
                                        class="btn btn-outline-success m-1 btn-sm"
                                        onClick={() => {
                                          getpopup(data);
                                        }}
                                      >
                                        <i
                                          class="fa fa-pencil-square-o"
                                          aria-hidden="true"
                                        ></i>{" "}
                                        Edit
                                      </button>
                                      <button
                                        type="button"
                                        class="btn btn-outline-danger m-1 btn-sm"
                                        onClick={() => {
                                          manageDelete(data);
                                        }}
                                      >
                                        <i
                                          class="fa fa-trash-o"
                                          aria-hidden="true"
                                        ></i>{" "}
                                        Delete
                                      </button>
                                    </td>
                                  </tr>
                                );
                              })}
                          </tbody>
                        </Table>
                        <div className="mt-3" style={{ float: "right" }}>
                          <Stack spacing={2}>
                            <ReactPaginate
                              previousLabel={"Previous"}
                              nextLabel={"Next"}
                              pageCount={pageCount}
                              onPageChange={changePage}
                              containerClassName={"pagination"}
                              previousLinkClassName={"previousBttn"}
                              nextLinkClassName={"nextBttn"}
                              disabledClassName={"disabled"}
                              activeClassName={"active"}
                              total={lists.length}
                            />
                          </Stack>
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            </Row>

            <Modal
              show={show}
              onHide={handleClose}
              style={{ marginTop: "80px" }}
            >
              <Modal.Header>
                <Modal.Title>
                  <h3>Add Notification</h3>
                </Modal.Title>
                <span
                  onClick={handleClose}
                  style={{ float: "right", fontSize: "20px" }}
                >
                  <i class="fa fa-times-circle" aria-hidden="true"></i>
                </span>
              </Modal.Header>
              <Modal.Body>
                <div className="mt-5 mt-lg-4">
                  <form
                    method="post"
                    onSubmit={(e) => {
                      handleSubmit(e);
                    }}
                  >
                    <label className="mb-2">Members :</label>
                    <Select
                      style={{ width: "100%" }}
                      required
                      options={optionList}
                      placeholder="Select Users"
                      value={selectedOptions}
                      // onChange={handleSelect}
                      onChange={handleSelect}
                      isSearchable={true}
                      isMulti
                      name="userList"
                      // selectionLimit="2"
                      // onChange={(v) =>
                      //   v.length < 5 ? handleSelect(v) : null
                      // }
                      // className='basic-multi-select'
                      // classNamePrefix='select'
                    />
                    <label className="mt-3 mb-2"> Notification Name: </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter 
                      Notification Name:"
                      required
                      name="title"
                      value={form.title}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                    />

                    <label className="mt-3 mb-2">Image :</label>
                    <input
                      type="file"
                      className="form-control"
                      name="image"
                      multiple
                      onChange={changeHandler}
                      required
                    />

                    <label className="mt-3 mb-2">Description :</label>
                    <textarea
                      class="form-control "
                      id="exampleFormControlTextarea3"
                      rows="3"
                      name="description"
                      required
                      value={form.description}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                    ></textarea>

                    <div style={{ float: "right" }} className="row mt-3">
                      <div className="col-sm-12">
                        <div>
                        <button
                            type="button"
                            className="btn btn-sm btn-danger m-1 save"
                            style={{
                              width:"90px"
                            }}
                            onClick={handleClose}
                          >
                             Cancel
                          </button>

                          <button
                            type="submit"
                            class="btn btn-sm btn-success save m-1"
                            style={{
                              width:"90px"
                            }}
                          >
                             Submit
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </Modal.Body>
            </Modal>

            <Modal
              show={show1}
              onHide={handleClose1}
              style={{ marginTop: "80px" }}
            >
              <Modal.Header>
                <Modal.Title>
                  <h3>Edit Notification</h3>
                </Modal.Title>
                <span
                  onClick={handleClose1}
                  style={{ float: "right", fontSize: "20px" }}
                >
                  <i class="fa fa-times-circle" aria-hidden="true"></i>
                </span>
              </Modal.Header>
              <Modal.Body>
                <form
                  method="post"
                  onSubmit={(e) => {
                    handleSubmit1(e);
                  }}
                >
                  <div class="container">
                    <label className="mb-2"> Notification Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Notification Name"
                      required
                      name="title"
                      value={user1.title}
                      onChange={(e) => {
                        handleChange1(e);
                      }}
                    />

                    <label className="mt-3 mb-2">Image :</label>
                    <input
                      type="file"
                      className="form-control"
                      name="image"
                      multiple
                      onChange={changeHandler1}
                    />
                    <label className="mt-3 mb-2">Status :</label>
                    <select
                      className="form-control form-select"
                      required
                      value={user1.Status}
                      name="Status"
                      onChange={(e) => {
                        handleChange1(e);
                      }}
                    >
                      <option value="true">Active</option>
                      <option value="false">Inactive</option>
                    </select>

                    <label className="mt-3 mb-2">Description :</label>
                    <textarea
                      class="form-control "
                      id="exampleFormControlTextarea3"
                      rows="3"
                      name="description"
                      required
                      value={user1.description}
                      onChange={(e) => {
                        handleChange1(e);
                      }}
                    ></textarea>
                    <div className="pt-3" style={{ float: "right" }}>
                      <button
                        type="button"
                        class="btn btn-sm btn-danger m-2"
                        onClick={handleClose1}
                      >
                        <i class="fa fa-times-circle"></i>
                        <span aria-hidden="true"> Cancel</span>
                      </button>
                      <button
                        type="submit"
                        class="btn btn-sm btn-primiry "
                        style={{
                          color: "white",
                          background: "rgb(13,85,143)",
                        }}
                      >
                        <i class="fa fa-check-circle"></i> Submit
                      </button>
                    </div>
                  </div>
                </form>
              </Modal.Body>
            </Modal>
          </React.Fragment>
        </Box>
        <ToastContainer />
      </Box>
    </div>
  );
}

export default Notifications;
