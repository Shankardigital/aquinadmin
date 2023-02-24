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
import Modal from "react-bootstrap/Modal";
import Stack from "@mui/material/Stack";
import ReactPaginate from "react-paginate";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import html2canvas from "html2canvas";
import pdfMake from "pdfmake";
import Sidebarres from "../../sidebar/Sidebarres";

function Withdrawfund() {
  const [editResults, seteditResults] = React.useState(false);
  const editfield = () => seteditResults(false);

  const [user, setuser] = useState([]);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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

  const pagesVisited = pageNumber * listPerPage;
  const lists = user.slice(pagesVisited, pagesVisited + listPerPage);
  const pageCount = Math.ceil(user.length / listPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <div>
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
            <Row style={{ paddingTop: "30px" }}>
              <Col xs="12">
                <Card id="cards">
                  <CardBody>
                    <Row>
                      <Col>
                        <ReactHTMLTableToExcel
                          className="btn btn-primary m-2"
                          table="empTable"
                          filename="ReportExcel"
                          sheet="Sheet"
                          buttonText="Excel"
                          style={{ color: "white" }}
                        />
                        <Button
                          type="button"
                          className="btn btn-danger "
                          onClick={genPdf}
                        >
                          Pdf
                        </Button>
                        <div style={{ float: "right" }}>
                          <Button
                            className="btn btn-primary float-right"
                            style={{ color: "white" }}
                            onClick={handleShow}
                          >
                            + Add New
                          </Button>
                        </div>
                      </Col>
                    </Row>
                    <div className="col vbtn" style={{ float: "right" }}>
                      <Form.Group controlId="formBasicEmail">
                        <Form.Control
                          type="text"
                          placeholder="Search"
                          onChange={(e) => {
                            setsearch(e.target.value);
                          }}
                        />
                      </Form.Group>
                    </div>
                    <Row className="mt-5">
                      <Col>
                        <Table striped bordered hover id="empTable">
                          <thead>
                            <tr>
                              <th>S.No</th>
                              <th>First Name</th>
                              <th>Last Name</th>
                              <th>Username</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>1</td>
                              <td>Mark</td>
                              <td>Otto</td>
                              <td>@mdo</td>
                            </tr>
                            <tr>
                              <td>2</td>
                              <td>Jacob</td>
                              <td>Thornton</td>
                              <td>@fat</td>
                            </tr>
                            <tr>
                              <td>3</td>
                              <td>Larry the Bird</td>
                              <td>@twitter</td>
                              <td>@fat</td>
                            </tr>
                          </tbody>
                        </Table>
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
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            </Row>

            <Modal
              show={show}
              onHide={handleClose}
              style={{ marginTop: "80px" }}
            >
              <Modal.Header>
                <Modal.Title>
                  <h3>Add Bank</h3>
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="mt-5 mt-lg-4">
                  <form>
                    <label> Bank Name: </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter 
                        Bank Name"
                      required
                      name="title"
                    />

                    <label className="mt-3">Status :</label>
                    <select
                      className="form-control form-select"
                      required
                      name="status"
                    >
                      <option value="">select</option>
                      <option value="true">Active</option>
                      <option value="false">Inactive</option>
                    </select>

                    <div className="row mt-3">
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
              </Modal.Body>
            </Modal>
          </React.Fragment>
        </Box>
      </Box>
    </div>
  );
}

export default Withdrawfund;
