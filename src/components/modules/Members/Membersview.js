import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Sidebar from "../../sidebar/Sidebar";
import CssBaseline from "@mui/material/CssBaseline";
import {
  Row,
  Col,
  Card,
  CardBody,
  FormGroup,
  Button,
  CardTitle,
  Label,
  Input,
  Table,
} from "reactstrap";
import Form from "react-bootstrap/Form";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import BlockIcon from "@mui/icons-material/Block";
import VisibilityIcon from "@mui/icons-material/Visibility";
import user2 from "../../assets/images/users/user-2.jpg";
import user3 from "../../assets/images/users/user-3.jpg";
import user4 from "../../assets/images/users/user-4.jpg";
import user5 from "../../assets/images/users/user-5.jpg";
import user6 from "../../assets/images/users/user-6.jpg";
import user7 from "../../assets/images/users/user-7.jpg";
import { Link, NavLink } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";

import Modal from "react-bootstrap/Modal";
import Stack from "@mui/material/Stack";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import ReactPaginate from "react-paginate";

import ReactHTMLTableToExcel from "react-html-table-to-excel";
import html2canvas from "html2canvas";
import pdfMake from "pdfmake";
import Sidebarres from "../../sidebar/Sidebarres";
import axios from "axios";
// import Moment from "react-moment";
// import ReactPaginate from "react-paginate";
import { ToastContainer, toast } from "react-toastify";
import {useNavigate} from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";

function Membersview() {
  const [show, setShow] = useState(true);
  const navigate = useNavigate();

  const [user, setuser] = useState([]);
  console.log(user);

//   const getCategory = () => {
//     var token = sessionStorage.getItem("token");
//     axios
//       .post(
//         "https://aquinapi.aquin.us/api/v1/admin/member/getallmember",
//         {},

//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       )
//       .then((res) => {
//         setuser(res.data.membersResult);
//       });
//   };

  const memberview = () => {
    var token = sessionStorage.getItem("token");
    axios
      .post(
        "https://aquinapi.aquin.us/api/v1/admin/member/get-memberbyuserid",
        {},

        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        setuser(res.data.membersResult);
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

  const userdata = sessionStorage.getItem("userid")

  const getonemmber = () => {
    var token = sessionStorage.getItem("token");
    const userid= userdata

    axios
      .post(
        "https://aquinapi.aquin.us/api/v1/admin/member/get-memberbyuserid" + "/" +
        userid,{},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        setuser(res.data.memResult);
        console.log(res.data.memResult)
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

  useEffect(() => {
    getonemmber();
  }, []);

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

//   const pagesVisited = pageNumber * listPerPage;
//   const lists = user.slice(pagesVisited, pagesVisited + listPerPage);
//   const pageCount = Math.ceil(user.length / listPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const api_url = "https://aquinapi.aquin.us";

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
               
                <Typography color="text.primary">Member Veiw</Typography>
              </Breadcrumbs>
            </Col>
            <Col>
            <div style={{float:"right"}}>
            <Link to="/Managemember">
               <button className="btn btn-info text-white"><i class="fa fa-arrow-circle-o-left" aria-hidden="true"></i> Back</button>
               </Link> 
            </div>
            </Col>
            {/* <Col>
              <div style={{ float: "right" }}>
                <Button
                  onClick={() => setShow(true)}
                  type="button"
                  color="link"
                  className="waves-effect"
                  style={{
                    backgroundColor: show ? "rgb(16,101,156)" : "",
                    color: show ? "white" : "black",
                    textDecoration: "none",
                  }}
                >
                  <i class="fa fa-th-large" aria-hidden="true"></i> Grid view
                </Button>

                <Button
                  type="button"
                  color="link"
                  className="waves-effect"
                  onClick={() => setShow(false)}
                  style={{
                    backgroundColor: !show ? "rgb(16,101,156)" : "",
                    color: !show ? "white" : "black",
                    paddingRight: "10px",
                    textDecoration: "none",
                  }}
                >
                  <i class="fa fa-bars" aria-hidden="true"></i> List view
                </Button>
              </div>
            </Col> */}
          </Row>
         
            <Card id="cards">
              <CardBody>


              <div className="directory-bg text-center">
                  <div className="directory-overlays">
                    <img
                      className="rounded-circle avatar-lg img-thumbnail"
                      src={
                        "https://aquinapi.aquin.us" + "/" + user.profileImage
                      }
                      style={{ height: "100px",marginBottom: "-70px"}}
                      alt="Generic placeholder"
                    />
                  </div>
                </div>

                <Row  className=" viewmemst ">
                    <Col md={6}>
                    <Row>
                        <Col>
                        <p><b>User Id</b> </p>
                        <p><b>Name</b> </p>
                        <p><b>Email</b> </p>
                        <p><b>Phone No.</b> </p>
                        <p><b>dateOfBirth</b> </p>
                        <p><b>SponsorId</b> </p>
                        <p><b>Sponsor Name</b> </p>
                       
                        </Col>
                        <Col>
                        <p>: {user.user_id}</p>
                        <p>: {user.name}</p>
                        <p>: {user.email}</p>
                        <p>: {user.contactNumber}</p>
                        <p>: {user.dateOfBirth}</p>
                        <p>: {user.sponsorId}</p>
                        <p>: {user.sponsorName}</p>
                        </Col>
                    </Row>
                    </Col>
                    <Col md={6}>
                    <Row>
                        <Col>
                        <p><b>Aadhaar No</b> </p>
                        <p><b>State</b> </p>
                        <p><b>District</b> </p>
                        <p><b>City</b> </p>
                        <p><b>Area</b> </p>
                        <p><b>PinCode</b> </p>
                        <p><b>Address</b> </p>
                        </Col>
                        <Col>
                        <p>: {user.aadhaarCard}</p>
                        <p>: {user.stateName}</p>
                        <p>: {user.district}</p>
                        <p>: {user.city}</p>
                        <p>: {user.area}</p>
                        <p>: {user.pinCode}</p>
                        <p>: {user.address}</p>
                        </Col>
                    </Row>
                    </Col>
                </Row>
                
              </CardBody>
            </Card>
        </Box>
      </Box>
    </div>
  );
}

export default Membersview;
