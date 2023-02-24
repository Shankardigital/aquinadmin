import React ,{useState,useEffect}from "react";
import { Card, CardBody, Row, Col } from "reactstrap";
import ViewInArIcon from "@mui/icons-material/ViewInAr";
import LayersIcon from "@mui/icons-material/Layers";
import SellIcon from "@mui/icons-material/Sell";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
// import ReactApexChart from "react-apexcharts"
import coin from "../../assets/images/coin.png";
import axios from "axios"
import {useNavigate} from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";





function Minicards() {

  const navigate = useNavigate();

  const [user, setuser] = useState([]);
  const [user1, setuser1] = useState([]);
  const [user0, setuser0] = useState([]);
  const [user2, setuser2] = useState([]);
  const [user3, setuser3] = useState([]);
  const [user4, setuser4] = useState([]);
  const [user5, setuser5] = useState([]);




  const getCategory = () => {
    var token = sessionStorage.getItem("token");
    axios
      .post(
        "https://aquinapi.aquin.us/api/v1/admin/dashboard/get-dashboarditems",
        {},

        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        setuser1(res.data.tottalActiveMembers);
        setuser2(res.data.totalAdminIncome);
        setuser4(res.data.totalEarningCoins);
        setuser3(res.data.totalTodayEarningCoins);
        // setuser5(res.data.showCoinVal);
        // setuser0(res.data.totalMembers);
        console.log(res.data)
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
    <React.Fragment>
      <Row>
        <Col md={3} className="mt-3">
          <Card
            className="mini-stat"
            style={{ background: "#4eadff", borderRadius: "10px",height:"120px" }}
          >
            <CardBody className="card-body mini-stat-img">
              <div className="mini-stat-icon" style={{ float: "right" }}>
                <i
                  style={{ color: "#fff" }}
                  class="fa fa-cube"
                  aria-hidden="true"
                ></i>
              </div>
              <div>
                <h6 className="mb-3 font-size-16">Total Members</h6>
                <h6 className="mb-4 text-dark">{user1}</h6>
                {/* <ReactApexChart
                        options={report.options}
                        series={report.series}
                        type="area"
                        height={40}
                        className="apex-charts"
                      /> */}
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col md={3} className="mt-3">
          <Card
            className="mini-stat"
            style={{ background: "#0bc3a1", borderRadius: "10px" ,height:"120px"}}
          >
            <CardBody className="card-body mini-stat-img">
              <div className="mini-stat-icon" style={{ float: "right" }}>
                <i
                  style={{ color: "#dark" }}
                  class="fa fa-users"
                  aria-hidden="true"
                ></i>
              </div>
              <div className="text-dark">
                <h6 className="mb-3 font-size-16 text-dark">Total Income</h6>
                <h6 className="mb-4 text-dark">{user2}</h6>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col md={3} className="mt-3">
          <Card
            className="mini-stat"
            style={{ background: "#50a8ca", borderRadius: "10px" ,height:"120px"}}
          >
            <CardBody className="card-body mini-stat-img">
              <div className="mini-stat-icon" style={{ float: "right" }}>
                <i >
                  <img src={coin} height="60" alt="" />
                </i>
              </div>
              <div className="text-dark">
                <h6
                  className=" mb-3 font-size-16 text-dark"
                  style={{ color: "black", fontWeight: "bold" }}
                >
                  Total Earning Coins
                </h6>
                <h6 className="mb-4 text-dark">{user4}</h6>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col md={3} className="mt-3">
          <Card
            className="mini-stat"
            style={{ background: "#d18b35", borderRadius: "10px",height:"120px" }}
          >
            <CardBody className="card-body mini-stat-img">
              <div className="mini-stat-icon" style={{ float: "right" }}>
                <i
                  style={{ color: "#fff"}}
                  class="fa fa-bell"
                  aria-hidden="true"
                ></i>
              </div>
              <div className="text-dark">
                <h6
                  className=" mb-3 font-size-16 text-dark"
                  style={{ color: "black", fontWeight: "bold" }}
                >
                  Today Earning Coins
                </h6>
                <h6 className="mb-4 text-dark">{user3}</h6>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <ToastContainer/>
    </React.Fragment>
  );
}

export default Minicards;
