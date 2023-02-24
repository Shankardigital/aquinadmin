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

function Newmembers() {
  const [form, setform] = useState({});

  const [Files, setFiles] = useState("");
  const navigate = useNavigate();

  const changeHandler = (e) => {
    setFiles(e.target.files);
  };

  const handleChange = (e) => {
    let myUser = { ...form };
    myUser[e.target.name] = e.target.value;
    setform(myUser);
  };
  const handleChange1 = (e) => {
    let myUser = { ...form };
    myUser[e.target.name] = e.target.value;

    setform(myUser);
    var gs = e.target.value;
    getCategory2(gs);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    add();
  };

  const [user, setuser] = useState([]);
  const [user2, setuser2] = useState([]);
  // console.log(user2)

  const Optionchange = (e) => {
    let myUser = { ...form };
    myUser.stateId = e.target.value;
    setform(myUser);
  };
  console.log(form.stateId);

  const add = () => {
    const dataArray = new FormData();
    dataArray.append("name", form.name);
    dataArray.append("email", form.email);
    dataArray.append("contactNumber", form.contactNumber);
    dataArray.append("password", form.password);
    dataArray.append("dateOfBirth", form.dateOfBirth);
    dataArray.append("address", form.address);
    dataArray.append("gender", form.gender);
    dataArray.append("area", form.area);
    dataArray.append("stateId", form.stateId);
    dataArray.append("district", form.district);
    dataArray.append("city", form.city);
    dataArray.append("pinCode", form.pinCode);
    dataArray.append("aadhaarCard", form.aadhaarCard);
    dataArray.append("sponsorId", form.sponsorId);
    // dataArray.append("sponsorUserId", form._id);

    // for (let i = 0; i < Files.length; i++) {
    //   dataArray.append("courseImg", Files[i]);
    // }
    var token = sessionStorage.getItem("token");
    axios
      .post(
        "https://aquinapi.aquin.us/api/v1/admin/member/addmember",
        dataArray,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(
        (res) => {
          if (res.status === 200) {
            toast(res.data.message);
            clearForm();
            // setuser2("")
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

  const [state, setstate] = useState([]);
  // console.log(state);

  const states = () => {
    var token = sessionStorage.getItem("token");
    var _id = sessionStorage.getItem("UserId");
    axios
      .post(
        "https://aquinapi.aquin.us/api/v1/web/state/getall-activestates",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        if (res.status == 200) {
          setstate(res.data.actStates);
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

  const getCategory2 = (gs) => {
    var token = sessionStorage.getItem("token");
    // const user_id = form.sponsorId
    const params = {
      user_id: gs,
    };

    axios
      .post(
        "https://aquinapi.aquin.us/api/v1/admin/member/get-memberbyuseridall",
        params,

        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        setuser(res.data);
        setuser2(res.data.memResult);
        console.log(res.data);
        clearForm()
        // toast(res.data.message)
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
    // getCategory2()
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
      sponsorId: "",
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
            ,<Typography color="text.primary">Add New Member</Typography>
          </Breadcrumbs>
          <Row
            className="continer cotainerstyle2 mb-5"
            style={{ width: "100%" }}
          >
            <Col md={12}>
              <form
                method="post"
                onSubmit={(e) => {
                  handleSubmit(e);
                }}
              >
                <Card className="mt-3" id="cards">
                  <CardBody>
                    <h4 className="card-title">Add Member</h4>

                    <div className="needs-validation">
                      <Row>
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
                              pattern="^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$"
                              name="name"
                              onChange={(e) => {
                                handleChange(e);
                              }}
                              value={form.name}
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
                              type="text"
                              maxlength="10"
                              pattern="\d{10}"
                              errorMessage="Please provide a valid Mobile No"
                              className="form-control"
                              id="validationCustom07"
                              required
                              name="contactNumber"
                              onChange={(e) => {
                                handleChange(e);
                              }}
                              value={form.contactNumber}
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
                              pattern="(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)"
                              errorMessage="Please provide a valid Email Id"
                              id="validationCustom02"
                              required
                              name="email"
                              onChange={(e) => {
                                handleChange(e);
                              }}
                              value={form.email}
                            />
                          </div>
                        </Col>
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
                                handleChange(e);
                              }}
                              value={form.dateOfBirth}
                            />
                          </div>
                        </Col>
                      </Row>

                      <Row>
                        <Col md="3">
                          <div className="mb-3">
                            <Label htmlFor="validationCustom04">
                              Pin Code<span className="text-danger">*</span>
                            </Label>
                            <input
                              placeholder="Pin"
                              type="text"
                              maxlength="6"
                              pattern="\d{6}"
                              errorMessage="Please provide a valid Pin"
                              className="form-control"
                              required
                              name="pinCode"
                              onChange={(e) => {
                                handleChange(e);
                              }}
                              value={form.pinCode}
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
                                handleChange(e);
                              }}
                              value={form.gender}
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
                              maxlength="12"
                              pattern="\d{12}"
                              className="form-control"
                              required
                              name="aadhaarCard"
                              onChange={(e) => {
                                handleChange(e);
                              }}
                              value={form.aadhaarCard}
                              id="validationCustom012"
                            />
                          </div>
                        </Col>
                        <Col md="3">
                          <div className="mb-4">
                            <Label htmlFor="validationCustom012">
                              {" "}
                              Password<span className="text-danger">*</span>
                            </Label>
                            <input
                              placeholder="Password"
                              type="password"
                              errorMessage="Please provide a valid Sponsor Id"
                              className="form-control"
                              required
                              minlength="6"
                              name="password"
                              onChange={(e) => {
                                handleChange(e);
                              }}
                              value={form.password}
                              id="validationCustom012"
                            />
                          </div>
                        </Col>
                      </Row>

                      <Row>
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
                              value={form.stateId}
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
                              pattern="^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$"
                              name="district"
                              onChange={(e) => {
                                handleChange(e);
                              }}
                              value={form.district}
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
                              pattern="^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$"
                              onChange={(e) => {
                                handleChange(e);
                              }}
                              value={form.city}
                              id="validationCustom05"
                            />
                          </div>
                        </Col>
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
                                handleChange(e);
                              }}
                              value={form.area}
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
                                handleChange(e);
                              }}
                              value={form.address}
                              id="validationCustom09"
                            />
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <h5 className="mt-2 mb-3">Sponsor Details</h5>
                        <Col md="3">
                          <div className="mb-3">
                            <Label htmlFor="validationCustom04">
                              sponsor Id <span className="text-danger">*</span>
                            </Label>
                            <input
                              placeholder="sponsor Id"
                              type="number"
                              required
                              errorMessage="Please provide sponsor Id"
                              className="form-control"
                              id="validationCustom04"
                              name="sponsorId"
                              onChange={(e) => {
                                handleChange1(e);
                              }}
                              value={form.sponsorId}
                            />
                          </div>
                          {user.memResult == null ? (
                            <>
                            <p className="text-danger">Invalid sponsor id</p>
                            </>
                          ) : (
                            <>
                              {/* <Label htmlFor="validationCustom04">
                                sponsor Name
                              </Label> */}
                              <h5>{user2.name}</h5>
                            </>
                            // <p>name</p>
                          )}
                        </Col>
                      </Row>

                      <div style={{ float: "right" }}>
                        <Row>
                          <Col>
                            <Button
                              color="danger"
                              className="membtnstyle"
                              type="button"
                              style={{ width: "130px " }}
                              onClick={clearForm}
                            >
                              Cancel
                            </Button>
                          </Col>
                          <Col>
                          
                            <Button
                              color="primary"
                              className="membtnstyle mb-3"
                              type="submit"
                              style={{ width: "130px " }}
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
            <ToastContainer />
          </Row>
        </Box>
      </Box>
    </div>
  );
}

export default Newmembers;
