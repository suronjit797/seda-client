// import React, { memo } from 'react';

// const SelectedDashboardSettings2 = memo(() => {
//     return (
//         <div>
//             SelectedDashboardSettings2
//         </div>
//     );
// });

// export default SelectedDashboardSettings2;

import React, { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";

const SelectedDashboardSettings2 = () => {
  const [data, setData] = useState({
    name: "",
    userType: "",
  });

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div className="selectedDashboardSettings border-success">
      <h3 className="fw-bold"> Dashboard 2 </h3>
      <h4 className="mt-4"> Template Settings </h4>
      <hr className="mt-0" />
      <Form>
        {/* first step */}
        <Row>
          <Col md={4}>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                onChange={handleChange}
                placeholder="Enter template name"
              />
            </div>
          </Col>
          <Col md={4}>
            <label className="form-label">User Type</label>
            <Form.Select name="userType" onChange={handleChange}>
              <option>Select role</option>
              <option value="1">One</option>
              <option value="2">Two</option>
            </Form.Select>
          </Col>
        </Row>

        {/* Graph */}
        <Row>
          {/* Graph 1 */}
          <Col md={6}>
            <h5 className="mt-4"> Graph 1 Settings </h5>
            <hr className="mt-0" />
            <Row>
              <Col md={6}>
                <div className="mb-3">
                  <label className="form-label">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    onChange={handleChange}
                    placeholder="Enter title name"
                  />
                </div>
              </Col>
              <Col md={6}></Col>
              <Col md={6}>
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    onChange={handleChange}
                    placeholder="Enter graph name"
                  />
                </div>
              </Col>
              <Col md={6}></Col>
              <Col md={6}>
                <label className="form-label">Select Y-Axis Value</label>
                <Form.Select name="userType" onChange={handleChange}>
                  <option>Select value type</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                </Form.Select>
              </Col>
              <Col md={6}>
                <label className="form-label mt-3 mt-md-0">
                  Select Y-Axis Value
                </label>
                <div className="d-flex align-items-center">
                  <div>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      onChange={handleChange}
                      defaultValue="0"
                    />
                  </div>
                  <div className="mx-2">to</div>
                  <div>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </Col>
              <Col md={6}>
                <label className="form-label mt-3">Select X-Axis Value</label>
                <Form.Select name="userType" onChange={handleChange}>
                  <option>Select value type</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                </Form.Select>
              </Col>
              <Col md={6}>
                <label className="form-label mt-3">Select X-Axis Range</label>
                <Form.Select name="userType" onChange={handleChange}>
                  <option>Select default range display</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                </Form.Select>
              </Col>
            </Row>
          </Col>
          {/* Graph 2 */}
          <Col md={6}>
            <h5 className="mt-4"> Graph 2 Settings </h5>
            <hr className="mt-0" />
            <Row>
              <Col md={6}>
                <div className="mb-3">
                  <label className="form-label">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    onChange={handleChange}
                    placeholder="Enter title name"
                  />
                </div>
              </Col>
              <Col md={6}></Col>
              <Col md={6}>
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    onChange={handleChange}
                    placeholder="Enter graph name"
                  />
                </div>
              </Col>
              <Col md={6}></Col>
              <Col md={6}>
                <label className="form-label">Select Y-Axis Value</label>
                <Form.Select name="userType" onChange={handleChange}>
                  <option>Select value type</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                </Form.Select>
              </Col>
              <Col md={6}>
                <label className="form-label mt-3 mt-md-0">
                  Select Y-Axis Value
                </label>
                <div className="d-flex align-items-center">
                  <div>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      onChange={handleChange}
                      defaultValue="0"
                    />
                  </div>
                  <div className="mx-2">to</div>
                  <div>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </Col>
              <Col md={6}>
                <label className="form-label mt-3">Select X-Axis Value</label>
                <Form.Select name="userType" onChange={handleChange}>
                  <option>Select value type</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                </Form.Select>
              </Col>
              <Col md={6}>
                <label className="form-label mt-3">Select X-Axis Range</label>
                <Form.Select name="userType" onChange={handleChange}>
                  <option>Select default range display</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                </Form.Select>
              </Col>
            </Row>
          </Col>
          {/* Graph 3 */}
          <Col md={6}>
            <h5 className="mt-4"> Graph 3 Settings </h5>
            <hr className="mt-0" />
            <Row>
              <Col md={6}>
                <div className="mb-3">
                  <label className="form-label">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    onChange={handleChange}
                    placeholder="Enter title name"
                  />
                </div>
              </Col>
              <Col md={6}></Col>
              <Col md={6}>
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    onChange={handleChange}
                    placeholder="Enter graph name"
                  />
                </div>
              </Col>
              <Col md={6}></Col>
              <Col md={6}>
                <label className="form-label">Select Y-Axis Value</label>
                <Form.Select name="userType" onChange={handleChange}>
                  <option>Select value type</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                </Form.Select>
              </Col>
              <Col md={6}>
                <label className="form-label mt-3 mt-md-0">
                  Select Y-Axis Value
                </label>
                <div className="d-flex align-items-center">
                  <div>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      onChange={handleChange}
                      defaultValue="0"
                    />
                  </div>
                  <div className="mx-2">to</div>
                  <div>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </Col>
              <Col md={6}>
                <label className="form-label mt-3">Select X-Axis Value</label>
                <Form.Select name="userType" onChange={handleChange}>
                  <option>Select value type</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                </Form.Select>
              </Col>
              <Col md={6}>
                <label className="form-label mt-3">Select X-Axis Range</label>
                <Form.Select name="userType" onChange={handleChange}>
                  <option>Select default range display</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                </Form.Select>
              </Col>
            </Row>
          </Col>
        </Row>
        <div className="text-end mt-5">
          <button type="submit" className="btn btn-success me-2">
            update
          </button>
          <button className="btn btn-secondary"> cancel </button>
        </div>
      </Form>
    </div>
  );
};

export default SelectedDashboardSettings2;
