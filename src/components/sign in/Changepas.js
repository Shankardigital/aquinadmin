import React, { useState } from "react";
import { Row, Col, CardBody, Card, Alert, Container, Label } from "reactstrap";
import { useNavigate, Link } from "react-router-dom";
import logo from "../assets/images/logos.png";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

function Login() {
  const [user, setUser] = useState({
    newpassword: "",
    confirmpassword: "",
  });

  const handleChange = (e) => {
    let newadmin = { ...user };
    newadmin[e.target.name] = e.target.value;
    setUser(newadmin);
  };
  const navigate = useNavigate();
  const usersign = (e) => {
    e.preventDefault();
    signin();
  };
  // sessionStorage.setItem("Email",res.data.userinfo.email);
  // sessionStorage.setItem("ids",res.data.userinfo.id);

  const signin = () => {
    const dataArray = new FormData();
    dataArray.append("_id", sessionStorage.getItem("ids"));
    dataArray.append("newpassword", user.newpassword);
    dataArray.append("confirmpassword", user.confirmpassword);
    axios
      .post(
        "https://aquinapi.aquin.us/api/v1/admin/aquin/resetpasword",
        dataArray
      )
      .then(
        (res) => {
          toast(res.data.message);
          navigate("/login");
          sessionStorage.removeItem("ids")
        },
        (error) => {
          if (error.response && error.response.status === 400) {
            toast(error.response.data.message);
          }
        }
      );
  };

  return (
    <div>
      <div className="account-pages my-5 pt-sm-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <Card className="overflow-hidden">
                <CardBody className="pt-0">
                  <h3 className="text-center mt-4">
                    <Link to="/" className="d-block auth-logo">
                      <img
                        src={logo}
                        style={{ width: "200px" }}
                        className="auth-logo-dark"
                      />
                    </Link>
                  </h3>

                  <div className="p-3">
                    <h4 className="text-muted font-size-18 mb-1 text-center">
                      Change Password !
                    </h4>

                    <form onSubmit={usersign} className="form-horizontal mt-4">
                      <div className="mb-3">
                        <Label>Password</Label>
                        <input
                          name="newpassword"
                          className="form-control"
                          value={user.newpassword}
                          type="password"
                          required
                          placeholder="Enter Password"
                          onChange={(e) => {
                            handleChange(e);
                          }}
                        />
                      </div>

                      <div className="mb-3">
                        <Label>Confirm Password</Label>
                        <input
                          name="confirmpassword"
                          className="form-control"
                          value={user.confirmpassword}
                          type="password"
                          required
                          placeholder="Enter Confirm Password"
                          onChange={(e) => {
                            handleChange(e);
                          }}
                        />
                      </div>

                      <div className="mb-3 row mt-4">
                        <div className="col-6">
                          <div className="form-check"></div>
                        </div>
                        <div className="col-6">
                          <div style={{ float: "right" }}>
                            <button
                              style={{ width: "100px" }}
                              className="btn btn-info w-md waves-effect waves-light"
                              type="submit"
                            >
                              submit
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="form-group mb-0 row"></div>
                    </form>
                  </div>
                </CardBody>
              </Card>
              <div className="mt-5 text-center">
                <p>
                  Don&#39;t have an account ?{" "}
                  <Link to="/register" className="text-primary">
                    {" "}
                    Signup now{" "}
                  </Link>{" "}
                </p>
                <p>
                  © {new Date().getFullYear()} Aquin
                  <span className="d-none d-sm-inline-block">
                    {" "}
                    - Designed{" "}
                    <i
                      class="fa fa-heart text-danger"
                      aria-hidden="true"
                    ></i>{" "}
                    by DigitalRaiz Creative Solutions.
                  </span>
                </p>
              </div>
            </Col>
          </Row>
          <ToastContainer />
        </Container>
      </div>
    </div>
  );
}

export default Login;
