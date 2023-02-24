import React,{useState,useEffect} from "react";
import C3Chart from "react-c3js";
import "c3/c3.css";
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
} from "reactstrap";
import axios from "axios";
import {useNavigate} from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";


function Charts() {
  const navigate = useNavigate();

  const [user0, setuser0] = useState({"totalApprovedcoins":0,"totalRequestedCoins":0,"totalPendingcoins":0});
  console.log(user0.totalApprovedcoins)

  // const data = {
  //   columns: [
  //     ["data1", 30, 200, 100, 400, 150, 250],
  //     ["data2", 50, 20, 10, 40, 15, 25],
  //   ],
  // };

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
        setuser0(res.data.earningChart);
        // setuser2(res.data.totalAdminIncome);
        // setuser4(res.data.totalEarningCoins);
        // setuser3(res.data.totalTodayEarningCoins);
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

  const datas = {
    columns: [
      ["Payout Coins", user0.totalApprovedcoins],
      ["Withdraw Coins",  user0.totalPendingcoins],
      ["Total Coins",  user0.totalRequestedCoins]
    ],
    type: "donut",
  };

  const donut = {
    title: "Total income 30",
    width: 30,
    label: { show: !1 },
  };

  const color = {
    pattern: ["#f0f1f4", "#7a6fbe", "#28bbe3"],
  };

  const size = {
    height: 300,
  };


  return (
    <div>
      <React.Fragment>
        <Card id="cards" className="mainn">
          <CardBody>
            <CardTitle className="h4 mb-4" style={{ color: "rgb(91,98,131)" }}>
              <h6>Total Earnings</h6>
            </CardTitle>

            <Row className="text-center mt-4">
              {/* <div className="col-6">
                <h5
                  className="font-size-20"
                  style={{ color: "rgb(91,98,131)" }}
                >
                  ₹56241
                </h5>
                <p className="text-muted" style={{ color: "rgb(91,98,131)" }}>
                  value
                </p>
              </div>
              <div className="col-6">
                <h5
                  className="font-size-20"
                  style={{ color: "rgb(91,98,131)" }}
                >
                  ₹23651
                </h5>
                <p className="text-muted" style={{ color: "rgb(91,98,131)" }}>
                  Total Income
                </p>
              </div> */}
            </Row>
            <div dir="ltr">
              <C3Chart
                data={datas}
                // donut={donut}
                color={color}
                size={size}
                dir="ltr"
              />
            </div>
          </CardBody>
        </Card>
      </React.Fragment>
    </div>
  );
}

export default Charts;
