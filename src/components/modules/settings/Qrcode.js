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
import Sidebarres from "../../sidebar/Sidebarres";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Typography from "@mui/material/Typography";
import {useNavigate} from 'react-router-dom';


function Coins() {
  const navigate = useNavigate();
  const [editResults1, seteditResults1] = React.useState(false);
  const editfield1 = () => seteditResults1(false);

  const handleChange = (e) => {
    let myUser = { ...user };
    myUser[e.target.name] = e.target.value;
    setuser(myUser);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    add();
  };
  const [Files, setFiles] = useState("");

  const changeHandler = (e) => {
    setFiles(e.target.files);
  };


  const add = () => {
    const dataArray = new FormData();
    for (let i = 0; i < Files.length; i++) {
      dataArray.append("qrImg", Files[i]);
    }
    var token = sessionStorage.getItem("token");
    axios
      .put(
        "https://aquinapi.aquin.us/api/v1/admin/qrimg/editadminqr",
        dataArray,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(
        (res) => {
          if (res.status === 200) {
            toast(res.data.message);
            editfield1();
            getCategory();
          }
        },
        (error) => {
          if (error.response && error.response.status === 400) {
            toast(error.response.data.message);
          }else if (error.response && error.response.status === 401){
            toast(error.response.data.message);
            navigate("/login");
          }else if (error.response && error.response.status === 500){
            toast("This file extension is not allowed");
            // navigate("/login");
          }
        }
      );
  };

  const [user, setuser] = useState([]);
  console.log(user);

  const getCategory = () => {
    var token = sessionStorage.getItem("token");
    axios
      .post(
        "https://aquinapi.aquin.us/api/v1/admin/qrimg/getadminqr",
        {},

        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        setuser(res.data.QrResult);
        console.log(res.data.QrResult)
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
    getCategory();
  }, []);

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
            ,<Typography color="text.primary">Qr Code</Typography>
          </Breadcrumbs>

          <React.Fragment>
            <Row style={{ paddingTop: "30px" }}>
              <Col xs="12">
              
                  <Card id="cards">
                    <div className="container">
                    <CardBody>
                      <CardTitle className="h4">Qr Code</CardTitle>
                     
                        <button style={{float:"right"}}  className="btn btn-outline-info mb-5" onClick={() => {
                          seteditResults1(!editResults1);
                        }} >
                        <i class="fa fa-qrcode" aria-hidden="true"></i> Edit
                        </button>
                        {/* <EditIcon style={{ color: "white" }} /> */}
                    
                      {editResults1 ? (
                      <Form
                      className="mt-4"
                        method="post"
                        onSubmit={(e) => {
                          handleSubmit(e);
                        }}
                      >
                         
                        <Row>
                          <Col md="4">
                            <Form.Group
                              className="mb-3"
                              // className="form-control"
                            >
                              <Form.Label>Edit Qr Code</Form.Label>
                              <Form.Control
                                name="qrImg"
                                placeholder="Enter Qr Img"
                                type="file"
                                required
                                // value={user.numberOfCoin}
                                // onChange={(e) => {
                                //   handleChange(e);
                                // }}
                                onChange={changeHandler}
                              />
                            </Form.Group>
                          </Col>
                          {/* <Col md="4">
                            <Form.Group className="mb-3">
                              <Form.Label> Current Value</Form.Label>
                              <Form.Control
                                name="amount"
                                placeholder="Enter Coins"
                                type="number"
                                value={user.amount}
                                onChange={(e) => {
                                  handleChange(e);
                                }}
                              />
                            </Form.Group>
                          </Col> */}
                          <Col md="3">
                            <div style={{ paddingTop: "30px" }}>
                              <Button variant="primary" type="submit">
                                Submit
                              </Button>
                            </div>
                          </Col>
                        </Row>
                      </Form>
                       ) : (
                        <div className="text-center">
                        <img style={{width:"30%"}} src={"https://aquinapi.aquin.us" + "/" + user.qrImage}/>
                      </div>
                      )}


     
                    </CardBody>
                    </div>
                  
                  </Card>
                
                {/* <Card id="cards">
                  <CardBody>
                    <CardTitle className="h4">Coin Details </CardTitle>
                    <div style={{ float: "right", paddingLeft: "20px" }}>
                      <Button
                        className="btn btn-primary"
                        onClick={() => {
                          seteditResults(!editResults);
                        }}
                      >
                        <EditIcon style={{ color: "white" }} />
                      </Button>
                    </div>
                    <Row>
                      <Col>
                        <div className="table-responsive">
                          <Table className="table table-bordered ">
                            <tbody>
                              <tr>
                                <th> Coins :</th>
                                <td>{user.numberOfCoin}</td>
                              </tr>
                            </tbody>
                            <tbody>
                              <tr>
                                <th> Current Value :</th>
                                <td>{user.amount}</td>
                              </tr>
                            </tbody>
                          </Table>
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card> */}
              </Col>
            </Row>
            <ToastContainer />
          </React.Fragment>
        </Box>
      </Box>
    </div>
  );
}

export default Coins;
