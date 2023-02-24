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

function Support() {
  const navigate = useNavigate();
  const [editResults, seteditResults] = React.useState(false);
  const editfield = () => seteditResults(false);

  const [user, setuser] = useState([]);

  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  const [user1, setuser1] = useState([]);

  useEffect(() => {
    getCategory();
  }, []);

  const getCategory = () => {
    var token = sessionStorage.getItem("token");
    axios
      .post(
        "https://aquinapi.aquin.us/api/v1/admin/support/getallsupports",
        {},

        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(
        (res) => {
          setuser(res.data.supportResult);
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

  const [user2, setuser2] = useState([]);

  const getpopup1 = (data) => {
    setuser2(data);
    handleShow2();
  };

  const handleSubmit1 = (e) => {
    e.preventDefault();
    updateCategory();
  };

  const updateCategory = () => {
    const data1 = user1._id;
    const dataArray = new FormData();

    dataArray.append("supportStatus", user1.supportStatus);
    const datas = {
      supportStatus: user1.supportStatus,
    };
    var token = sessionStorage.getItem("token");

    axios
      .patch(
        "https://aquinapi.aquin.us/api/v1/admin/support/editsupportstatus" +
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
    <Link underline="hover" key="1" color="inherit">
      Dashboard
    </Link>,

    <Typography key="3" color="text.primary">
      Support
    </Typography>,
  ];

  const [forms, setforms] = useState([]);
  const handlechanged = (e) => {
    let myUser = { ...forms };
    myUser[e.target.name] = e.target.value;
    setforms(myUser);

    var token = sessionStorage.getItem("token");
    axios
      .post(
        `https://aquinapi.aquin.us/api/v1/admin/support/getallsupports?userName=${e.target.value}`,
        {},

        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        setuser(res.data.supportResult);
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
            ,<Typography color="text.primary">Support</Typography>
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
                          placeholder="Search "
                          value={forms.search}
                          onChange={handlechanged}
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
                                  <th>UserName</th>
                                  <th>Title</th>
                                  <th>Description</th>
                                  <th>Image</th>
                                  <th>TicketNumber</th>
                                  <th>SupportStatus</th>
                                  <th>Actions</th>
                                </tr>
                              </thead>
                              <tbody>
                                {/* .filter((value) => {
                                if (search === !null) {
                                  return value;
                                } else if (
                                  value.description
                                    .toLowerCase()
                                    .includes(search.toLowerCase())
                                ) {
                                  return value;
                                }
                              }) */}
                                {lists.map((data, i) => {
                                  return (
                                    <tr key={i}>
                                      <td>{(pageNumber - 1) * 10 + i + 11}</td>
                                      <td>{data.userName}</td>
                                      <td>{data.title}</td>
                                      <td>{data.description}</td>
                                      <td>
                                        {" "}
                                        <img
                                          src={
                                            "https://aquinapi.aquin.us" +
                                            "/" +
                                            data.image
                                          }
                                          height="50"
                                          alt="alt"
                                          onClick={() => {
                                            getpopup1(data);
                                          }}
                                        />
                                      </td>
                                      <td>{data.ticketNumber}</td>
                                      {/* <td>{data.ticketNumber}</td> */}

                                      <td>
                                        {data.supportStatus == "resolved" ? (
                                          <span
                                            class="badge badge-sucess"
                                            style={{
                                              background: "green",
                                              color: "white",
                                            }}
                                          >
                                            {data.supportStatus}
                                          </span>
                                        ) : (
                                          <span
                                            class="badge badge-danger"
                                            style={{ background: "red" }}
                                          >
                                            {data.supportStatus}
                                          </span>
                                        )}
                                      </td>

                                      {/* <td>
                                        <a>
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
                                        />
                                      </td> */}

                                      <td>
                                        {data.supportStatus == "pending" ? (
                                          <>
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
                                            </button>
                                          </>
                                        ) : (
                                          "---"
                                        )}
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
                  <h3>Edit ticket</h3>
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

                    <label className="mt-3">supportStatus :</label>
                    <select
                      className="form-control form-select"
                      required
                      value={user1.supportStatus}
                      name="supportStatus"
                      onChange={(e) => {
                        handleChange1(e);
                      }}
                    >
                      <option value="resolved">Resolved</option>
                      <option value="pending">Pending</option>
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
              show={show2}
              onHide={handleClose2}
              style={{ marginTop: "80px" }}
            >
              <Modal.Header closeButton>
                <Modal.Title>
                  <h3>Ticket image</h3>
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div>
                  {" "}
                  <img
                    src={"https://aquinapi.aquin.us" + "/" + user2.image}
                    width="100%"
                    alt="alt"
                  />
                </div>
              </Modal.Body>
            </Modal>
          </React.Fragment>
        </Box>
      </Box>
    </div>
  );
}

export default Support;
