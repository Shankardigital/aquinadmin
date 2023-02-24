//   return (
//     <div>
//       <Box sx={{ display: "flex" }} className="mainn">
//         <div className="backgrounimgstyle">
//           <Sidebar />
//         </div>
//         <div className="drawecontent">
//           <Sidebarres />
//         </div>
//         <CssBaseline />
//         <Box component="main" sx={{ flexGrow: 2, p: 4 }}>
//         <Breadcrumbs aria-label="breadcrumb" style={{ paddingTop: "70px" }}>
//             <Link to="/dashboard" underline="hover" key="1" color="inherit">
//               Dashboard
//             </Link>
//             ,<Typography color="text.primary">Payments Approval</Typography>
//           </Breadcrumbs>

//           <React.Fragment>
//             <Row className="mt-5">
//               <Col xs="12">
//                 <Card id="cards">
//                   <CardBody>
//                     <Row className="mt-3">
//                       <Col>
//                         <ReactHTMLTableToExcel
//                           className="btn btn-primary m-2"
//                           table="empTable"
//                           filename="ReportExcel"
//                           sheet="Sheet"
//                           buttonText="Excel"
//                           style={{ color: "white" }}
//                         />
//                         <Button
//                           type="button"
//                           className="btn btn-danger "
//                           onClick={genPdf}
//                         >
//                           Pdf
//                         </Button>
//                         {/* <div style={{ float: "right" }}>
//                           <Button
//                             className="btn btn-primary float-right"
//                             style={{ color: "white" }}
//                             onClick={handleShow}
//                           >
//                             + Add New
//                           </Button>
//                         </div> */}
//                       </Col>
//                       <Col>
//                       <div style={{float:"right"}}>
//                    <input
//                     className="form-control"
//                       type="text"
//                       placeholder="Search"
//                       onChange={(e) => {
//                         setsearch(e.target.value);
//                       }}
//                     />
//                    </div>
//                       </Col>

//                       <div >
//                       <Table
//                          striped
//                          bordered
//                          hover
//                          id="empTable"
//                          responsive
//                          className="table-responsive">
//                         <thead>
//                           <tr>
//                             <th>S.No</th>
//                             <th>User Id</th>
//                             <th>Sponsor Id</th>
//                             <th>User Name</th>
//                             <th>Aadhar No</th>
//                             <th>Mobile No</th>
//                             <th>Amount</th>
//                             <th>Upi Id</th>
//                             <th>Ref Number</th>
//                             <th>Message</th>
//                             <th>Status</th>
//                             <th>Action</th>
//                           </tr>
//                         </thead>
//                         <tbody>
//                           {/* .filter((value) => {
//                               if (search === !null) {
//                                 return value;
//                               } else if (
//                                 value.title
//                                   .toLowerCase()
//                                   .includes(search.toLowerCase())
//                               ) {
//                                 return value;
//                               }
//                             }) */}
//                           {lists.map((data, i) => {
//                             return (
//                               <tr key={i}>
//                                 <td>{(pageNumber - 1) * 10 + i + 11}</td>
//                                 <td>{data.userId}</td>
//                                 <td>{data.sponsorId}</td>

//                                 <td>{data.userName}</td>

//                                 <td>{data.aadharNumber}</td>
//                                 <td>{data.phone}</td>
//                                 <td>{data.selectPackage}</td>
//                                 <td>{data.upiId}</td>
//                                 <td>{data.refNumber}</td>
//                                 <td>{data.message}</td>
//                                 <td>{data.status == ""? "pending" :data.status}</td>

//                                 <td>
//                                   {data.status == "" || data.status == "pending" ? (
//                                     <button
//                                       onClick={() => {
//                                         getpopup(data);
//                                       }}
//                                       className="btn btn-success btn-sm"
//                                     >
//                                       Update{" "}
//                                     </button>
//                                   ) : (
//                                     "---"
//                                   )}
//                                   {/* <button style={{margin:"2px"}}  className="btn btn-info text-white btn-sm">View <i class="fa fa-eye" aria-hidden="true"></i></button> */}
//                                 </td>
//                                 {/* <td>
//                                       {data.status === true ||
//                                       data.status == "true"
//                                         ? "active"
//                                         : "Inactive"}
//                                     </td> */}
//                                 {/* <td>
//                                       {" "}
//                                       <EditIcon
//                                         onClick={() => {
//                                           getpopup(data);
//                                         }}
//                                         style={{
//                                           fontSize: "30px",
//                                           color: "black",
//                                         }}
//                                       />{" "}
//                                       <DeleteForeverIcon
//                                         onClick={() => {
//                                           manageDelete(data);
//                                         }}
//                                         style={{
//                                           fontSize: "30px",
//                                           color: "red",
//                                         }}
//                                       />
//                                     </td> */}
//                               </tr>
//                             );
//                           })}
//                         </tbody>
//                       </Table>
//                     </div>
//                     </Row>

//                     <div className="mt-3" style={{ float: "right" }}>
//                       <Stack spacing={2}>
//                         <ReactPaginate
//                           previousLabel={"Previous"}
//                           nextLabel={"Next"}
//                           pageCount={pageCount}
//                           onPageChange={changePage}
//                           containerClassName={"pagination"}
//                           previousLinkClassName={"previousBttn"}
//                           nextLinkClassName={"nextBttn"}
//                           disabledClassName={"disabled"}
//                           activeClassName={"active"}
//                           total={lists.length}
//                         />
//                       </Stack>
//                     </div>

//                   </CardBody>
//                 </Card>
//               </Col>
//             </Row>

//             <Modal
//               show={show}
//               onHide={handleClose}
//               style={{ marginTop: "80px" }}
//             >
//               <Modal.Header>
//                 <Modal.Title>
//                   <h5>New member Payment</h5>
//                 </Modal.Title>
//               </Modal.Header>
//               <Modal.Body>
//                 <div className="mt-5 mt-lg-4">
//                   <form
//                     onSubmit={(e) => {
//                       handleSubmit1(e);
//                     }}
//                   >
//                     {/* <label> Bank Name: </label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       placeholder="Enter
//                         Bank Name"
//                       required
//                       name="title"
//                     /> */}

//                     <label className="">Member Status :</label>
//                     <select
//                       className="form-control form-select mt-2"
//                       required
//                       onChange={(e) => {
//                         handleChange1(e);
//                       }}
//                       name="status"
//                     >
//                       <option value="">select</option>
//                       <option value="pending">Pending</option>
//                       <option value="approved">Approved</option>
//                       <option value="rejected">Rejected</option>
//                     </select>

// {/*
//                     <label className="mt-3">Payment Status :</label>
//                     <select
//                       className="form-control form-select mt-2"
//                       required
//                       onChange={(e) => {
//                         handleChange1(e);
//                       }}
//                       name="userPayApproval"
//                     >
//                       <option value="">select</option>
//                       <option value="pending">Pending</option>
//                       <option value="approved">Approved</option>
//                       <option value="rejected">Rejected</option>
//                     </select> */}

//                     <div className="row mt-3">
//                       <div className="col-sm-12">
//                         <div>
//                           <button
//                             type="submit"
//                             className="btn btn-primary w-md"
//                             style={{ float: "right" }}
//                           >
//                             Submit
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   </form>
//                 </div>
//               </Modal.Body>
//             </Modal>
//           </React.Fragment>
//         </Box>
//       </Box>
//     </div>
//   );
// }

// export default Payments;

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
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

function Payments() {
  const navigate = useNavigate();
  const [editResults, seteditResults] = React.useState(false);
  const editfield = () => seteditResults(false);

  const [user, setuser] = useState([]);
  const [user1, setuser1] = useState([]);
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
        "https://aquinapi.aquin.us/api/v1/admin/userpay/getallpayinfo",
        {},

        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(
        (res) => {
          setuser(res.data.payResult);
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
    setuser1(data);
  };

  const updateCategory = () => {
    const data1 = user1._id;
    const data = {
      status: user1.status,
    };
    const token = sessionStorage.getItem("token");
    axios
      .patch(
        "https://aquinapi.aquin.us/api/v1/admin/member/editmemberaproval" +
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
            toast(res.message);
            getCategory();
            setShow(false);
          } else {
            toast(res.message);
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

  const [forms, setforms] = useState([]);

  const handlechanged = (e) => {
    let myUser = { ...forms };
    myUser[e.target.name] = e.target.value;
    setforms(myUser);

    var token = sessionStorage.getItem("token");
    axios
      .post(
        `https://aquinapi.aquin.us/api/v1/admin/userpay/getallpayinfo?searchQueryParams=${e.target.value}`,
        {},

        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        setuser(res.data.payResult);
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
                ,<Typography color="text.primary">Payments Approval</Typography>
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
                        <th>Sponsor Id</th>
                        <th>User Name</th>
                        <th>Aadhar No</th>
                        <th>Mobile No</th>
                        <th>Amount</th>
                        <th>Upi Id</th>
                        <th>Ref Number</th>
                        <th>Message</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {lists.map((data, i) => {
                        return (
                          <tr key={i}>
                            <td>{(pageNumber - 1) * 10 + i + 11}</td>
                            <td>{data.userId}</td>
                            <td>{data.sponsorId}</td>

                            <td>{data.userName}</td>

                            <td>{data.aadharNumber}</td>
                            <td>{data.phone}</td>
                            <td>{data.selectPackage}</td>
                            <td>{data.upiId}</td>
                            <td>{data.refNumber}</td>
                            <td>{data.message}</td>
                            <td>
                              {data.status == "" ? "pending" : data.status}
                            </td>

                            <td>
                              {data.status == "rejected" ||
                              data.status == "approved" ? (
                                "----"
                              ) : (
                                <button
                                  onClick={() => {
                                    getpopup(data);
                                  }}
                                  className="btn btn-success btn-sm"
                                >
                                  Update{" "}
                                </button>
                              )}
                              {/* <button style={{margin:"2px"}}  className="btn btn-info text-white btn-sm">View <i class="fa fa-eye" aria-hidden="true"></i></button> */}
                            </td>
                            {/* <td>
                                      {data.status === true ||
                                      data.status == "true"
                                        ? "active"
                                        : "Inactive"}
                                    </td> */}
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
              <h5>New member Payment</h5>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="mt-5 mt-lg-4">
              <form
                onSubmit={(e) => {
                  handleSubmit1(e);
                }}
              >
                {/* <label> Bank Name: </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter
                        Bank Name"
                      required
                      name="title"
                    /> */}

                <label className="">Member Status :</label>
                <select
                  className="form-control form-select mt-2"
                  required
                  onChange={(e) => {
                    handleChange1(e);
                  }}
                  name="status"
                >
                  <option value="">select</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>

                {/*
                    <label className="mt-3">Payment Status :</label>
                    <select
                      className="form-control form-select mt-2"
                      required
                      onChange={(e) => {
                        handleChange1(e);
                      }}
                      name="userPayApproval"
                    >
                      <option value="">select</option>
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                    </select> */}

                <div className="row mt-3">
                  <div className="col-sm-12">
                    <div>
                      <button
                        type="submit"
                        className="btn btn-primary w-md"
                        style={{ float: "right" }}
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
        <ToastContainer />
      </Box>
    </div>
  );
}

export default Payments;
