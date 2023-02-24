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
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import ReactPaginate from "react-paginate";

import ReactHTMLTableToExcel from "react-html-table-to-excel";
import html2canvas from "html2canvas";
import pdfMake from "pdfmake";
import Sidebarres from "../../sidebar/Sidebarres";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Typography from "@mui/material/Typography";
import { Percent } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

function Memberlevelview() {
  const navigate = useNavigate();

  const [editResults, seteditResults] = React.useState(false);
  const editfield = () => seteditResults(false);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [form, setform] = useState([]);
  console.log(form);

  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);
  const [user1, setuser1] = useState([]);
  const [user, setuser] = useState([]);
  const [user2, setuser2] = useState([]);
  console.log(user2);

  const handleChange = (e) => {
    let myUser = { ...form };
    myUser[e.target.name] = e.target.value;
    setform(myUser);
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   addCategory();
  // };

  useEffect(() => {
    getCategory();
  }, []);

  const getCategory = () => {
    var token = sessionStorage.getItem("token");
    axios
      .get(
        "https://aquinapi.aquin.us/api/v1/admin/userlevel/getalllevels",

        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(
        (res) => {
          setuser(res.data.levels);
          console.log(res.data.levels);
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

  // const addCategory = () => {
  //   const dataArray = new FormData();
  //   dataArray.append("title", form.title);
  //   dataArray.append("status", form.status);
  //   var token = sessionStorage.getItem("token");
  //   axios
  //     .post(
  //       "https://aquinapi.aquin.us/api/v1/admin/bankname/addbankname",
  //       form,
  //       {
  //         headers: { Authorization: `Bearer ${token}` },
  //       }
  //     )
  //     .then(
  //       (res) => {
  //         if (res.status === 200) {
  //           toast(res.data.message);
  //           handleClose();
  //           getCategory();
  //           clearForm();
  //         }
  //       },
  //       (error) => {
  //         if (error.response && error.response.status === 400) {
  //           toast(error.response.data.message);
  //         }
  //       }
  //     );
  // };

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
    setform(data);
    handleShow();
    // setuser1(data);
    // getCategory(data);
  };

  const updateCategory = () => {
    const data1 = form._id;
    const params = {
      coins: parseInt(form.coins),
    };
    // const dataArray = new FormData();
    // dataArray.append("title", user1.title);
    // dataArray.append("description", user1.description);
    // dataArray.append("status", user1.status);
    var token = sessionStorage.getItem("token");

    axios
      .put(
        "https://aquinapi.aquin.us/api/v1/admin/userlevel/editlevelwaisecoin" +
          "/" +
          data1,
        params,

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
        "http://103.186.185.77:5001/api/admin/country/removeone" + "/" + data1,
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
    <Link to="/dashboard" underline="hover" key="1" color="inherit">
      Dashboard
    </Link>,

    <Typography key="3" color="text.primary">
      Member level view
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
            ,<Typography color="text.primary">Level wise Coins</Typography>
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
                    </Row> */}
                    {/* <div className="col vbtn" style={{ float: "right" }}>
                      <Form.Group controlId="formBasicEmail">
                        <Form.Control
                          type="text"
                          placeholder="Search"
                          onChange={(e) => {
                            setsearch(e.target.value);
                          }}
                        />
                      </Form.Group>
                    </div> */}
                    <Row className="mt-5">
                      <Col>
                        {user.length >= 1 ? (
                          <Table striped bordered hover id="empTable">
                            <thead>
                              <tr>
                                <th>S.No</th>
                                <th>level</th>
                                <th>Coins</th>
                                <th style={{ width: "100px" }}>Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {lists.map((data, i) => {
                                return (
                                  <tr key={i}>
                                    <td>{(pageNumber - 1) * 10 + i + 11}</td>
                                    <td>{data.level}</td>
                                    <td>{data.coins}</td>
                                    <td>
                                      <button
                                        type="button"
                                        class="btn btn-outline-success btn-sm"
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
                                    </td>
                                    {/* <td>
                                      {data.status === true ||
                                      data.status == "true"
                                        ? "active"
                                        : "Inactive"}
                                    </td> */}
                                    {/* <td>
                                      <EditIcon
                                        onClick={() => {
                                          getpopup(data);
                                        }}
                                        style={{
                                          fontSize: "30px",
                                          color: "black",
                                        }}
                                      />
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
                                  </tr>
                                );
                              })}
                            </tbody>
                          </Table>
                        ) : (
                          <center style={{ padding: "30px" }}>
                            {" "}
                            <h6>No Data Found</h6>
                          </center>
                        )}
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
                  <h3>Edit Level wise Coins</h3>
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
                    onSubmit={(e) => {
                      handleSubmit1(e);
                    }}
                  >
                    <Row>
                      <Col>
                        <label>Level: </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter state Name"
                          required
                          name="title"
                          value={form.level}
                          disabled
                        />
                      </Col>
                      <Col>
                        <label className="">Coins: </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter state Name"
                          required
                          name="coins"
                          value={form.coins}
                          onChange={(e) => {
                            handleChange(e);
                          }}
                        />
                      </Col>
                    </Row>

                    {/* <label className="mt-3">Status :</label>
                    <select
                      className="form-control form-select"
                      required
                      name="status"
                    >
                      <option value="">select</option>
                      <option value="true">Active</option>
                      <option value="false">Inactive</option>
                    </select> */}

                    <div style={{ float: "right" }}>
                      <div className="row mt-3 mb-4">
                        <div className="col-sm-12">
                          <div>
                            <button
                              type="submit"
                              className="btn btn-primary w-md"
                            >
                              Submit
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </Modal.Body>
            </Modal>
          </React.Fragment>
        </Box>
        <ToastContainer />
      </Box>
    </div>
  );
}

export default Memberlevelview;
