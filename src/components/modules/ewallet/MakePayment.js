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

function MakePayments() {
  const navigate = useNavigate();
  const [editResults, seteditResults] = React.useState(false);
  const editfield = () => seteditResults(false);

  const [user, setuser] = useState([]);


  const [user1, setuser1] = useState([]);

  const [form, setform] = useState([]);
  

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
        "https://aquinapi.aquin.us/api/v1/admin/coinexchange/getall-withdrawalreq",
        {},

        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(
        (res) => {
          setuser(res.data.withdrawalRequests);
         
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
    let myUser = { ...user1 };
    myUser[e.target.name] = e.target.value;
    setuser1(myUser);
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
    const data = {
      description: form.description,
    };
    const token = sessionStorage.getItem("token");
    axios
      .put(
        "https://aquinapi.aquin.us/api/v1/admin/coinexchange/approve-withdrawalreq" +
          "/" +
          data1,
        data,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(
        (res) => {
          console.log(res);
          if (res.status === 200) {
            // toast(res.message);
            getCategory();
            setShow(false);
          } else {
            // toast(res.message);
            getCategory();
            setShow(false);
          }
        },
        (error) => {
          if (error.response && error.response.status === 400) {
            // toast(error.response.message);
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

  const deletereq = (data) => {
    const data1 = data._id;
    // const data = {
    //   description: form.description,
    // };
    const token = sessionStorage.getItem("token");
    axios
      .put(
        "https://aquinapi.aquin.us/api/v1/admin/coinexchange/decline-withdrawalreq" +
          "/" +
          data1,
        {},

        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(
        (res) => {
          
          if (res.status === 200) {
            // toast(res.message);
            getCategory();
            setShow(false);
          } else {
            // toast(res.message);
            getCategory();
            setShow(false);
          }
        },
        (error) => {
          if (error.response && error.response.status === 400) {
            toast(error.response.message);
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
      deletereq(data);
    }
  };

  const [forms, setforms] = useState([]);

  const handlechanged = (e) => {
    let myUser = { ...forms };
    myUser[e.target.name] = e.target.value;
    setforms(myUser);

    var token = sessionStorage.getItem("token");
    axios
      .post(
        `https://aquinapi.aquin.us/api/v1/admin/coinexchange/getall-withdrawalreq?searchQueryParams=${e.target.value}`,
        {},

        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        setuser(res.data.withdrawalRequests);
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
                ,<Typography color="text.primary">Make Payments</Typography>
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
                      placeholder="Search Id"
                      name="search"
                      value={forms.search}
                      onChange={handlechanged}
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
                        <th>S.No</th>
                        <th>User Id</th>
                        <th>User Name</th>
                        <th>Coins</th>
                        <th>Today Coin Price</th>
                        <th>Total Amount</th>
                        <th>Tax %</th>
                        <th>Net Payable </th>
                        <th>Date</th>
                        <th>Account Details</th>
                        <th style={{ width: "150px" }}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {lists.map((data, i) => {
                        return (
                          <tr key={i}>
                            <td>{(pageNumber - 1) * 10 + i + 11}</td>
                            <td>{data.userRefid}</td>
                            <td>{data.userName}</td>
                            <td>{data.requestcoins}</td>
                            <td>{data.todayCoinPrice}</td>
                            <td>{data.coinValue}</td>
                            <td>{data.tax}</td>
                            <td>{data.netPayable}</td>
                            <td>{data.requestDate}</td>
                            {/* <td>{data.refNumber}</td>
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

                            <td>
                              <small>
                                <b>Bank Name</b> : <span>{data.BankName}</span>
                              </small>
                              <br />
                              <small>
                                <b>A/C No</b> :{" "}
                                <span>{data.accountNumber}</span>
                              </small>
                              <br />
                              <small>
                                <b>A/C Type</b> :{" "}
                                <span>{data.accountType}</span>
                              </small>
                              <br />
                              <small>
                                <b>IFSC</b> : <span>{data.ifscCode}</span>
                              </small>
                            </td>
                            <td>
                              {data.status == "completed" ? (
                                <>
                                  <button
                                    type="button"
                                    class="btn btn-outline-danger btn-sm m-1"
                                    // onClick={() => {
                                    //   getpopup(data);
                                    // }}
                                  >
                                    Paid
                                  </button>
                                  {/* <button
                                    type="button"
                                    class="btn btn-outline-danger btn-sm"
                                    onClick={() => {
                                        manageDelete(data);
                                      }}
                                  >
                                    Delete
                                  </button> */}
                                </>
                              ) : (
                                <>
                                  <button
                                    type="button"
                                    class="btn btn-outline-primary btn-sm m-1"
                                    onClick={() => {
                                      getpopup(data);
                                    }}
                                  >
                                    Pay
                                  </button>
                                  {/* <button
                                type="button"
                                class="btn btn-outline-warning btn-sm m-1"
                              >
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
                                </>
                              )}
                            </td>
                          </tr>
                        );
                      })}

                      {/* <tr>
                      <td>1</td>
                      <td>00001</td>
                      <td>senkar</td>
                      <td>100</td>
                      <td>10</td>
                      <td>1000</td>
                      <td>10 %</td>
                      <td>900</td>
                      <td>15/11/2022</td>
                      <td>
                        <p><b>Bank Name</b> : <span>SBI</span></p>
                        <p><b>A/C No</b> : <span>095840958094</span></p>
                        <p><b>IFSC</b> : <span>SBI0895</span></p>
                        <p><b>Bank Branch</b> : <span>kphb</span></p>
                      </td>
                      <td>
                        <button type="button" class="btn btn-outline-primary btn-sm m-1">
                          Pay
                        </button>
                        <button type="button" class="btn btn-outline-warning btn-sm m-1">
                          Hold
                        </button>
                        <button type="button" class="btn btn-outline-danger btn-sm">
                          Delete
                        </button>
                      </td>
                    </tr> */}
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
              <h5>Payout Detail</h5>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="mt-3 mt-lg-4">
              <form
                onSubmit={(e) => {
                  handleSubmit1(e);
                }}
              >
                <Row>
                  <Col>
                    <label className="mb-3">Enter Transaction Details: </label>
                    <textarea
                      type="text"
                      className="form-control"
                      placeholder="Enter Details"
                      required
                      name="description"
                      //   value={form.coins}
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
      </Box>
    </div>
  );
}

export default MakePayments;
