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
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Typography from "@mui/material/Typography";
import Sidebarres from "../../sidebar/Sidebarres";
import {useNavigate} from 'react-router-dom';

function Addtyps() {
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
  }, []);

  const getCategory = () => {
    var token = sessionStorage.getItem("token");
    axios
      .get(
        "https://aquinapi.aquin.us/api/v1/admin/adcategory/getall-adcateg",

        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        setuser(res.data.adCategResult);
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

  const addCategory = () => {
    // const dataArray = new FormData();
    // dataArray.append("title", form.title);
    // dataArray.append("status", form.status);
    const sparams = {
      title : form.title,
      description : form.description
    }
    var token = sessionStorage.getItem("token");
    axios
      .post(
        "https://aquinapi.aquin.us/api/v1/admin/adcategory/add-adcateg",
        sparams,
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
    // const dataArray = new FormData();
    // dataArray.append("title", user1.title);
    // dataArray.append("description", user1.description);
    // dataArray.append("status", user1.status);
    const params={
      title : user1.title,
      description : user1.description,
      status : user1.status
    }
    var token = sessionStorage.getItem("token");

    axios
      .put(
        "https://aquinapi.aquin.us/api/v1/admin/adcategory/edit-adcateg" + "/" + data1,
        params,
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
        "https://aquinapi.aquin.us/api/v1/admin/adcategory/remove-adcateg" + "/" + data1,
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
      Add Types
    </Typography>,
  ];

  const [forms, setforms] = useState([]);

  const handlechanged = (e) => {
    let myUser = { ...forms };
    myUser[e.target.name] = e.target.value;
    setforms(myUser);

    var token = sessionStorage.getItem("token");
    axios
      .get(
        `https://aquinapi.aquin.us/api/v1/admin/adcategory/getall-adcateg?title=${e.target.value}`,

        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        setuser(res.data.adCategResult);
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
            ,<Typography color="text.primary">Ads Types</Typography>
          </Breadcrumbs>
          <React.Fragment>
            <Row style={{ paddingTop: "30px" }}>
              <Col xs="12">
                <Card id="cards">
                  <CardBody>
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
                              name="search"
                              value={forms.search}
                              onChange={handlechanged}
                            />
                          </Form.Group>
                        </div>
                      </div>
                    </div>

                    <Row className="mt-3">
                      <Col>
                        <Table striped bordered hover id="empTable">
                          <thead>
                            <tr>
                              <th>S.No</th>
                              <th>Ads Title</th>
                              <th>Description</th>
                              <th>Status</th>
                              <th style={{width:"200px"}}>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {lists
                              // .filter((value) => {
                              //   if (search === !null) {
                              //     return value;
                              //   } else if (
                              //     value.title
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
                                    <td>{data.title}</td>
                                    <td>{data.description}</td>

                                    <td>
                                      {data.status === true ||
                                      data.status == "true"
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
                                      <i class="fa fa-pencil-square-o" aria-hidden="true"></i>  Edit
                                      </button>
                                      <button
                                        type="button"
                                        class="btn btn-outline-danger m-1 btn-sm"
                                        onClick={() => {
                                          manageDelete(data);
                                        }}
                                      >
                                      <i class="fa fa-trash-o" aria-hidden="true"></i>  Delete
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
                      <ToastContainer />
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
              <Modal.Header closeButton >
                <Modal.Title>
                  <h5>Add Ads Type</h5>
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="mt-5 mt-lg-4">
                  <form
                    method="post"
                    onSubmit={(e) => {
                      handleSubmit(e);
                    }}
                  >
                    <label>Add Types: </label>
                    <input
                      type="text"
                      className="form-control mt-2"
                      placeholder="Enter Add Types:"
                      required
                      name="title"
                      value={form.title}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                    />
                    <label className="mt-3">Description: </label>
                    <textarea
                      type="text"
                      className="form-control mt-2"
                      placeholder="Enter description"
                      required
                      name="description"
                      value={form.description}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                    />

                    {/* <label className="mt-3">Status :</label>
                    <select
                      className="form-control form-select"
                      required
                      name="status"
                      onChange={(e) => {
                        handleChange(e);
                      }}
                    >
                      <option value="">select</option>
                      <option value="true">Active</option>
                      <option value="false">Inactive</option>
                    </select> */}

                    <div style={{ float: "right" }} className="row mt-3">
                      <div className="col-sm-12">
                        <div>
                        <button
                        type="button"
                        class="btn btn-sm btn-danger m-2"
                        onClick={handleClose}
                      >
                        <i class="fa fa-times-circle"></i>
                        <span aria-hidden="true"> Cancel</span>
                      </button>
                          <button
                            type="submit"
                            class="btn btn-sm btn-success save"
                            style={{
                              color: "white",
                              background: "rgb(13,85,143)",
                            }}
                          >
                            <i class="fa fa-check-circle"></i> Submit
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
              <Modal.Header closeButton>
                <Modal.Title>
                  <h5>Edit Ads Type</h5>
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
                    <label>Title</label>
                    <input
                      type="text"
                      className="form-control mt-2"
                      placeholder="Enter Name"
                      required
                      name="title"
                      value={user1.title}
                      onChange={(e) => {
                        handleChange1(e);
                      }}
                    />

                      <label className="mt-3">Description: </label>
                    <textarea
                      type="text"
                      className="form-control mt-2"
                      placeholder="Enter description"
                      required
                      name="description"
                      value={user1.description}
                      onChange={(e) => {
                        handleChange1(e);
                      }}
                    />

                    <label className="mt-3">Status :</label>
                    <select
                      className="form-control form-select"
                      required
                      value={user1.status}
                      name="status"
                      onChange={(e) => {
                        handleChange1(e);
                      }}
                    >
                      <option value="true">Active</option>
                      <option value="false">Inactive</option>
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
          </React.Fragment>
        </Box>
      </Box>
    </div>
  );
}

export default Addtyps;
