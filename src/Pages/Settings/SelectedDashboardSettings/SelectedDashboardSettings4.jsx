// import React, { memo } from 'react';

// const SelectedDashboardSettings4 = memo(() => {
//     return (
//         <div>
//             SelectedDashboardSettings4
//         </div>
//     );
// });

// export default SelectedDashboardSettings4;

import React, { useRef, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";

const SelectedDashboardSettings4 = () => {
    const imageRef = useRef();
    const onFileChange = (e) => {
        console.log(e.target.files[0]);
      };

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
      <h3 className="fw-bold"> Dashboard 3 </h3>
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
        <h4 className="mt-4"> Top Display Settings </h4>
        <hr className="mt-0" />
        {/* second step */}
        <Row>
          <Col md={6}>
            <h5 className="mt-4"> Left Side </h5>
            <Row>
              <Col md={6}>
                <div className="mb-3">
                  <label className="form-label">Display Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    onChange={handleChange}
                    placeholder="Enter name"
                  />
                </div>
              </Col>
              <Col md={6}>
                <label className="form-label">Display Value</label>
                <Form.Select name="userType" onChange={handleChange}>
                  <option>Select value</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                </Form.Select>
              </Col>
              <Col md={6}>
                <div className="mb-3">
                  <label className="form-label">Display Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    onChange={handleChange}
                    placeholder="Enter name"
                  />
                </div>
              </Col>
              <Col md={6}>
                <label className="form-label">Display Value</label>
                <Form.Select name="userType" onChange={handleChange}>
                  <option>Select value</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                </Form.Select>
              </Col>
              <Col md={6}>
                <div className="mb-3">
                  <label className="form-label">Display Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    onChange={handleChange}
                    placeholder="Enter name"
                  />
                </div>
              </Col>
              <Col md={6}>
                <label className="form-label">Display Value</label>
                <Form.Select name="userType" onChange={handleChange}>
                  <option>Select value</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                </Form.Select>
              </Col>
              <Col md={6}>
                <div className="mb-3">
                  <label className="form-label">Display Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    onChange={handleChange}
                    placeholder="Enter name"
                  />
                </div>
              </Col>
              <Col md={6}>
                <label className="form-label">Display Value</label>
                <Form.Select name="userType" onChange={handleChange}>
                  <option>Select value</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                </Form.Select>
              </Col>
              <Col md={6}>
                <div className="mb-3">
                  <label className="form-label">Display Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    onChange={handleChange}
                    placeholder="Enter name"
                  />
                </div>
              </Col>
              <Col md={6}>
                <label className="form-label">Display Value</label>
                <Form.Select name="userType" onChange={handleChange}>
                  <option>Select value</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                </Form.Select>
              </Col>
              <Col md={6}>
                <div className="mb-3">
                  <label className="form-label">Display Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    onChange={handleChange}
                    placeholder="Enter name"
                  />
                </div>
              </Col>
              <Col md={6}>
                <label className="form-label">Display Value</label>
                <Form.Select name="userType" onChange={handleChange}>
                  <option>Select value</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                </Form.Select>
              </Col>
            </Row>
          </Col>
          <Col md={6}>
            <h5 className="mt-4"> Right Side </h5>
            <Row>
              <Col md={6}>
                <div className="mb-3">
                  <label className="form-label">Display Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    onChange={handleChange}
                    placeholder="Enter name"
                  />
                </div>
              </Col>
              <Col md={6}>
                <label className="form-label">Display Value</label>
                <Form.Select name="userType" onChange={handleChange}>
                  <option>Select value</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                </Form.Select>
              </Col>
              <Col md={6}>
                <div className="mb-3">
                  <label className="form-label">Display Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    onChange={handleChange}
                    placeholder="Enter name"
                  />
                </div>
              </Col>
              <Col md={6}>
                <label className="form-label">Display Value</label>
                <Form.Select name="userType" onChange={handleChange}>
                  <option>Select value</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                </Form.Select>
              </Col>
              <Col md={6}>
                <div className="mb-3">
                  <label className="form-label">Display Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    onChange={handleChange}
                    placeholder="Enter name"
                  />
                </div>
              </Col>
              <Col md={6}>
                <label className="form-label">Display Value</label>
                <Form.Select name="userType" onChange={handleChange}>
                  <option>Select value</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                </Form.Select>
              </Col>
              <Col md={6}>
                <div className="mb-3">
                  <label className="form-label">Display Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    onChange={handleChange}
                    placeholder="Enter name"
                  />
                </div>
              </Col>
              <Col md={6}>
                <label className="form-label">Display Value</label>
                <Form.Select name="userType" onChange={handleChange}>
                  <option>Select value</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                </Form.Select>
              </Col>
              <Col md={6}>
                <div className="mb-3">
                  <label className="form-label">Display Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    onChange={handleChange}
                    placeholder="Enter name"
                  />
                </div>
              </Col>
              <Col md={6}>
                <label className="form-label">Display Value</label>
                <Form.Select name="userType" onChange={handleChange}>
                  <option>Select value</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                </Form.Select>
              </Col>
              <Col md={6}>
                <div className="mb-3">
                  <label className="form-label">Display Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    onChange={handleChange}
                    placeholder="Enter name"
                  />
                </div>
              </Col>
              <Col md={6}>
                <label className="form-label">Display Value</label>
                <Form.Select name="userType" onChange={handleChange}>
                  <option>Select value</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                </Form.Select>
              </Col>
            </Row>
          </Col>
        </Row>
        {/* Third step */}
        <Row>
          <Col md={6}>
            <h4 className="mt-4"> Left Section Settings </h4>
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
                  <label className="form-label">Display Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    onChange={handleChange}
                    placeholder="Enter name"
                  />
                </div>
              </Col>
              <Col md={6}>
                <label className="form-label">Display Value</label>
                <Form.Select name="userType" onChange={handleChange}>
                  <option>Select value</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                </Form.Select>
              </Col>
              <Col md={6}>
                <div className="mb-3">
                  <label className="form-label">Display Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    onChange={handleChange}
                    placeholder="Enter name"
                  />
                </div>
              </Col>
              <Col md={6}>
                <label className="form-label">Display Value</label>
                <Form.Select name="userType" onChange={handleChange}>
                  <option>Select value</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                </Form.Select>
              </Col>
              <Col md={6}>
                <div className="mb-3">
                  <label className="form-label">Display Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    onChange={handleChange}
                    placeholder="Enter name"
                  />
                </div>
              </Col>
              <Col md={6}>
                <label className="form-label">Display Value</label>
                <Form.Select name="userType" onChange={handleChange}>
                  <option>Select value</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                </Form.Select>
              </Col>
              <Col md={6}>
                <div className="mb-3">
                  <label className="form-label">Display Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    onChange={handleChange}
                    placeholder="Enter name"
                  />
                </div>
              </Col>
              <Col md={6}>
                <label className="form-label">Display Value</label>
                <Form.Select name="userType" onChange={handleChange}>
                  <option>Select value</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                </Form.Select>
              </Col>
              <Col md={6}>
                <div className="mb-3">
                  <label className="form-label">Display Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    onChange={handleChange}
                    placeholder="Enter name"
                  />
                </div>
              </Col>
              <Col md={6}>
                <label className="form-label">Display Value</label>
                <Form.Select name="userType" onChange={handleChange}>
                  <option>Select value</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                </Form.Select>
              </Col>
              <Col md={6}>
                <div className="mb-3">
                  <label className="form-label">Display Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    onChange={handleChange}
                    placeholder="Enter name"
                  />
                </div>
              </Col>
              <Col md={6}>
                <label className="form-label">Display Value</label>
                <Form.Select name="userType" onChange={handleChange}>
                  <option>Select value</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                </Form.Select>
              </Col>
            </Row>
          </Col>
          <Col md={6}>
            <h4 className="mt-4"> Right Section Settings </h4>
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
                <div onClick={(e)=>{imageRef.current.click()}}>image input</div>

                <input style={{display:"none"}} onChange={onFileChange} type="file" ref={imageRef}/>
              </Col>
              <Col md={6}></Col>
              <Col md={7}>
                <Row>
                  <Col xs={5}>
                    <div className="mb-3">
                      <label className="form-label">Image Code</label>
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        onChange={handleChange}
                      />
                    </div>
                  </Col>
                  <Col xs={7}>
                    <div className="mb-3">
                      <label className="form-label">Display Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        onChange={handleChange}
                        placeholder="Enter name"
                      />
                    </div>
                  </Col>
                </Row>
              </Col>
              <Col md={5}>
                <label className="form-label">Display Value</label>
                <Form.Select name="userType" onChange={handleChange}>
                  <option>Select value</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                </Form.Select>
              </Col>
              <Col md={7}>
                <Row>
                  <Col xs={5}>
                    <div className="mb-3">
                      <label className="form-label">Image Code</label>
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        onChange={handleChange}
                      />
                    </div>
                  </Col>
                  <Col xs={7}>
                    <div className="mb-3">
                      <label className="form-label">Display Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        onChange={handleChange}
                        placeholder="Enter name"
                      />
                    </div>
                  </Col>
                </Row>
              </Col>
              <Col md={5}>
                <label className="form-label">Display Value</label>
                <Form.Select name="userType" onChange={handleChange}>
                  <option>Select value</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                </Form.Select>
              </Col>
              <Col md={7}>
                <Row>
                  <Col xs={5}>
                    <div className="mb-3">
                      <label className="form-label">Image Code</label>
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        onChange={handleChange}
                      />
                    </div>
                  </Col>
                  <Col xs={7}>
                    <div className="mb-3">
                      <label className="form-label">Display Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        onChange={handleChange}
                        placeholder="Enter name"
                      />
                    </div>
                  </Col>
                </Row>
              </Col>
              <Col md={5}>
                <label className="form-label">Display Value</label>
                <Form.Select name="userType" onChange={handleChange}>
                  <option>Select value</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                </Form.Select>
              </Col>
              <Col md={7}>
                <Row>
                  <Col xs={5}>
                    <div className="mb-3">
                      <label className="form-label">Image Code</label>
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        onChange={handleChange}
                      />
                    </div>
                  </Col>
                  <Col xs={7}>
                    <div className="mb-3">
                      <label className="form-label">Display Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        onChange={handleChange}
                        placeholder="Enter name"
                      />
                    </div>
                  </Col>
                </Row>
              </Col>
              <Col md={5}>
                <label className="form-label">Display Value</label>
                <Form.Select name="userType" onChange={handleChange}>
                  <option>Select value</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                </Form.Select>
              </Col>
              <Col md={7}>
                <Row>
                  <Col xs={5}>
                    <div className="mb-3">
                      <label className="form-label">Image Code</label>
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        onChange={handleChange}
                      />
                    </div>
                  </Col>
                  <Col xs={7}>
                    <div className="mb-3">
                      <label className="form-label">Display Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        onChange={handleChange}
                        placeholder="Enter name"
                      />
                    </div>
                  </Col>
                </Row>
              </Col>
              <Col md={5}>
                <label className="form-label">Display Value</label>
                <Form.Select name="userType" onChange={handleChange}>
                  <option>Select value</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                </Form.Select>
              </Col>
              <Col md={7}>
                <Row>
                  <Col xs={5}>
                    <div className="mb-3">
                      <label className="form-label">Image Code</label>
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        onChange={handleChange}
                      />
                    </div>
                  </Col>
                  <Col xs={7}>
                    <div className="mb-3">
                      <label className="form-label">Display Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        onChange={handleChange}
                        placeholder="Enter name"
                      />
                    </div>
                  </Col>
                </Row>
              </Col>
              <Col md={5}>
                <label className="form-label">Display Value</label>
                <Form.Select name="userType" onChange={handleChange}>
                  <option>Select value</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                </Form.Select>
              </Col>
              <Col md={7}>
                <Row>
                  <Col xs={5}>
                    <div className="mb-3">
                      <label className="form-label">Image Code</label>
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        onChange={handleChange}
                      />
                    </div>
                  </Col>
                  <Col xs={7}>
                    <div className="mb-3">
                      <label className="form-label">Display Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        onChange={handleChange}
                        placeholder="Enter name"
                      />
                    </div>
                  </Col>
                </Row>
              </Col>
              <Col md={5}>
                <label className="form-label">Display Value</label>
                <Form.Select name="userType" onChange={handleChange}>
                  <option>Select value</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                </Form.Select>
              </Col>
              <Col md={7}>
                <Row>
                  <Col xs={5}>
                    <div className="mb-3">
                      <label className="form-label">Image Code</label>
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        onChange={handleChange}
                      />
                    </div>
                  </Col>
                  <Col xs={7}>
                    <div className="mb-3">
                      <label className="form-label">Display Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        onChange={handleChange}
                        placeholder="Enter name"
                      />
                    </div>
                  </Col>
                </Row>
              </Col>
              <Col md={5}>
                <label className="form-label">Display Value</label>
                <Form.Select name="userType" onChange={handleChange}>
                  <option>Select value</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                </Form.Select>
              </Col>
              <Col md={7}>
                <Row>
                  <Col xs={5}>
                    <div className="mb-3">
                      <label className="form-label">Image Code</label>
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        onChange={handleChange}
                      />
                    </div>
                  </Col>
                  <Col xs={7}>
                    <div className="mb-3">
                      <label className="form-label">Display Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        onChange={handleChange}
                        placeholder="Enter name"
                      />
                    </div>
                  </Col>
                </Row>
              </Col>
              <Col md={5}>
                <label className="form-label">Display Value</label>
                <Form.Select name="userType" onChange={handleChange}>
                  <option>Select value</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                </Form.Select>
              </Col>
              <Col md={7}>
                <Row>
                  <Col xs={5}>
                    <div className="mb-3">
                      <label className="form-label">Image Code</label>
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        onChange={handleChange}
                      />
                    </div>
                  </Col>
                  <Col xs={7}>
                    <div className="mb-3">
                      <label className="form-label">Display Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        onChange={handleChange}
                        placeholder="Enter name"
                      />
                    </div>
                  </Col>
                </Row>
              </Col>
              <Col md={5}>
                <label className="form-label">Display Value</label>
                <Form.Select name="userType" onChange={handleChange}>
                  <option>Select value</option>
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

export default SelectedDashboardSettings4;
