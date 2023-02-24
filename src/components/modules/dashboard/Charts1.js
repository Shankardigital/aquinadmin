import React,{useState,useEffect} from "react";
import { Row, Col, Card, CardBody } from "reactstrap";
import ReactApexChart from "react-apexcharts";
import axios from "axios";
import {useNavigate} from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";

function Charts1() {
  const navigate = useNavigate();
  const [user0, setuser0] = useState({membersArr: [] , monthsArr:[]});
  // const [user1, setuser1] = useState();
  console.log(user0.membersArr)
  // console.log(user1)

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
        setuser0(res.data);
        // setuser1(res.data);
        // setuser1(res.data);
        // setuser2(res.data.totalAdminIncome);
        // setuser4(res.data.totalEarningCoins);
        // setuser3(res.data.totalTodayEarningCoins);
        // setuser5(res.data.showCoinVal);
        // setuser0(res.data.totalMembers);
        // console.log(res.data.monthsArr)
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

  const state = {
    options: {
      colors: ["#ccc", "#7a6fbe", "#28bbe3"],
      chart: {
        toolbar: {
          show: !1,
        },
      },
      dataLabels: {
        enabled: !1,
      },
      stroke: {
        curve: "smooth",
        width: 0.1,
      },
      grid: {
        borderColor: "#f8f8fa",
        row: {
          colors: ["transparent", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: user0.monthsArr,
        axisBorder: {
          show: !1,
        },
        axisTicks: {
          show: !1,
        },
      },
      legend: {
        show: !1,
      },
    },
    series: [
      {
        name: "Series A",
        data:user0.membersArr,
        // data: [10,0,10,2,4,3,0,0,0,0,0,21],
      },
    ],
  };

  return (
    <div>
      <React.Fragment>
        <Card id="cards" className="mainn">
          <CardBody>
            <h4 className="card-title mb-4" style={{ color: "rgb(91,98,131)" }}>
              <h6>Total Member list</h6>
            </h4>

            {/* <Row className="text-center mt-4">
              <Col xs="4">
                <h5
                  className="font-size-20"
                  style={{ color: "rgb(91,98,131)" }}
                >
                  89425
                </h5>
                <p className="text-muted" style={{ color: "rgb(91,98,131)" }}>
                  Marketplace
                </p>
              </Col>
              <Col xs="4">
                <h5
                  className="font-size-20"
                  style={{ color: "rgb(91,98,131)" }}
                >
                  {" "}
                  56210
                </h5>
                <p className="text-muted" style={{ color: "rgb(91,98,131)" }}>
                  Total Income
                </p>
              </Col>
              <Col xs="4">
                <h5
                  className="font-size-20"
                  style={{ color: "rgb(91,98,131)" }}
                >
                  {" "}
                  8974
                </h5>
                <p className="text-muted" style={{ color: "rgb(91,98,131)" }}>
                  Last Month
                </p>
              </Col>
            </Row> */}

            <div
              id="morris-area-example"
              className="morris-charts morris-charts-height"
              dir="ltr"
            >
              <ReactApexChart
                options={state.options}
                series={state.series}
                type="area"
                height="300"
              />
            </div>
          </CardBody>
        </Card>
      </React.Fragment>
    </div>
  );
}

export default Charts1;
