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
import ReactPaginate from "react-paginate";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import html2canvas from "html2canvas";
import pdfMake from "pdfmake";
import Sidebarres from "../../sidebar/Sidebarres";
import axios from "axios";
import Typography from "@mui/material/Typography";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Earnings() {
  const navigate = useNavigate();
  const [editResults, seteditResults] = React.useState(false);
  const editfield = () => seteditResults(false);

  const [user, setuser] = useState([]);
  console.log(user._id);
  const [user1, setuser1] = useState([]);
  // const [form, setform] = useState([]);
  console.log(user1._id);
  const [form, setform] = useState([]);
  console.log(form);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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

  const handleChange = (e) => {
    let myUser = { ...form };
    myUser[e.target.name] = e.target.value;
    setform(myUser);
  };

  useEffect(() => {
    getCategory();
  }, []);

  const getCategory = () => {
    var token = sessionStorage.getItem("token");
    axios
      .post(
        "https://aquinapi.aquin.us/api/v1/admin/earning/getallearninglist",
        {},

        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(
        (res) => {
          setuser(res.data.earningResult);
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

  // const handleSubmit1 = (e) => {
  //   e.preventDefault();
  //   Approval();
  // };

  // const Approval = () => {
  //   var token = sessionStorage.getItem("token");

  //   const id = form._id;
  //   console.log(id)
  //   const params = {
  //     status: form.approved,
  //   };
  //   axios
  //     .post(
  //       "https://aquinapi.aquin.us/api/v1/admin/userpay/editpaystatus" +
  //         "/" +
  //         id,
  //       params,

  //       {
  //         headers: { Authorization: `Bearer ${token}` },
  //       }
  //     )
  //     .then((res) => {
  //       setuser(res.data.payResult);
  //       console.log(res.data.payResult);
  //     });
  // };

  // const getpop = (data) => {
  //   setform(data);
  //   handleShow();
  // };

  const handleChange1 = (e) => {
    let myUser = { ...form };
    myUser[e.target.name] = e.target.value;
    setform(myUser);
  };

  const handleSubmit1 = (e) => {
    e.preventDefault();
    updateCategory();
  };

  const getpopup = (data) => {
    handleShow();
    setform(data);
  };

  const updateCategory = () => {
    const data1 = form._id;
    const data2 = {
      coins: form.coins,
    };
    const token = sessionStorage.getItem("token");
    axios
      .post(
        "https://aquinapi.aquin.us/api/v1/admin/earning/editearning" +
          "/" +
          data1,
        data2,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(
        (res) => {
          console.log(res);
          if (res.status === 200) {
            toast(res.data.message);
            getCategory();
            handleClose();
          } else {
            toast(res.data.message);
            getCategory();
            handleClose();
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
    // .then((response) => {

    //   if(response.status==200)
    //   {
    //       toast("Employee status updated successfully");
    //       setmodal_list1(false);
    //       getCategory();
    //   }
    //   else
    //   {
    //       toast("Employee status updated successfully");
    //       setmodal_list1(false);
    //       getCategory();
    //   }

    // })
    // .catch((error) => {
    //   if(!error)
    //   {
    //       toast("Not Updated.Please try again");
    //   }
    //   else
    //   {
    //       toast("Not Updated.Please try again");
    //   }
    // });
  };

  const manageDelete = (data) => {
    const confirmBox = window.confirm("Do you really want to Delete?");
    if (confirmBox === true) {
      deletecoin(data);
    }
  };

  const deletecoin = (data) => {
    const data1 = data._id;
    const token = sessionStorage.getItem("token");
    axios
      .put(
        "https://aquinapi.aquin.us/api/v1/admin/earning/disableearning" +
          "/" +
          data1,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(
        (res) => {
          console.log(res);
          if (res.status === 200) {
            toast(res.data.message);
            // getCategory();
            // handleClose();
          } else {
            toast(res.data.message);
            // getCategory();
            // handleClose();
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

  const [forms, setforms] = useState([]);
  const handlechange = (e) => {
    let myUser = { ...forms };
    myUser[e.target.name] = e.target.value;
    setforms(myUser);

    var token = sessionStorage.getItem("token");
    axios
      .post(
        `https://aquinapi.aquin.us/api/v1/admin/earning/getallearninglist?searchQueryParams=${e.target.value}`,
        {},

        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        setuser(res.data.earningResult);
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
          <Row className="mb-3" style={{ paddingTop: "70px" }}>
            <Col>
              {" "}
              <Breadcrumbs aria-label="breadcrumb">
                <Link to="/dashboard" underline="hover" key="1" color="inherit">
                  Dashboard
                </Link>
                ,<Typography color="text.primary">Earnings</Typography>
              </Breadcrumbs>
            </Col>
          </Row>

          <Card id="cards">
            <CardBody>
              <Row>
                <Col>
                  {/* <ReactHTMLTableToExcel
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
                  </Button> */}
                  {/* <div style={{ float: "right" }}>
                          <Button
                            className="btn btn-primary float-right"
                            style={{ color: "white" }}
                            onClick={handleShow}
                          >
                            + Add New
                          </Button>
                        </div> */}
                </Col>
                <Col>
                  <div style={{ float: "right" }}>
                    <input
                      className="form-control"
                      type="text"
                      // onChange={(e) => {
                      //   setsearch(e.target.value);
                      // }}

                      placeholder="Search Id"
                      name="search"
                      value={forms.search}
                      onChange={handlechange}
                    />
                  </div>
                </Col>
              </Row>

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
              {user.length >= 1 ? (
                <div className="table-responsive mt-3">
                  <Table
                    striped
                    bordered
                    hover
                    id="empTable"
                    responsive
                    className="table-responsive"
                  >
                    <thead>
                      <tr>
                        <th>Sl.No</th>
                        <th>User Id</th>
                        <th>Coins</th>
                        <th>User Name</th>
                        <th>Ref ID</th>
                        {/* <th>Total Amount</th>
                      <th>Tax %</th>
                      <th>Net Payable </th> */}
                        {/* <th>Account Details</th> */}
                        <th>Date</th>
                        <th style={{ width: "150px" }}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {lists.map((data, i) => {
                        return (
                          <tr key={i}>
                            <td>{(pageNumber - 1) * 10 + i + 11}</td>
                            <td>{data.userRefsponsorUserId}</td>
                            <td>{data.coins}</td>
                            <td>{data.userName}</td>

                            <td>{data.userRefid}</td>
                            <td>{data.earningDate}</td>
                            <td>
                              <button
                                onClick={() => {
                                  getpopup(data);
                                }}
                                type="button"
                                class="btn btn-outline-success btn-sm m-1"
                              >
                                Edit
                              </button>
                              {/* <button type="button" class="btn btn-outline-warning btn-sm m-1">
                          Hold
                        </button> */}
                              <button
                                type="button"
                                class="btn btn-outline-danger btn-sm"
                                onClick={() => {
                                  manageDelete(data);
                                }}
                              >
                                Delete
                              </button>
                            </td>
                            {/* <td>{data.selectPackage}</td>
                          <td>{data.upiId}</td>
                          <td>{data.refNumber}</td>
                          <td>{data.message}</td>
                          <td>{data.status == "" ? "pending" : data.status}</td> */}

                            {/* <td>
                            {data.status == "" || data.status == "pending" ? (
                              <button
                                onClick={() => {
                                  getpopup(data);
                                }}
                                className="btn btn-success btn-sm"
                              >
                                Update{" "}
                              </button>
                            ) : (
                              "---"
                            )}
                          </td> */}
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
            </CardBody>
          </Card>
        </Box>

        <Modal show={show} onHide={handleClose} style={{ marginTop: "80px" }}>
          <Modal.Header>
            <Modal.Title>
              <h3>Edit Coins</h3>
            </Modal.Title>
            <span
              onClick={handleClose}
              style={{ float: "right", fontSize: "20px" }}
            >
              <i class="fa fa-times-circle" aria-hidden="true"></i>
            </span>
          </Modal.Header>
          <Modal.Body>
            <div className="mt-3 mt-lg-4">
              <form
                onSubmit={(e) => {
                  handleSubmit1(e);
                }}
              >
                <Row>
                  {/* <Col>
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
                      </Col> */}
                  <Col>
                    <label className="mb-2">Coins: </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter state Name"
                      required
                      name="coins"
                      value={form.coins}
                      onChange={(e) => {
                        handleChange1(e);
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
                        <button type="submit" className="btn btn-primary w-md">
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
        <ToastContainer />
      </Box>
    </div>
  );
}

export default Earnings;
