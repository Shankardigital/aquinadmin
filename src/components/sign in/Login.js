import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Row, Col, CardBody, Card, Alert, Container } from "reactstrap";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import logos1 from "../assets/images/logos.png";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [admin, setadmin] = useState({ email: "", password: "" });
  let navigate = useNavigate();
  const handleChange = (e) => {
    let newadmin = { ...admin };
    newadmin[e.target.name] = e.target.value;
    setadmin(newadmin);
  };

  const addAdmin = (e) => {
    e.preventDefault();
    var paras = {
      email: admin.email,
      password: admin.password,
    };

    axios
      .post("https://aquinapi.aquin.us/api/v1/admin/aquin/usersignin", paras)
      .then(
        (res) => {
          if (res.status === 200) {
            toast(res.data.message);
            console.log(res.data.user);
            sessionStorage.setItem("AdminId", res.data.user._id);
            sessionStorage.setItem("email", res.data.user.email);
            sessionStorage.setItem("role", res.data.user.role);
            sessionStorage.setItem("token", res.data.token);
           
            navigate("/dashboard");
          }
        },
        (error) => {
          if (error.response && error.response.status === 400) {
            toast(error.response.data.message);
            window.location.href = "/login";
          }
        }
      );
  };
  return (
    <React.Fragment>
      <div className="account-pages my-5 pt-sm-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <Card className="overflow-hidden" id="cards">
                <CardBody className="pt-0">
                  <h3 className="text-center mt-5 mb-4">
                    <Link to="" className="d-block auth-logo">
                      <img src={logos1} width="200px" alt="logo"></img>
                    </Link>
                  </h3>
                  <div className="p-3">
                    <h4 className="text-muted font-size-18 mb-1 text-center">
                      Welcome Back !
                    </h4>
                    <p className="text-muted text-center">
                      Sign in to continue to AQUIN Admin Panel.
                    </p>
                    <form
                      className="form-horizontal mt-4"
                      method="post"
                      onSubmit={(e) => {
                        addAdmin(e);
                      }}
                    >
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <input
                          type="email"
                          class="form-control email"
                          name="email"
                          value={admin.email}
                          onChange={(e) => {
                            handleChange(e);
                          }}
                          required
                          placeholder="Email address"
                        />
                        <span class="focus-input"></span>
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>Password</Form.Label>
                        <input
                          type="password"
                          class="form-control password"
                          name="password"
                          value={admin.password}
                          onChange={(e) => {
                            handleChange(e);
                          }}
                          required
                          placeholder="Password"
                        />
                      </Form.Group>

                      <div className="col-12">
                        <div>
                          <Link to="/forgot-password" className="text-primary">
                            <a style={{ color: "blue", cursor: "pointer" }}>
                              Forget pasword?
                            </a>{" "}
                          </Link>
                        </div>
                      </div>

                      <div className="mb-3 row mt-4">
                        <div className="col-6">
                          <div className="form-check"></div>
                        </div>
                        <div className="col-6 text-end">
                          <button className="btn btn-primary " type="submit">
                            Log In
                          </button>
                        </div>
                      </div>
                      <div className="form-group mb-0 row">
                        <div className="col-12 mt-4">
                          {/* <Link to="/forgot-password" className="text-muted">
                            <i className="mdi mdi-lock"></i> Forgot your
                            password?
                          </Link> */}
                        </div>
                      </div>
                    </form>
                  </div>
                </CardBody>
              </Card>
              
              <div className="mt-5 text-center">
                <p>
                  © {new Date().getFullYear()} AQUIN
                  <span className="d-none d-sm-inline-block">
                    {" "}
                    - Design by<i className="mdi mdi-heart text-danger"></i>{" "}
                    Digitalraiz.
                  </span>
                </p>
              </div>
            </Col>
          </Row>
          <ToastContainer />
        </Container>
      </div>
    </React.Fragment>
  );
}

export default Login;
