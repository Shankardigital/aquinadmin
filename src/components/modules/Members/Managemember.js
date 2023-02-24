import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Sidebar from "../../sidebar/Sidebar";
import CssBaseline from "@mui/material/CssBaseline";
import {
  Row,
  Col,
  Card,
  CardBody,
  FormGroup,
  Button,
  CardTitle,
  Label,
  Input,
  Table,
} from "reactstrap";
import Form from "react-bootstrap/Form";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import BlockIcon from "@mui/icons-material/Block";
import VisibilityIcon from "@mui/icons-material/Visibility";
import user2 from "../../assets/images/users/user-2.jpg";
import user3 from "../../assets/images/users/user-3.jpg";
import user4 from "../../assets/images/users/user-4.jpg";
import user5 from "../../assets/images/users/user-5.jpg";
import user6 from "../../assets/images/users/user-6.jpg";
import user7 from "../../assets/images/users/user-7.jpg";
import { Link, NavLink } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";

import Modal from "react-bootstrap/Modal";
import Stack from "@mui/material/Stack";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import ReactPaginate from "react-paginate";

import ReactHTMLTableToExcel from "react-html-table-to-excel";
import html2canvas from "html2canvas";
import pdfMake from "pdfmake";
import Sidebarres from "../../sidebar/Sidebarres";
import axios from "axios";
// import Moment from "react-moment";
// import ReactPaginate from "react-paginate";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
// import Stack from '@mui/material/Stack';

function Managemember() {
  const [show, setShow] = useState(true);

  const [user, setuser] = useState([]);
  const [user0, setuser0] = useState([]);

  const getCategory = () => {
    var token = sessionStorage.getItem("token");
    axios
      .post(
        "https://aquinapi.aquin.us/api/v1/admin/member/getallmember",
        {},

        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(
        (res) => {
          setuser(res.data.membersResult);
          // setuser0(res.data.totalPages);
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

  const navigate = useNavigate();

  const getonemmber = (data) => {
    var token = sessionStorage.getItem("token");
    const userid = data.user_id;

    axios
      .post(
        "https://aquinapi.aquin.us/api/v1/admin/member/get-memberbyuserid" +
          "/" +
          userid,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(
        (res) => {
          // setuser(res.data);
          navigate("/membersview");

          sessionStorage.setItem("userid", res.data.memResult.user_id);
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

  const getonemmber1 = (data) => {
    var token = sessionStorage.getItem("token");
    const userid = data.user_id;

    axios
      .post(
        "https://aquinapi.aquin.us/api/v1/admin/member/get-memberbyuserid" +
          "/" +
          userid,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(
        (res) => {
          // setuser(res.data);
          navigate("/member-edit");

          sessionStorage.setItem("userid", res.data.memResult.user_id);
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

  const removemem = (data) => {
    var token = sessionStorage.getItem("token");
    const userid = data._id;

    axios
      .delete(
        "https://aquinapi.aquin.us/api/v1/admin/member/removemember" +
          "/" +
          userid,
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

  const manageDelete = (data) => {
    const confirmBox = window.confirm("Do you really want to Delete?");
    if (confirmBox === true) {
      removemem(data);
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

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

  const api_url = "https://aquinapi.aquin.us";

  const [forms, setforms] = useState([]);

  const handlechange = (e) => {
    let myUser = { ...forms };
    myUser[e.target.name] = e.target.value;
    setforms(myUser);

    var token = sessionStorage.getItem("token");
    axios
      .post(
        `https://aquinapi.aquin.us/api/v1/admin/member/getallmember?searchQueryParams=${e.target.value}`,
        {},

        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        setuser(res.data.membersResult);
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

                <Typography color="text.primary">Members List</Typography>
              </Breadcrumbs>
            </Col>
            <Col>
              <div style={{ float: "right" }}>
                <Button
                  onClick={() => setShow(true)}
                  type="button"
                  color="link"
                  className="waves-effect"
                  style={{
                    backgroundColor: show ? "rgb(16,101,156)" : "",
                    color: show ? "white" : "black",
                    textDecoration: "none",
                  }}
                >
                  <i class="fa fa-th-large" aria-hidden="true"></i> Grid view
                </Button>

                <Button
                  type="button"
                  color="link"
                  className="waves-effect"
                  onClick={() => setShow(false)}
                  style={{
                    backgroundColor: !show ? "rgb(16,101,156)" : "",
                    color: !show ? "white" : "black",
                    paddingRight: "10px",
                    textDecoration: "none",
                  }}
                >
                  <i class="fa fa-bars" aria-hidden="true"></i> List view
                </Button>
              </div>
            </Col>
          </Row>
          {show ? (
            <>
              <Row>
                {user.map((user, key) => (
                  <Col xl="4" md="6" key={key} className="pt-4">
                    <Card className="directory-card" id="cards">
                      <div>
                        <div className="directory-bg text-center">
                          <div className="directory-overlay">
                            <img
                              className="rounded-circle avatar-lg img-thumbnail"
                              src={api_url + "/" + user.profileImage}
                              alt="Generic placeholder"
                              style={{ height: "100px" }}
                            />
                          </div>
                        </div>

                        <div className="directory-content text-center p-4">
                          <p className=" mt-4">Member Id: {user.user_id}</p>
                          <h4 className="font-size-16"> {user.name}</h4>
                          <Row className="mt-4">
                            <Col md="6">
                              <h6 className="mt-1">Phone No:</h6>
                            </Col>
                            <Col md="6">
                              <p className="mt-1">{user.contactNumber}</p>
                            </Col>
                            <Col md="6">
                              <h6 className="mt-1">Sponsor Name:</h6>
                            </Col>
                            <Col md="6">
                              <p className="mt-1 text-left">
                                {user.sponsorName}
                              </p>
                            </Col>
                            <Col md="6">
                              <h6 className="mt-1">Sponsor Code: </h6>
                            </Col>
                            <Col md="6">
                              <p className="mt-1 text-left">{user.sponsorId}</p>
                            </Col>
                            <Col md="6">
                              <h6 className="mt-1">Date Of Joining: </h6>
                            </Col>
                            <Col md="6">
                              <p className="mt-1 text-left">
                                {user.createdAt.slice(0, 10)}
                              </p>
                            </Col>

                            <ul className="social-links list-inline mb-0 mt-4">
                              <div
                                style={{
                                  width: "30px",
                                  height: "30px",
                                  lineHeight: "30px",
                                  color: "white",
                                  background: "#29bbe3",
                                  borderRadius: "50%",
                                  display: "inline-block",
                                  marginRight: "20px",
                                }}
                              >
                                <VisibilityIcon
                                  style={{ cursor: "pointer" }}
                                  onClick={() => {
                                    getonemmber(user);
                                  }}
                                  fontSize="small"
                                />
                              </div>
                              <div
                                style={{
                                  width: "30px",
                                  height: "30px",
                                  lineHeight: "30px",
                                  color: "white",
                                  background: "#7a6fbe",
                                  borderRadius: "50%",
                                  display: "inline-block",
                                  marginRight: "20px",
                                }}
                              >
                                <EditIcon
                                  onClick={() => {
                                    getonemmber1(user);
                                  }}
                                  style={{ cursor: "pointer" }}
                                  fontSize="small"
                                />
                              </div>
                              <div
                                style={{
                                  width: "30px",
                                  height: "30px",
                                  lineHeight: "30px",
                                  color: "white",
                                  background: "#ec536c",
                                  borderRadius: "50%",
                                  display: "inline-block",
                                  marginRight: "20px",
                                }}
                              >
                                <DeleteIcon
                                  style={{ cursor: "pointer" }}
                                  onClick={() => {
                                    manageDelete(user);
                                  }}
                                  fontSize="small"
                                />
                              </div>
                              {/* <div
                              style={{
                                width: "30px",
                                height: "30px",
                                lineHeight: "30px",
                                color: "white",
                                background: "#2b3a4a",
                                borderRadius: "50%",
                                display: "inline-block",
                                marginRight: "20px",
                              }}
                            >
                              <BlockIcon fontSize="small" />
                            </div> */}
                            </ul>
                          </Row>
                        </div>
                      </div>
                    </Card>
                  </Col>
                ))}
              </Row>
            </>
          ) : (
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
                  </Col>
                  <Col>
                    <div className="col vbtn" style={{ float: "right" }}>
                      <Form.Group controlId="formBasicEmail">
                        <Form.Control
                          type="text"
                          placeholder="Search Id"
                          // onChange={(e) => {
                          //   setsearch(e.target.value);
                          // }}

                          name="search"
                          value={forms.search}
                          onChange={handlechange}
                        />
                      </Form.Group>
                    </div>
                  </Col>
                </Row>

                <div className="table-responsive">
                  <Table
                    striped
                    bordered
                    hover
                    id="empTable"
                    responsive
                    className="table-responsive mt-3"
                  >
                    <thead>
                      <tr>
                        <th>S.No</th>
                        <th>Id</th>
                        <th>Name</th>
                        <th>sponsorId</th>
                        <th>sponsorName</th>
                        {/* <th>gender</th>
                        <th>dateOfBirth</th>
                        <th>aadhaarCard</th> */}
                        <th>contactNumber</th>
                        <th>email</th>
                        <th>Action</th>
                        {/* <th>stateName</th>
                        <th>district</th>
                        <th>city</th>
                        <th>area</th>
                        <th>pinCode</th> */}
                        {/* <th>wallet</th>
                        <th>walletCoinsValue</th>
                        <th>Status</th>
                        <th>Action</th> */}
                      </tr>
                    </thead>
                    <tbody>
                      {lists.map((data, i) => {
                        return (
                          <tr key={i}>
                            <td>{(pageNumber - 1) * 10 + i + 11}</td>
                            <td>{data.user_id}</td>
                            <td>{data.name}</td>
                            <td>{data.sponsorId}</td>
                            <td>{data.sponsorName}</td>
                            {/* <td>{data.gender}</td>
                            <td>{data.dateOfBirth}</td>
                            <td>{data.aadhaarCard}</td> */}
                            <td>{data.contactNumber}</td>
                            <td>{data.email}</td>
                            {/* <td>{data.stateName}</td>
                            <td>{data.district}</td>
                            <td>{data.city}</td>
                            <td>{data.area}</td>
                            <td>{data.pinCode}</td> */}
                            {/* <td>{data.wallet}</td>
                            <td>{data.walletCoinsValue}</td>
                            <td>{data.Status}</td>
                            <td>
                              <i
                                className="mdi mdi-delete font-size-18"
                                id="deletetooltip"
                              />
                            </td> */}
                            <td>
                              <button
                                onClick={() => {
                                  getonemmber1(data);
                                }}
                                className="btn btn-outline-success btn-sm  m-1"
                              >
                                <i
                                  class="fa fa-pencil-square-o"
                                  aria-hidden="true"
                                ></i>
                              </button>
                              <button
                                onClick={() => {
                                  getonemmber(data);
                                }}
                                className="btn btn-outline-info btn-sm  m-1"
                              >
                                <i class="fa fa-eye" aria-hidden="true"></i>
                              </button>
                              <button
                                onClick={() => {
                                  manageDelete(data);
                                }}
                                className="btn btn-outline-danger btn-sm  m-1"
                              >
                                <i class="fa fa-trash-o" aria-hidden="true"></i>
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </div>

                <div className="mt-3" style={{ float: "right" }}>
                  {/* <Stack spacing={2}>
                <Pagination count={user0} color="primary" />
                </Stack> */}
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
          )}
        </Box>
        <ToastContainer />
      </Box>
    </div>
  );
}

export default Managemember;
