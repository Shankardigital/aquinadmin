import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Sidebar from "../sidebar/Sidebar";
import CssBaseline from "@mui/material/CssBaseline";
import { Link } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import avatar from "../assets/images/users/user-6.jpg";
import { Row, Col, Card, Alert, CardBody, Media, Button } from "reactstrap";
import Sidebarres from "../sidebar/Sidebarres";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import {useNavigate} from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Profile() {
  const navigate = useNavigate();
  const [user, setuser] = useState([]);

  const myprofile = () => {
    var token = sessionStorage.getItem("token");
    axios
      .post(
        "https://aquinapi.aquin.us/api/v1/admin/aquin/getadminprofile",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        if (res.status == 200) {
          setuser(res.data.adminProfile);
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
    myprofile();
  }, []);

  const [form, setform] = useState([]);
  console.log(form)

  const handleChange = (e) => {
    let myUser = { ...user };
    myUser[e.target.name] = e.target.value;
    setuser(myUser);
  };

  const handleSubmit = (e) => {
    updateCategory();
    e.preventDefault();
  };

  const clearForm = () => {
    setform({
      password: "",
      newpassword: "",
      confirmpassword: "",
    });
  };

  const handleChange1 = (e) => {
    let myUser = { ...form };
    myUser[e.target.name] = e.target.value;
    setform(myUser);
  };

  const addCategory = () => {
    var token = sessionStorage.getItem("token");

    const params= {
      password: form.password,
      newpassword: form.newpassword,
      confirmpassword: form.confirmpassword,
    }
    axios
      .post(
        "https://aquinapi.aquin.us/api/v1/admin/aquin/editadminpass",params,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(
        (res) => {
          if (res.status === 200) {
            toast(res.data.message);
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



  const handleSubmit1 = (e) => {
    e.preventDefault();
    addCategory();
  };

  const changeHandler = (e) => {
    setFiles(e.target.files);
  };

  const [Files, setFiles] = useState("");

  const updateCategory = () => {
    // const data1 = user._id;
    const dataArray = new FormData();
    dataArray.append("username", user.username);
    dataArray.append("email", user.email);
    dataArray.append("contactNumber", user.contactNumber);
    for (let i = 0; i < Files.length; i++) {
      dataArray.append("userImg", Files[i]);
    }
    var token = sessionStorage.getItem("token");
    axios
      .put(
        "https://aquinapi.aquin.us/api/v1/admin/aquin/editadminprofile",

        dataArray,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(
        (res) => {
          if (res.status === 200) {
            toast(res.data.message);
            myprofile();
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

  return (
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
          <Link color="inherit" href="/" style={{ color: "black" }}>
            Profile
          </Link>
        </Breadcrumbs>

        <Row className="mt-3">
          <Col xl="12" md="6">
            <Card className="directory-card" id="cards">
              <div>
                <div className="directory-bg text-center">
                  <div className="directory-overlays">
                    <img
                      className="rounded-circle avatar-lg img-thumbnail"
                      src={
                        "https://aquinapi.aquin.us" + "/" + user.profilePicture
                      }
                      style={{ height: "100px" }}
                      alt="Generic placeholder"
                    />
                  </div>
                </div>

                <div className="directory-content text-center p-4">
                  <p className="font-size-16 mt-4">
                    <b>Name :</b> {user.username}
                  </p>
                  <p className="font-size-16 ">
                    <b>Email : </b>
                    {user.email}
                  </p>
                  <p>
                    <b>Phone No :</b> {user.contactNumber}
                  </p>
                  <p>
                    <b>Role :</b> {user.role}
                  </p>
                </div>
              </div>
            </Card>
          </Col>
        </Row>
        <Card id="cards">
          <CardBody>
            <Row>
              <Col lg={6} className="ms-lg-auto">
                <div className="mt-5 mt-lg-4">
                  <h5 className="font-size-14 mb-4">
                    <i className="mdi mdi-arrow-right text-primary me-1"></i>{" "}
                    Edit Profile
                  </h5>
                  <form
                    method="post"
                    onSubmit={(e) => {
                      handleSubmit(e);
                    }}
                  >
                    <div className="row mb-4">
                      <label
                        htmlFor="horizontal-firstname-input"
                        className="col-sm-4 col-form-label"
                      >
                        Name:
                      </label>
                      <div className="col-sm-8">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Name"
                          name="username"
                          value={user.username}
                          required
                          onChange={(e) => {
                            handleChange(e);
                          }}
                        />
                      </div>
                    </div>

                    <div className="row mb-4">
                      <label
                        htmlFor="horizontal-email-input"
                        className="col-sm-4 col-form-label"
                      >
                        Email:
                      </label>
                      <div className="col-sm-8">
                        <input
                          type="email"
                          className="form-control"
                          placeholder="Enter Email"
                          name="email"
                          value={user.email}
                          required
                          onChange={(e) => {
                            handleChange(e);
                          }}
                        />
                      </div>
                    </div>
                    <div className="row mb-4">
                      <label
                        htmlFor="horizontal-email-input"
                        className="col-sm-4 col-form-label"
                      >
                        Phone:
                      </label>
                      <div className="col-sm-8">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter contactNumber"
                          name="contactNumber"
                          value={user.contactNumber}
                          required
                          onChange={(e) => {
                            handleChange(e);
                          }}
                        />
                      </div>
                    </div>

                    <div className="row mb-4">
                      <label
                        htmlFor="horizontal-email-input"
                        className="col-sm-4 col-form-label"
                      >
                        Image:
                      </label>
                      <div className="col-sm-8">
                        <input
                          type="file"
                          className="form-control"
                          name="image"
                          multiple
                          onChange={changeHandler}
                          required
                        />
                      </div>
                    </div>

                    <div
                      className="row justify-content-end"
                      style={{ float: "right" }}
                    >
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
              </Col>

              <Col lg={6} className="ms-lg-auto">
                <div className="mt-5 mt-lg-4">
                  <h5 className="font-size-14 mb-4">
                    <i className="mdi mdi-arrow-right text-primary me-1"></i>
                    Change password
                  </h5>

                  <form
                    method="post"
                    onSubmit={(e) => {
                      handleSubmit1(e);
                    }}
                  >
                    <div className="row mb-4">
                      <label
                        htmlFor="horizontal-firstname-input"
                        className="col-sm-4 col-form-label"
                      >
                        Current password:
                      </label>
                      <div className="col-sm-8">
                        <input
                          type="text"
                          className="form-control"
                          id="horizontal-firstname-input"
                          placeholder="Enter  Current password"
                          required
                          name="password"
                          value={form.password}
                          onChange={(e) => {
                            handleChange1(e);
                          }}
                        />
                      </div>
                    </div>

                    <div className="row mb-4">
                      <label
                        htmlFor="horizontal-email-input"
                        className="col-sm-4 col-form-label"
                      >
                        Change password:
                      </label>
                      <div className="col-sm-8">
                        <input
                          type="text"
                          className="form-control"
                          id="horizontal-email-input"
                          placeholder="Enter Change password"
                          required
                          name="newpassword"
                          value={form.newpassword}
                          onChange={(e) => {
                            handleChange1(e);
                          }}
                        />
                      </div>
                    </div>

                    <div className="row  mb-4">
                      <label
                        htmlFor="horizontal-email-input"
                        className="col-sm-4 col-form-label"
                      >
                        Confirm password:
                      </label>
                      <div className="col-sm-8">
                        <input
                          type="text"
                          className="form-control"
                          id="horizontal-email-input"
                          placeholder="Enter Confirm password"
                          required
                          value={form.confirmpassword}
                          name="confirmpassword"
                          onChange={(e) => {
                            handleChange1(e);
                          }}
                        />
                      </div>
                    </div>

                    <div
                      className="row justify-content-end"
                      style={{ float: "right" }}
                    >
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
              </Col>
            </Row>
            <ToastContainer />
          </CardBody>
        </Card>
      </Box>
    </Box>
  );
}

export default Profile;
