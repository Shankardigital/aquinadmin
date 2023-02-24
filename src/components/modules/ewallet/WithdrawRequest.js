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

function Makepayments() {
  const navigate = useNavigate();
  const [editResults, seteditResults] = React.useState(false);
  const editfield = () => seteditResults(false);

  const [user, setuser] = useState([]);
  const [user2, setuser2] = useState([]);
  const [user0, setuser0] = useState([]);
  console.log(user0);

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

  const [form, setform] = useState([]);
  const [form1, setform1] = useState([]);
  const [divsss, setdivss] = useState("");

  console.log(divsss);

  const handleChange1 = (e) => {
    let myUser = { ...form };
    myUser[e.target.name] = e.target.value;
    setform(myUser);
    // const divs = user2.wallet - e.target.value;
    // setdivss(divs);
  };
  const handleChange3 = (e) => {
    let myUser = { ...form };
    myUser[e.target.name] = e.target.value;
    setform(myUser);
    // const divs = user2.wallet - e.target.value;
    // setdivss(divs);
  };
  const handleChange2 = (e) => {
    let myUser = { ...form1 };
    myUser[e.target.name] = e.target.value;
    setform1(myUser);
  };

  useEffect(() => {
    getCategory();
  }, []);

  const getCategory = () => {
    var token = sessionStorage.getItem("token");
    axios
      .post(
        "https://aquinapi.aquin.us/api/v1/admin/wallet/getall-withdrawalcoin",
        {},

        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(
        (res) => {
          setuser(res.data.data);
          console.log(res.data.data);
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

  const withdrowcoin = () => {
    var token = sessionStorage.getItem("token");
    const userdata = user2.user_id;
    const params = {
      user_id: userdata,
      // RxMemberUser_id: form.RxMemberUser_id,
      withdrawCoins: parseInt(form.withdrawCoins),
    };
    axios
      .patch(
        "https://aquinapi.aquin.us/api/v1/admin/wallet/managemembercoin",
        params,

        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(
        (res) => {
          // setuser(res.data.txCoinResult);
          console.log(res.data);
          handleClose();
          getCategory();
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

  const Transferuser = () => {
    var token = sessionStorage.getItem("token");
    const params = {
      user_id: form1.user_id,
      // admincoins:form.admincoins,
    };
    axios
      .post(
        "https://aquinapi.aquin.us/api/v1/admin/txfercoin/getmemberwalletInfo",
        params,

        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(
        (res) => {
          setuser2(res.data.userCoinInfo);
          setuser0(res.data);


          console.log(res.data.userCoinInfo);
          // handleClose()
          // getCategory()
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

  const handlesubmit = (e) => {
    e.preventDefault();
    withdrowcoin();
    setform("");
    setuser2("");
  };
  const handlesubmit2 = (e) => {
    e.preventDefault();
    Transferuser();
  };

  const [forms, setforms] = useState([]);
  const handlechange = (e) => {
    let myUser = { ...forms };
    myUser[e.target.name] = e.target.value;
    setforms(myUser);

    var token = sessionStorage.getItem("token");
    axios
      .post(
        `https://aquinapi.aquin.us/api/v1/admin/wallet/getall-withdrawalcoin?searchQueryParams=${e.target.value}`,
        {},

        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        setuser(res.data.data);
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
        <Box component="main" sx={{ flexGrow: 2, p: 4 }}>
          <Breadcrumbs aria-label="breadcrumb" style={{ paddingTop: "70px" }}>
            <Link to="/dashboard" underline="hover" key="1" color="inherit">
              Dashboard
            </Link>
            ,<Typography color="text.primary">Withdraw Coins</Typography>
          </Breadcrumbs>
          <React.Fragment>
            <Row style={{ paddingTop: "30px" }}>
              <Col xs="12">
                <Card id="cards">
                  <CardBody>
                    <Row className="mt-3">
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
                      </Col>
                      <Col>
                        <div className="row">
                          <div className="col">
                            <div style={{ float: "right" }}>
                              <Button
                                className="btn btn-primary float-right"
                                style={{ color: "white" }}
                                onClick={handleShow}
                              >
                                Withdraw
                              </Button>
                            </div>
                          </div>
                          <div className="col">
                            <Form.Group controlId="formBasicEmail">
                              <Form.Control
                                type="text"
                                // onChange={(e) => {
                                //   setsearch(e.target.value);
                                // }}
                                placeholder="Search Id"

                                name="search"
                                value={forms.search}
                                onChange={handlechange}
                              />
                            </Form.Group>
                          </div>
                        </div>
                      </Col>
                    </Row>

                    <Row className="mt-3">
                      <Col>
                        {user.length >= 1 ? (
                          <Table striped bordered hover id="empTable">
                            <thead>
                              <tr>
                                <th>Sl.No</th>
                                <th>User Id</th>
                                <th>User Name</th>
                                {/* <th>Total Coins</th> */}
                                <th>Withdraw Coins</th>
                                <th>Date</th>
                              </tr>
                            </thead>
                            <tbody>
                              {lists
                                // .filter((value) => {
                                //   if (search === !null) {
                                //     return value;
                                //   } else if (
                                //     value.userName
                                //       .toLowerCase()
                                //       .includes(search.toLowerCase())
                                //   ) {
                                //     return value;
                                //   }
                                // })
                                .map((data, i) => {
                                  return (
                                    <tr key={i}>
                                      <td>{(pageNumber - 1) * 10 + i + 11}</td>
                                      <td>{data.user_id}</td>
                                      <td>{data.name}</td>
                                      {/* <td>{data.wallet}</td> */}
                                      <td>{data.coinsDebit}</td>
                                      <td>{data.date}</td>
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
              <Modal.Header closeButton>
                <Modal.Title>
                  <h3>Withdraw Coins</h3>
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="mt-3 mt-lg-4">
                  <form
                    className="mb-3 mt-lg-4"
                    onSubmit={(e) => {
                      handlesubmit2(e);
                    }}
                  >
                    <div className="row">
                      <div className="col-8">
                        <label className="mb-1"> User Id </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter User Id"
                          required
                          name="user_id"
                          onChange={(e) => {
                            handleChange2(e);
                          }}
                        />
                      </div>
                      <div className="col-4">
                        <div className="row mt-4 ">
                          <div className="col-sm-12">
                            <div>
                              <button
                                type="submit"
                                className="btn btn-info text-white w-md"
                              >
                                Check
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                  {user0.userCoinInfo == null ? (
                    <p>No Data Found</p>
                  ) : (
                    <>
                      <div className="row">
                        <div className="col">
                          <p>
                            <b>User Name = {user2.name}</b>
                          </p>
                        </div>
                        <div className="col">
                          <p>
                            <b>Available Coins = {user2.wallet}</b>
                          </p>
                        </div>
                      </div>

                      <form
                        onSubmit={(e) => {
                          handlesubmit(e);
                        }}
                      >
                        {/* <label>Transfer Id </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter User Id"
                          required
                          name="RxMemberUser_id"
                          onChange={(e) => {
                            handleChange1(e);
                          }}
                        /> */}

                        <label className="mt-3">Withdraw Coins</label>
                        <input
                          type="text"
                          className="form-control mt-2"
                          placeholder="Enter Coins"
                          required
                          // max={user2.wallet}
                          // value={form.admincoins}
                          name="withdrawCoins"
                          onChange={(e) => {
                            handleChange3(e);
                          }}
                        />
                        {/* <select
                      className="form-control form-select"
                      required
                      name="status"
                    >
                      <option value="">select</option>
                      <option value="true">Active</option>
                      <option value="false">Inactive</option>
                    </select> */}

                        <div className="row mt-3 mb-3">
                          <div className="col-sm-12">
                            <div style={{ float: "right" }}>
                              <button
                                type="submit"
                                className="btn btn-danger w-md m-1"
                                onClick={handleClose}
                              >
                                Cancel
                              </button>

                              <button
                                type="submit"
                                className="btn btn-primary w-md m-1"
                              >
                                Submit
                              </button>
                            </div>
                          </div>
                        </div>
                      </form>
                    </>
                  )}
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

export default Makepayments;
