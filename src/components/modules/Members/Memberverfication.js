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
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

function Memberverfication() {
  const navigate = useNavigate();
  const [editResults, seteditResults] = React.useState(false);
  const editfield = () => seteditResults(false);

  const [user, setuser] = useState([]);

  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);
  const [user1, setuser1] = useState([]);
  const [user0, setuser0] = useState([]);
  console.log(user0);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [show0, setShow0] = useState(false);
  const handleClose0 = () => setShow0(false);
  const handleShow0 = () => setShow0(true);
  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  useEffect(() => {
    getCategory();
  }, []);

  const getCategory = () => {
    var token = sessionStorage.getItem("token");
    axios
      .post(
        "https://aquinapi.aquin.us/api/v1/admin/bankkyc/getallkyc",
        {},

        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(
        (res) => {
          setuser(res.data.kycsResult);
        },
        (error) => {
          if (error.response && error.response.status === 400) {
            toast(error.response.data.message);
          } else if (error.response && error.response.status === 401) {
            toast(error.response.data.message);
            navigate("/login");
          }
        }
      );
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

  const [search, setsearch] = useState("");
  const [listPerPage] = useState(10);
  const [pageNumber, setPageNumber] = useState(0);

  const pagesVisited = pageNumber * listPerPage;
  const lists = user.slice(pagesVisited, pagesVisited + listPerPage);
  const pageCount = Math.ceil(user.length / listPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const handleChange1 = (e) => {
    let myUser = { ...user1 };
    myUser[e.target.name] = e.target.value;
    setuser1(myUser);
  };
  const getpopup = (data) => {
    setuser1(data);
    handleShow1();
    handleSubmit1(data);
  };

  const handleSubmit1 = (e) => {
    e.preventDefault();
    updateCategory();
  };

  const updateCategory = () => {
    const data1 = user1._id;
    // const dataArray = new FormData();

    // dataArray.append("supportStatus", user1.supportStatus);
    const datas = {
      kycStatus: user1.kycStatus,
    };
    var token = sessionStorage.getItem("token");

    axios
      .put(
        "https://aquinapi.aquin.us/api/v1/admin/bankkyc/edit-kycstatus" +
          "/" +
          data1,
        datas,
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
          } else if (error.response && error.response.status === 401) {
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
        "https://aquinapi.aquin.us/api/v1/admin/support/removesupport" +
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
          } else if (error.response && error.response.status === 401) {
            toast(error.response.data.message);
            navigate("/login");
          }
        }
      );
  };

  const breadcrumbs = [
    <Link to="/dashboard" underline="hover" key="1" color="inherit">
      Dashboard
    </Link>,

    <Typography key="3" color="text.primary">
      Member Verfication
    </Typography>,
  ];

  const getpopimg = (data) => {
    setuser0(data);
    handleShow();
  };
  const getpopimg1 = (data) => {
    setuser0(data);
    handleShow0();
  };
  const getpopimg2 = (data) => {
    setuser0(data);
    handleShow2();
  };

  const [forms, setforms] = useState([]);

  const handlechange = (e) => {
    let myUser = { ...forms };
    myUser[e.target.name] = e.target.value;
    setforms(myUser);

    var token = sessionStorage.getItem("token");
    axios
      .post(
        `https://aquinapi.aquin.us/api/v1/admin/bankkyc/getallkyc?kycStatus=${e.target.value}`,
        {},

        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        setuser(res.data.kycsResult);
      });
  };

  return (
    <div>
      <Box sx={{ display: "flex" }} className="mainn">
        <div className="backgrounimgstyle">
          <Sidebar />
        </div>
        <div className="drawecontent">
          <Sidebarres />
        </div>
        <CssBaseline />
        <Box component="main" sx={{ flexGrow: 2, p: 4 }} id="rr">
          <Breadcrumbs aria-label="breadcrumb" style={{ paddingTop: "70px" }}>
            <Link to="/dashboard" underline="hover" key="1" color="inherit">
              Dashboard
            </Link>
            ,<Typography color="text.primary">Member Verfication</Typography>
          </Breadcrumbs>
          <React.Fragment>
            <Row style={{ paddingTop: "30px" }}>
              <Col xs="12">
                <Card id="cards">
                  <CardBody>
                    <Row>
                      <Col></Col>
                    </Row>
                    <div className="col vbtn" style={{ float: "right" }}>
                      <Form.Group controlId="formBasicEmail">
                        <Form.Control
                          type="text"
                          placeholder="Search"
                          // onChange={(e) => {
                          //   setsearch(e.target.value);
                          // }}
                          name="search"
                          value={forms.search}
                          onChange={handlechange}
                        />
                      </Form.Group>
                    </div>
                    <Row className="mt-5">
                      <Col>
                        {user.length >= 1 ? (
                          <div className="table-responsive">
                            <Table
                              striped
                              bordered
                              responsive
                              hover
                              id="empTable"
                            >
                              <thead>
                                <tr>
                                  <th>S.No</th>
                                  <th>User Name</th>
                                  <th>Bank Name</th>
                                  <th>Account Type</th>
                                  <th>Account Name</th>
                                  <th>Account Number</th>
                                  <th>IFCS Code</th>
                                  {/* <th>passportSizeImage</th> */}
                                  <th>Passbook Image</th>
                                  <th>Aadhaar Number</th>
                                  <th>Aadhaar Image</th>
                                  <th>Pan Number</th>
                                  <th>Pan Image</th>
                                  <th>kyc Status</th>
                                  <th>Actions</th>
                                </tr>
                              </thead>
                              <tbody>
                                {lists.map((data, i) => {
                                  return (
                                    <tr key={i}>
                                      <td>{(pageNumber - 1) * 10 + i + 11}</td>
                                      <td>{data.userName}</td>
                                      <td>{data.bankName}</td>
                                      <td>{data.accountType}</td>
                                      <td>{data.accountHolderName}</td>
                                      <td>{data.accountNumber}</td>
                                      <td>{data.ifscCode}</td>

                                      <td>
                                        {" "}
                                        <img
                                          style={{ cursor: "pointer" }}
                                          onClick={() => {
                                            getpopimg(data);
                                          }}
                                          src={
                                            "https://aquinapi.aquin.us" +
                                            "/" +
                                            data.passCheckbookCopy
                                          }
                                          height="50"
                                          alt="alt"
                                        />
                                      </td>
                                      <td>{data.pancardNumber}</td>
                                      <td>
                                        {" "}
                                        <img
                                          style={{ cursor: "pointer" }}
                                          onClick={() => {
                                            getpopimg1(data);
                                          }}
                                          src={
                                            "https://aquinapi.aquin.us" +
                                            "/" +
                                            data.pancardImage
                                          }
                                          height="50"
                                          alt="alt"
                                        />
                                      </td>
                                      <td>{data.aadhaarcardNumber}</td>
                                      <td>
                                        {" "}
                                        <img
                                          style={{ cursor: "pointer" }}
                                          onClick={() => {
                                            getpopimg2(data);
                                          }}
                                          src={
                                            "https://aquinapi.aquin.us" +
                                            "/" +
                                            data.pancardImage
                                          }
                                          height="50"
                                          alt="alt"
                                        />
                                      </td>
                                      {/* <td>
                                      <img
                                        src={
                                          "https://aquinapi.aquin.us" +
                                          "/" +
                                          data.image
                                        }
                                        height="50"
                                        alt="alt"
                                      />
                                    </td> */}
                                      <td>{data.kycStatus}</td>

                                      <td>
                                        {/* <a>
                                        <EditIcon
                                          onClick={() => {
                                            getpopup(data);
                                          }}
                                          style={{ color: "#0D558F" }}
                                        />
                                      </a>

                                      <DeleteForeverIcon
                                        onClick={() => {
                                          manageDelete(data);
                                        }}
                                        style={{ color: "red" }}
                                      /> */}

                                        {data.kycStatus == "pending" ? (
                                          <button
                                            type="button"
                                            class="btn btn-outline-success btn-sm m-1"
                                            onClick={() => {
                                              getpopup(data);
                                            }}
                                          >
                                            <i
                                              class="fa fa-pencil-square-o"
                                              aria-hidden="true"
                                            ></i>
                                          </button>
                                        ) : (
                                          <p>---</p>
                                        )}

                                        {/* <button
                                        type="button"
                                        class="btn btn-outline-danger btn-sm m-1"
                                        onClick={() => {
                                          manageDelete(data);
                                        }}
                                      >
                                        <i
                                          class="fa fa-trash-o"
                                          aria-hidden="true"
                                        ></i>
                                      </button> */}
                                      </td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </Table>
                          </div>
                        ) : (
                          <center style={{ padding: "30px" }}>
                            {" "}
                            <h6>No Data Found</h6>
                          </center>
                        )}
                        <ToastContainer />
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
              show={show1}
              onHide={handleClose1}
              style={{ marginTop: "80px" }}
            >
              <Modal.Header closeButton>
                <Modal.Title>
                  <h3>Edit member status</h3>
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <form
                  method="post"
                  onSubmit={(e) => {
                    handleSubmit1(e);
                  }}
                >
                  <div class="container">
                    {/* <label> supportStatus</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter State Name"
                      required
                      name="supportStatus"
                      value={user1.supportStatus}
                      onChange={(e) => {
                        handleChange1(e);
                      }}
                    /> */}

                    <label className="mt-3">Support Status :</label>
                    <select
                      className="form-control form-select mt-2"
                      required
                      value={user1.kycStatus}
                      name="kycStatus"
                      onChange={(e) => {
                        handleChange1(e);
                      }}
                    >
                      <option value="">Select</option>
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="cancelled">Cancelled</option>
                    </select>

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

            <Modal
              show={show}
              // size="sm"
              style={{ marginTop: "100px" }}
              onHide={handleClose}
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title>Passbook Image </Modal.Title>
                <span
                  onClick={handleClose}
                  style={{ float: "right", fontSize: "20px" }}
                >
                  {/* <i class="fa fa-times-circle" aria-hidden="true"></i> */}
                </span>
              </Modal.Header>
              <Modal.Body>
                <img
                  // onClick={handleShow}
                  className=""
                  src={
                    "https://aquinapi.aquin.us" + "/" + user0.passCheckbookCopy
                  }
                  style={{ width: "100%" }}
                  alt="Generic placeholder"
                />
              </Modal.Body>
            </Modal>

            <Modal
              show={show0}
              // size="sm"
              style={{ marginTop: "100px" }}
              onHide={handleClose0}
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title>Aadhaar Image </Modal.Title>
                <span
                  onClick={handleClose1}
                  style={{ float: "right", fontSize: "20px" }}
                >
                  {/* <i class="fa fa-times-circle" aria-hidden="true"></i> */}
                </span>
              </Modal.Header>
              <Modal.Body>
                <img
                  // onClick={handleShow}
                  className=""
                  src={
                    "https://aquinapi.aquin.us" + "/" + user0.aadhaarcardImage
                  }
                  style={{ width: "100%" }}
                  alt="Generic placeholder"
                />
              </Modal.Body>
            </Modal>
            <Modal
              show={show2}
              // size="sm"
              style={{ marginTop: "100px" }}
              onHide={handleClose2}
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title>Pan Image </Modal.Title>
                <span
                  onClick={handleClose2}
                  style={{ float: "right", fontSize: "20px" }}
                >
                  {/* <i class="fa fa-times-circle" aria-hidden="true"></i> */}
                </span>
              </Modal.Header>
              <Modal.Body>
                <img
                  // onClick={handleShow}
                  className=""
                  src={"https://aquinapi.aquin.us" + "/" + user0.pancardImage}
                  style={{ width: "100%" }}
                  alt="Generic placeholder"
                />
              </Modal.Body>
            </Modal>
          </React.Fragment>
        </Box>
      </Box>
    </div>
  );
}

export default Memberverfication;
