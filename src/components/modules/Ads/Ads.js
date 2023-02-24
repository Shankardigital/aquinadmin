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
import { height } from "@mui/system";
import { useNavigate } from "react-router-dom";

function Ads() {
  const navigate = useNavigate();
  const [editResults, seteditResults] = React.useState(false);
  const editfield = () => seteditResults(false);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [form, setform] = useState({});
  const [form1, setform1] = useState({});
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
    getCategory1();
    getCategory2();
    getCategory0();
  }, []);

  const getCategory = () => {
    var token = sessionStorage.getItem("token");
    axios
      .get(
        "https://aquinapi.aquin.us/api/v1/admin/advertise/getall-adver",

        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(
        (res) => {
          setuser(res.data.adResults);
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

  const addCategory = () => {
    const dataArray = new FormData();
    dataArray.append("categoryId", form.categoryId);
    dataArray.append("subCategoryId", form.subCategoryId);
    dataArray.append("youtubeLink", form.youtubeLink);
    var token = sessionStorage.getItem("token");
    axios
      .post(
        "https://aquinapi.aquin.us/api/v1/admin/advertise/add-adver",
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
          } else if (error.response && error.response.status === 401) {
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
    // handleSubmit1(data);
  };

  const updateCategory = () => {
    const data1 = user1._id;
    const dataArray = new FormData();
    dataArray.append("categoryId", user1.categoryId);
    dataArray.append("subCategoryId", user1.subCategoryId);
    dataArray.append("youtubeLink", user1.youtubeLink);
    var token = sessionStorage.getItem("token");

    axios
      .put(
        "https://aquinapi.aquin.us/api/v1/admin/advertise/edit-adver" +
          "/" +
          data1,
        user1,
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
        "https://aquinapi.aquin.us/api/v1/admin/advertise/remove-adver" +
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

  // const Optionchange1 = (e) => {
  //   let myUser = { ...form1 };
  //   myUser.categoryId = e.target.value;
  //   setform1(myUser);
  // };

  // const Optionchange2 = (e) => {
  //   let myUser = { ...form1 };
  //   myUser.categoryId = e.target.value;
  //   setform1(myUser);
  // };

  const [subcategory, setsubcategory] = useState([]);

  const [category1, setcategory1] = useState([]);

  const getCategory1 = () => {
    var token = sessionStorage.getItem("token");
    axios
      .get(
        "https://aquinapi.aquin.us/api/v1/admin/advertise/getall-adver",

        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(
        (res) => {
          // setcategory(res.data.subCategResult);
          console.log(res.data);
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

  const getCategory2 = () => {
    var token = sessionStorage.getItem("token");
    axios
      .get(
        "https://aquinapi.aquin.us/api/v1/admin/adcategory/getall-activeadcateg",

        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(
        (res) => {
          setcategory1(res.data.adCategResult);
          console.log(res.data);
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

  const getCategory0 = () => {
    var token = sessionStorage.getItem("token");
    axios
      .get(
        "https://aquinapi.aquin.us/api/v1/admin/adsubcategory/getall-activeadsubcateg",

        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(
        (res) => {
          setsubcategory(res.data.subCategResult);
          console.log(res.data.subCategResult);
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

  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit">
      Dashboard
    </Link>,

    <Typography key="3" color="text.primary">
      Ads
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
        `https://aquinapi.aquin.us/api/v1/admin/advertise/getall-adver?categoryName=${e.target.value}`,

        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        setuser(res.data.adResults);
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
            ,<Typography color="text.primary">Ads</Typography>
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
                        {/* <div style={{ float: "right" }}>
                          <Button
                            className="btn btn-primary float-right"
                            onClick={handleShow}
                          >
                            + Add New
                          </Button>
                        </div> */}
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
                              // onChange={(e) => {
                              //   setsearch(e.target.value);
                              // }}
                            />
                          </Form.Group>
                        </div>
                      </div>
                    </div>

                    <Row className="mt-3">
                      <Col>
                        <div className="table-responsive">
                          <Table
                            className=" mt-3"
                            striped
                            bordered
                            hover
                            id="empTable"
                          >
                            <thead>
                              <tr>
                                <th>S.No</th>
                                <th>Category Name</th>
                                <th>Sub-category Name</th>
                                <th>Video Links</th>
                                <th>Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {/* .filter((value) => {
                            if (search === !null) {
                              return value;
                            } else if (
                              value.categoryName
                                .toLowerCase()
                                .includes(search.toLowerCase())
                            ) 
                          }) */}
                              {lists.map((data, i) => {
                                return (
                                  <tr key={i}>
                                    <td>{(pageNumber - 1) * 10 + i + 11}</td>

                                    <td>{data.categoryName}</td>
                                    <td>{data.subCategoryName}</td>
                                    <td style={{ width: "300px" }}>
                                      {/* {data.youtubeLink} */}
                                      <td>
                                        <iframe
                                          src={
                                            "https://www.youtube.com/embed/" +
                                            data.youtubeLink.split("=")[1]
                                          }
                                          style={{ height: "100px" }}
                                        />
                                      </td>

                                      {/* <iframe src={"https://aquinapi.aquin.us/" + data.youtubeLink.split("=")[1]} style={ {width:"100px"}} ></iframe> */}
                                      {/* <iframe
                                      src={
                                        "https://aquinapi.aquin.us" +"/" +data.youtubeLink
                                      }
                                      style={{
                                        width: "100px",
                                        cursor: "pointer",
                                      }}
                                    ></iframe> */}
                                    </td>
                                    {/* <td>{data.youtubeLink}</td> */}
                                    {/* <td>
                                    {data.status === true ||
                                    data.status == "true"
                                      ? "active"
                                      : "Inactive"}
                                  </td> */}
                                    <td>
                                      {" "}
                                      {/* <EditIcon
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
                                    /> */}
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
                                      <button
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
                                      </button>
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </Table>
                        </div>
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
              <Modal.Header closeButton>
                <Modal.Title>
                  <h3>Add Ads</h3>
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
                    <label>Category : </label>
                    {/* <input
                      type="text"
                      className="form-control mt-2"
                      placeholder="Enter 
                    State Name:"
                      required
                      name="title"
                      value={form.title}
                      onChange={(e) => {
                        handleChange(e);
                      }} */}
                    <select
                      className="form-control form-select mt-2"
                      required
                      name="categoryId"
                      onChange={(e) => {
                        handleChange(e);
                      }}
                      value={form.categoryId}
                    >
                      <option value="">Select Category </option>
                      {category1.map((opt) => {
                        return <option value={opt._id}>{opt.title}</option>;
                      })}
                    </select>

                    <label className="mt-3">Sub-category: </label>
                    <select
                      className="form-control form-select mt-2"
                      required
                      name="subCategoryId"
                      onChange={(e) => {
                        handleChange(e);
                      }}
                      value={form.subCategoryId}
                    >
                      <option value="">Select Sub-category </option>
                      {subcategory.map((opt) => {
                        return <option value={opt._id}>{opt.title}</option>;
                      })}
                    </select>

                    <label className="mt-3">Video Link: </label>
                    <input
                      type="text"
                      className="form-control mt-2"
                      placeholder="Enter Video Link:"
                      required
                      name="youtubeLink"
                      value={form.youtubeLink}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                    />

                    <div style={{ float: "right" }} className="row mt-3">
                      <div className="col-sm-12">
                        <div>
                          <button
                            type="button"
                            class="btn btn-sm btn-danger save m-1"
                            style={{
                              color: "white",
                            }}
                            onClick={handleClose}
                          >
                            <i
                              class="fa fa-times-circle-o"
                              aria-hidden="true"
                            ></i>{" "}
                            Cancel
                          </button>
                          <button
                            type="submit"
                            class="btn btn-sm btn-success save m-1"
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
                  <h3>Edit Ads</h3>
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="mt-5 mt-lg-4">
                  <form
                    method="post"
                    onSubmit={(e) => {
                      handleSubmit1(e);
                    }}
                  >
                    <label>Category : </label>
                    {/* <input
                      type="text"
                      className="form-control mt-2"
                      placeholder="Enter 
                    State Name:"
                      required
                      name="title"
                      value={form.title}
                      onChange={(e) => {
                        handleChange(e);
                      }} */}
                    <select
                      className="form-control form-select mt-2"
                      required
                      name="categoryId"
                      onChange={(e) => {
                        handleChange1(e);
                      }}
                      value={user1.categoryId}
                    >
                      <option value="">Select Category </option>
                      {category1.map((opt) => {
                        return <option value={opt._id}>{opt.title}</option>;
                      })}
                    </select>

                    <label className="mt-3">Sub-category: </label>
                    <select
                      className="form-control form-select mt-2"
                      required
                      name="subCategoryId"
                      onChange={(e) => {
                        handleChange1(e);
                      }}
                      value={user1.subCategoryId}
                    >
                      <option value="">Select Sub-category </option>
                      {subcategory.map((opt) => {
                        return <option value={opt._id}>{opt.title}</option>;
                      })}
                    </select>

                    <label className="mt-3">Video Link: </label>
                    <input
                      type="text"
                      className="form-control mt-2"
                      placeholder="Enter Video Link:"
                      required
                      // pattern="/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(:[0-9]+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/"
                      name="youtubeLink"
                      value={user1.youtubeLink}
                      onChange={(e) => {
                        handleChange1(e);
                      }}
                    />

                    <div style={{ float: "right" }} className="row mt-3">
                      <div className="col-sm-12">
                        <div>
                          <button
                            type="button"
                            class="btn btn-sm btn-danger save m-1"
                            style={{
                              color: "white",
                            }}
                            onClick={handleClose1}
                          >
                            <i
                              class="fa fa-times-circle-o"
                              aria-hidden="true"
                            ></i>{" "}
                            Cancel
                          </button>
                          <button
                            type="submit"
                            class="btn btn-sm btn-success save m-1"
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
          </React.Fragment>
        </Box>
      </Box>
    </div>
  );
}

export default Ads;
