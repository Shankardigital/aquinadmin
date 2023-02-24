import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Sidebar from "../../sidebar/Sidebar";
import CssBaseline from "@mui/material/CssBaseline";
import { Row, Col, Card, CardBody, Button, Label } from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import { Link, NavLink } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import Sidebarres from "../../sidebar/Sidebarres";
import axios from "axios";
import {useNavigate} from 'react-router-dom';

function Editmembers() {
  const [form, setform] = useState([]);

  const [Files, setFiles] = useState("");

  const changeHandler = (e) => {
    setFiles(e.target.files);
  };
  const navigate = useNavigate();

  const handleChange1 = (e) => {
    let myUser = { ...user };
    myUser[e.target.name] = e.target.value;
    setuser(myUser);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    add();
  };

  const [user, setuser] = useState([]);
  console.log(user._id);

  const Optionchange = (e) => {
    let myUser = { ...user };
    myUser.stateId = e.target.value;
    setuser(myUser);
  };
//   console.log(form.stateId);

  const add = () => {
    const dataArray = new FormData();
    dataArray.append("name", user.name);
    dataArray.append("email", user.email);
    dataArray.append("contactNumber", user.contactNumber);
    // dataArray.append("password", form.password);
    dataArray.append("dateOfBirth", user.dateOfBirth);
    dataArray.append("address", user.address);
    dataArray.append("gender", user.gender);
    dataArray.append("area", user.area);
    dataArray.append("stateId", user.stateId);
    dataArray.append("district", user.district);
    dataArray.append("city", user.city);
    dataArray.append("pinCode", user.pinCode);
    dataArray.append("aadhaarCard", user.aadhaarCard);
    // dataArray.append("sponsorId", user.sponsorId);
    // dataArray.append("sponsorUserId", form._id);

    // for (let i = 0; i < Files.length; i++) {
    //   dataArray.append("courseImg", Files[i]);
    // }
    var token = sessionStorage.getItem("token");
    const usrdata = user._id
    axios
      .put(
        "https://aquinapi.aquin.us/api/v1/admin/member/editmember" +
          "/" +
          usrdata,
        dataArray,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(
        (res) => {
          // if (res.status === 200) {
            clearForm();
            toast(res.data.message);
            console.log(res.data.message)
            navigate('/Managemember')
          // }
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

  const [state, setstate] = useState([]);
  // console.log(state);

  const states = () => {
    var token = sessionStorage.getItem("token");
    var _id = sessionStorage.getItem("UserId");
    axios
      .post(
        "https://aquinapi.aquin.us/api/v1/web/state/getall-states",
        { _id },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        if (res.status == 200) {
          setstate(res.data.states);
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

  const [bankss, setbankss] = useState([]);
  // console.log(bankss);

  const banks = () => {
    var token = sessionStorage.getItem("token");
    var _id = sessionStorage.getItem("UserId");
    axios
      .post(
        "https://aquinapi.aquin.us/api/v1/web/bank/getall-banks",
        { _id },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        if (res.status == 200) {
          setbankss(res.data.banks);
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



  useEffect(() => {
    states();
    banks();
    getonemmber();
  }, []);

  const clearForm = () => {
    setform({
      name: "",
      email: "",
      contactNumber: "",
      aadhaarCard: "",
      pinCode: "",
      city: "",
      district: "",
      stateId: "",
      address: "",
      gender: "",
      dateOfBirth: "",
      password: "",
      area: "",
      // sponsorId:"",
    });
  };

  const userdata = sessionStorage.getItem("userid");

  const getonemmber = () => {
    var token = sessionStorage.getItem("token");
    const userid = userdata;

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
      .then((res) => {
        setuser(res.data.memResult);
        console.log(res.data.memResult);
        // sessionStorage.setItem("userid", res.data.memResult.user_id);
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
            ,<Typography color="text.primary">Edit Member Details</Typography>

            
          </Breadcrumbs>

          <>
          <div style={{ float: "right", marginRight:"30px" }} >
            <Link to="/Managemember">
              <button className="btn btn-info text-white " type="submit">
                <i class="fa fa-arrow-circle-o-left" aria-hidden="true"></i>{" "}
                Back
              </button>
            </Link>
          </div>
          </>

     
          <Row
            className="continer cotainerstyle2 mb-5"
            style={{ width: "100%" }}
          >
            <Col md={12}>
              <form
                // method="post"
                onSubmit={(e) => {
                  handleSubmit(e);
                }}
              >
                <Card className="mt-3" id="cards">
                  <CardBody>
                    {/* <h4 className="card-title">Add Member</h4> */}

                    <div className="needs-validation">
                      <Row className="mt-4">
                        <Col md="3">
                          <div className="mb-4">
                            <Label htmlFor="validationCustom012">
                              {" "}
                              User Id<span className="text-danger">*</span>
                            </Label>
                            <input
                              placeholder="User Id"
                              type="text"
                              disabled
                              errorMessage="Please provide a valid Sponsor Id"
                              className="form-control"
                              required
                              name="user_id"
                              onChange={(e) => {
                                handleChange1(e);
                              }}
                              value={user.user_id}
                              id="validationCustom012"
                            />
                          </div>
                        </Col>
                        <Col md="3">
                          <div className="mb-3">
                            <Label htmlFor="validationCustom01">
                              Name<span className="text-danger">*</span>
                            </Label>
                            <input
                              placeholder="Name"
                              type="text"
                              errorMessage="Please provide a valid Name"
                              className="form-control"
                              id="validationCustom01"
                              required
                              name="name"
                              onChange={(e) => {
                                handleChange1(e);
                              }}
                              value={user.name}
                            />
                          </div>
                        </Col>
                        <Col md="3">
                          <div className="mb-3">
                            <Label htmlFor="validationCustom01">
                              Mobile No<span className="text-danger">*</span>
                            </Label>
                            <input
                              placeholder="Mobile"
                              type="number"
                              errorMessage="Please provide a valid Mobile No"
                              className="form-control"
                              id="validationCustom07"
                              required
                              name="contactNumber"
                              onChange={(e) => {
                                handleChange1(e);
                              }}
                              value={user.contactNumber}
                            />
                          </div>
                        </Col>
                        <Col md="3">
                          <div className="mb-3">
                            <Label htmlFor="validationCustom02">
                              Email<span className="text-danger">*</span>
                            </Label>
                            <input
                              className="form-control"
                              placeholder="Email"
                              type="email"
                              errorMessage="Please provide a valid Email Id"
                              id="validationCustom02"
                              required
                              name="email"
                              onChange={(e) => {
                                handleChange1(e);
                              }}
                              value={user.email}
                            />
                          </div>
                        </Col>
                      </Row>

                      <Row>
                        <Col md="3">
                          <div className="mb-3">
                            <Label htmlFor="validationCustom02">
                              Date Of Birth
                              <span className="text-danger">*</span>
                            </Label>
                            <input
                              placeholder="Date Of Birth"
                              type="date"
                              errorMessage="Please provide a valid DOB"
                              className="form-control"
                              id="validationCustom02"
                              required
                              name="dateOfBirth"
                              onChange={(e) => {
                                handleChange1(e);
                              }}
                              value={user.dateOfBirth}
                            />
                          </div>
                        </Col>
                        <Col md="3">
                          <div className="mb-3">
                            <Label htmlFor="validationCustom04">
                              Pin Code<span className="text-danger">*</span>
                            </Label>
                            <input
                              placeholder="Pin"
                              type="number"
                              errorMessage="Please provide a valid Pin"
                              className="form-control"
                              required
                              name="pinCode"
                              onChange={(e) => {
                                handleChange1(e);
                              }}
                              value={user.pinCode}
                              id="validationCustom04"
                            />
                          </div>
                        </Col>
                        <Col md="3">
                          <div className="mb-3">
                            <Label htmlFor="validationCustom05">
                              Gender<span className="text-danger">*</span>
                            </Label>

                            <select
                              className="form-select select-control"
                              id="exampleSelect"
                              required
                              name="gender"
                              onChange={(e) => {
                                handleChange1(e);
                              }}
                              value={user.gender}
                            >
                              <option value="">Select Gender</option>
                              <option value="male">Male</option>
                              <option value="female">Female</option>
                            </select>
                          </div>
                        </Col>
                        <Col md="3">
                          <div className="mb-4">
                            <Label htmlFor="validationCustom012">
                              {" "}
                              Aadhar No<span className="text-danger">*</span>
                            </Label>
                            <input
                              placeholder="Aadhar No"
                              type="text"
                              errorMessage="Please provide a valid Sponsor Id"
                              className="form-control"
                              required
                              name="aadhaarCard"
                              onChange={(e) => {
                                handleChange1(e);
                              }}
                              value={user.aadhaarCard}
                              id="validationCustom012"
                            />
                          </div>
                        </Col>
                      </Row>

                      <Row>
                        <Col md="3">
                          <div className="mb-3">
                            <Label htmlFor="validationCustom04">
                              Area<span className="text-danger">*</span>
                            </Label>
                            <input
                              placeholder="Area"
                              type="text"
                              errorMessage="Please provide a valid area"
                              className="form-control"
                              id="validationCustom04"
                              required
                              name="area"
                              onChange={(e) => {
                                handleChange1(e);
                              }}
                              value={user.area}
                            />
                          </div>
                        </Col>
                        <Col md="3">
                          <div className="mb-3">
                            <Label htmlFor="validationCustom03">
                              State<span className="text-danger">*</span>
                            </Label>

                            <select
                              errorMessage=" Please provide a valid State"
                              id="validationCustom03"
                              className="form-select"
                              required
                              onChange={(e) => {
                                Optionchange(e);
                              }}
                              name="stateId"
                              value={user.stateId}
                            >
                              <option value="">select State Name </option>
                              {state.map((opt) => {
                                return (
                                  <option value={opt._id}>{opt.title}</option>
                                );
                              })}
                            </select>
                          </div>
                        </Col>
                        <Col md="3">
                          <div className="mb-3">
                            <Label htmlFor="validationCustom05">
                              District<span className="text-danger">*</span>
                            </Label>
                            <input
                              placeholder="District"
                              type="text"
                              errorMessage=" Please provide a valid District"
                              className="form-control"
                              id="validationCustom05"
                              required
                              name="district"
                              onChange={(e) => {
                                handleChange1(e);
                              }}
                              value={user.district}
                            />
                          </div>
                        </Col>
                        <Col md="3">
                          <div className="mb-3">
                            <Label htmlFor="validationCustom05">
                              City<span className="text-danger">*</span>
                            </Label>
                            <input
                              placeholder="City"
                              type="text"
                              errorMessage=" Please provide a valid City"
                              className="form-control"
                              required
                              name="city"
                              onChange={(e) => {
                                handleChange1(e);
                              }}
                              value={user.city}
                              id="validationCustom05"
                            />
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="12">
                          <div className="mb-3">
                            <Label htmlFor="validationCustom09">
                              Address<span className="text-danger">*</span>
                            </Label>
                            <textarea
                              placeholder="Enter Address"
                              className="form-control"
                              required
                              name="address"
                              onChange={(e) => {
                                handleChange1(e);
                              }}
                              value={user.address}
                              id="validationCustom09"
                            />
                          </div>
                        </Col>
                      </Row>

                      {/* <Row>
                        <h5 className="mt-2 mb-3">Sponsor Details</h5>
                      <Col md="3">
                          <div className="mb-3">
                            <Label htmlFor="validationCustom04">
                              sponsor Id
                            </Label>
                            <input
                              placeholder="sponsor Id"
                              type="number"
                              errorMessage="Please provide sponsor Id"
                              className="form-control"
                              id="validationCustom021"
                              name="sponsorId"
                              onChange={(e) => {
                                handleChange1(e);
                              }}
                              value={user.sponsorId}
                            />
                          </div>
                        </Col>
                      </Row> */}

                      <div style={{ float: "right" }}>
                        <Row>
                          <Col>
                            <Link to="/Managemember">
                              <Button
                                color="danger"
                                className="membtnstyle"
                                type="submit"
                              >
                                Cancel
                              </Button>
                            </Link>
                          </Col>
                          <Col>
                            <Button
                              color="primary"
                              className="membtnstyle"
                              type="submit"
                            >
                              Submit
                            </Button>
                          </Col>
                        </Row>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </form>
            </Col>
           
          </Row>
        </Box>
        <ToastContainer />
      </Box>
    </div>
  );
}

export default Editmembers;
