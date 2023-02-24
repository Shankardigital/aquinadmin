import React from "react";
import Box from "@mui/material/Box";
import Sidebar from "../sidebar/Sidebar";
import CssBaseline from "@mui/material/CssBaseline";
import { Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Minicards from "./dashboard/Minicards";
import Charts from "./dashboard/Charts";
import Charts1 from "./dashboard/Charts1";
import Sidebarres from "../sidebar/Sidebarres";

function Dashboard() {
  return (
    <div>
      {" "}
      <Box sx={{ display: "flex" }} className="mainn">
      <div className='backgrounimgstyle'>
        <Sidebar />
        </div>
         <div className='drawecontent'>
        <Sidebarres />
        </div>
        <CssBaseline />
        <Box component="main" sx={{ flexGrow: 2, p: 4 }}>
          <Breadcrumbs aria-label="breadcrumb" style={{ paddingTop: "70px" }}>
            <Link color="inherit" href="/" style={{ color: "black" }}>
              Dashboard
            </Link>
          </Breadcrumbs>
          <React.Fragment>
            <Row className="mt-4">
              <Col xl="12">
                <Minicards />
              </Col>
            </Row>

            <Row className="mt-4">
              <Col xl="6">
                <Charts />
              </Col>
              <Col xl="6">
                <Charts1 />
              </Col>
            </Row>
          </React.Fragment>
        </Box>
      </Box>
    </div>
  );
}

export default Dashboard;
