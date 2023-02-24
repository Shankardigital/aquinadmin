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
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

function Payouts() {
  const navigate = useNavigate();
  const [editResults, seteditResults] = React.useState(false);
  const editfield = () => seteditResults(false);

  const [user, setuser] = useState([]);

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

  const [user0, setuser0] = useState([]);
  console.log(user0);

  const getCategory = () => {
    var token = sessionStorage.getItem("token");
    axios
      .post(
        "https://aquinapi.aquin.us/api/v1/admin/coinexchange/coinexchngwithdrareport",
        {},

        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(
        (res) => {
          setuser(res.data.withdrawalReport);
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

  useEffect(() => {
    getCategory();
  }, []);

  const [forms, setforms] = useState([]);

  const handlechanged = (e) => {
    let myUser = { ...forms };
    myUser[e.target.name] = e.target.value;
    setforms(myUser);

    var token = sessionStorage.getItem("token");
    axios
      .post(
        `https://aquinapi.aquin.us/api/v1/admin/coinexchange/coinexchngwithdrareport?searchQueryParams=${e.target.value}`,
        {},

        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        setuser(res.data.withdrawalReport);
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
            ,<Typography color="text.primary">Withdraw Report</Typography>
          </Breadcrumbs>

          <React.Fragment>
            <Row style={{ paddingTop: "30px" }}>
              <Col xs="12">
                <Card id="cards">
                  <CardBody>
                    <Row>
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
                        <div className="col" style={{ float: "right" }}>
                          <Form.Group controlId="formBasicEmail">
                            <Form.Control
                              type="text"
                              placeholder="Search "
                              value={forms.search}
                              onChange={handlechanged}
                            />
                          </Form.Group>
                        </div>
                      </Col>
                    </Row>

                    <Row className="mt-3">
                      <Col>
                        {user.length >= 1 ? (
                          <Table striped bordered hover id="empTable">
                            <thead>
                              <tr>
                                <th>S.No</th>
                                <th>User Id</th>
                                <th>Name</th>
                                <th>Requested Coins</th>
                                <th>Coin Price</th>
                                <th>Requested Amount</th>
                                <th>Tax</th>
                                <th>Net Amount</th>
                                <th>Date</th>
                                <th>Status</th>
                                {/* <th>Description</th> */}
                              </tr>
                            </thead>
                            <tbody>
                              {lists
                                .filter((value) => {
                                  if (search === !null) {
                                    return value;
                                  } else if (
                                    value.userName
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
                                      <td>{data.userRefid}</td>
                                      <td>{data.userName}</td>
                                      <td>{data.requestcoins}</td>
                                      <td>{data.todayCoinPrice}</td>
                                      <td>{data.coinValue}</td>
                                      <td>{data.tax}</td>
                                      <td>{data.netPayable}</td>
                                      <td>{data.requestDate}</td>
                                      <td>{data.status}</td>
                                      {/* <td>{data.description}</td> */}
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
                  <h3>Add Notifications</h3>
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="mt-5 mt-lg-4">
                  <form>
                    <label> Notifications Name: </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Notifications Name"
                      required
                      name="title"
                    />

                    <label className="mt-3">Status :</label>
                    <select
                      className="form-control form-select"
                      required
                      name="status"
                    >
                      <option value="">select</option>
                      <option value="true">Active</option>
                      <option value="false">Inactive</option>
                    </select>

                    <div className="row mt-3">
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

export default Payouts;
