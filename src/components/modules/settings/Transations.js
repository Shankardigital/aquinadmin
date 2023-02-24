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

function Transations() {
  const navigate = useNavigate();
  const [editResults, seteditResults] = React.useState(false);
  const editfield = () => seteditResults(false);

  const [mini,setmini]=useState([])
  console.log(mini)
  const [maxs,setmaxs]=useState([])

  const handleChange = (e) => {
    let myUser = { ...user };
    myUser[e.target.name] = e.target.value;
    setuser(myUser);
    const mindata = user.maxAmount > e.target.value
    console.log(mindata)
    setmini(mindata)
  };
  const handleChange1 = (e) => {
    let myUser = { ...user };
    myUser[e.target.name] = e.target.value;
    setuser(myUser);
    // const maxdata = user.minAmount > e.target.value
    // console.log(maxdata)
    // setmaxs(maxdata)
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    add();
  };

  const add = () => {
    const datas = {
      minAmount: user.minAmount,
      maxAmount: user.maxAmount,
      percentTax: user.percentTax,

    };
    var token = sessionStorage.getItem("token");
    axios
      .put(
        "https://aquinapi.aquin.us/api/v1/admin/transactlimit/edit-transact",
        datas,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(
        (res) => {
          if (res.status === 200) {
            toast(res.data.message);
            editfield();
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

  const [user, setuser] = useState([]);
  const [user12, setuser12] = useState([]);
  console.log(user);

  const getCategory = () => {
    var token = sessionStorage.getItem("token");
    axios
      .post(
        "https://aquinapi.aquin.us/api/v1/admin/transactlimit/get-transact",
        {},

        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        setuser(res.data.limitResult);
        setuser12(res.data.limitResult);

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
            ,<Typography color="text.primary">Transactions</Typography>
          </Breadcrumbs>

          <React.Fragment>
            <Row style={{ paddingTop: "30px" }}>
              <Col xs="12">
                {/* {editResults ? ( */}
                  <Card id="cards">
                    <div className="container">
                    <CardBody>
                      <CardTitle className="h4">Transactions </CardTitle>

                      <Form
                      className="mt-4"
                        method="post"
                        onSubmit={(e) => {
                          handleSubmit(e);
                        }}
                      >
                        <Row>
                          <Col md="3">
                            <Form.Group
                              className="mb-3"
                              controlId="formBasicEmail"
                            >
                              <Form.Label> Min Value</Form.Label>
                              
                              <Form.Control
                                name="minAmount"
                                required
                                placeholder="Enter Coins"
                                type="number"
                                value={user.minAmount}
                                onChange={(e) => {
                                  handleChange(e);
                                }}
                              />
                              {/* {mini == false ?(
                               <small className="text-danger mt-1">You Entered Wrong data</small>
                              ):(
                                ""
                              )} */}
                            </Form.Group>
                          </Col>
                          <Col md="3">
                            <Form.Group
                              className="mb-3"
                              controlId="formBasicEmail"
                            >
                              <Form.Label> Max Value</Form.Label>
                              <Form.Control
                                name="maxAmount"
                                required
                                placeholder="Enter Coins"
                                type="number"
                                value={user.maxAmount}
                                onChange={(e) => {
                                  handleChange1(e);
                                }}
                              />
                            </Form.Group>
                          </Col>
                          <Col md="3">
                            <Form.Group
                              className="mb-3"
                              controlId="formBasicEmail"
                            >
                              <Form.Label> Tax %</Form.Label>
                              <Form.Control
                                name="percentTax"
                                placeholder="Enter Coins"
                                type="number"
                                required
                                value={user.percentTax}
                                onChange={(e) => {
                                  handleChange(e);
                                }}
                              />
                            </Form.Group>
                          </Col>
                          <Col md="3">
                            <div style={{ paddingTop: "30px" }}>
                              {/* {mini == false ?(
                                ""
                              ):( */}
                                <Button variant="primary" type="submit">
                                Submit
                              </Button>
                              {/* )} */}
                             
                            </div>
                          </Col>
                        </Row>
                      </Form>
                    </CardBody>
                    </div>
                  </Card>
                {/* // ) : (
                //   ""
                // )} */}

                {/* <Card id="cards">
                  <CardBody>
                    <CardTitle className="h4">Transations Details </CardTitle>
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
                                <th> Min Value :</th>
                                <td>{user.minAmount}</td>
                              </tr>
                              <tr>
                                <th> Max Value :</th>
                                <td>{user.maxAmount}</td>
                              </tr>
                            </tbody>
                          </Table>
                        </div>
                        <ToastContainer />
                      </Col>
                    </Row>
                  </CardBody>
                </Card> */}
              </Col>
                <ToastContainer />
            </Row>
          </React.Fragment>
        </Box>
      </Box>
    </div>
  );
}

export default Transations;

{
  /* <div className="table-responsive">
{user.length >= 1 ? (
  <Table
    bordered
    className="mt-4"
    id="empTable"
    aria-describedby="xin_table_info"
    style={{ overflowX: "hidden" }}
  >
    <thead style={{ background: "#5db3de" }}>
      <tr style={{ color: "#fff" }}>
        <th>Sl.No</th>
        <th>State Name</th>
        <th>Country</th>
        <th>Description</th>
        <th>Status</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {lists
        .filter((value) => {
          if (search === !null) {
            return value;
          } else if (
            value.title
              .toLowerCase()
              .includes(search.toLowerCase())
          ) {
            return value;
          }
        })
        .map((data, i) => {
          return (
            <tr key={i}>
              <td>{(pageNumber - 1) * 10 + i + 11}</td>
              <td>{data.title}</td>
              <td>{data.countryName}</td>
              <td>{data.description}</td>
              <td>
                {data.status === true || data.status == "true"
                  ? "active"
                  : "Inactive"}
              </td>
              <td>
                {" "}
                <EditIcon
                  onClick={() => {
                    getpopup(data);
                  }}
                  style={{ fontSize: "30px", color: "black" }}
                />{" "}
                <DeleteForeverIcon
                  onClick={() => {
                    manageDelete(data);
                  }}
                  style={{ fontSize: "30px", color: "red" }}
                />
              </td>
            </tr>
          );
        })}
    </tbody>
  </Table>
) : (
  <center>
    <h5 style={{ textAlign: "center" }}>
      {" "}
      <CircularProgress />
    </h5>
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
<ToastContainer />
</div> */
}
