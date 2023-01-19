import axios from "axios";
import moment from "moment/moment";
import React, { useState, useEffect, useContext } from "react";
import { Spinner } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { Link, useParams } from "react-router-dom";
import DevicesSidebar from "../../Components/Devices/DevicesSidebar";
import { ThemeContext } from "../../App.js";

const DeviceData = () => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [deviceDetails, setDeviceDetails] = useState();
  let { isDark } = useContext(ThemeContext);

  const Params = useParams();
  const deviceId = Params.deviceId;
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  const onChangePagination = (p) => {
    setPage(p);
  };

  const getDevice = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/device/` + deviceId,
      { withCredentials: true }
    );
    if (response) {
      setDeviceDetails(response.data);
    }
  };
  const getDeviceData = async () => {
    setIsLoading(true);
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/device/device-data/` + deviceId,
      { withCredentials: true }
    );
    if (response) {
      setData(response.data);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getDeviceData();
    getDevice();
    // eslint-disable-next-line
  }, [deviceId]);

  const columns = [
    {
      name: "No.",
      cell: (row, index, column, id) => (
        <div>{(page - 1) * limit + index + 1}</div>
      ),
      selector: (row) => console.log(row),
      width: "60px",
      center: true,
    },
    {
      name: "Device Parameter Name",
      selector: (row) => row?.name,
    },

    {
      name: "Value",
      selector: (row) => row?.value,
    },
    {
      name: "Date",
      selector: (row) => moment(row.createdAt).format("DD/MM/YYYY hh:mm:ss a"),
      center: true,
    },
  ];
  console.log({ page });
  return (
    <div className="devices">
      <div className="container-fluid">
        <div className="row my-5 vh60">
          <div className="col-md-2">
            <DevicesSidebar />
          </div>
          <div className="col-md-10">
            <div className="card p-3 mb-3">
              <div className="row">
                <div className="col-md-6">
                  <h3>Device Data Received</h3>
                  <p style={{ fontSize: "16px", fontWeight: "500" }}>
                    Device name: {deviceDetails?.name || "--"}
                  </p>
                </div>
                <div className="col-md-6">
                  <div className="d-flex justify-content-end">
                    <button
                      onClick={() => getDeviceData()}
                      to="#"
                      className="btn btn-success me-1"
                    >
                      Refresh
                    </button>
                    <Link to="/devices" className="btn btn-secondary">
                      Back
                    </Link>
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-center">
                {isLoading && <Spinner animation="border" variant="dark" />}
              </div>
              {!isLoading && (
                <DataTable
                  columns={columns}
                  data={data}
                  pagination
                  striped={!isDark}
                  theme={isDark ? "dark" : "light "}
                  paginationPerPage={limit}
                  onChangePage={(page) => {
                    onChangePagination(page);
                  }}
                  onChangeRowsPerPage={(limit) => {
                    setLimit(limit);
                    setPage(1);
                  }}
                  paginationRowsPerPageOptions={[10, 20, 50]}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeviceData;

// import axios from "axios";
// import moment from "moment/moment";
// import React, { useState, useEffect, useContext } from "react";
// import { Spinner } from "react-bootstrap";
// import { Link, useParams } from "react-router-dom";
// import DevicesSidebar from "../../Components/Devices/DevicesSidebar";
// import { ThemeContext } from "../../App.js";
// import { Table } from "antd";

// const DeviceData = () => {
//   const [total, setTotal] = useState(100000000);
//   const [limit] = useState(10);
//   const [page, setPage] = useState(1);
//   const [deviceDetails, setDeviceDetails] = useState();
//   let { isDark } = useContext(ThemeContext);

//   const Params = useParams();
//   const deviceId = Params.deviceId;
//   const [isLoading, setIsLoading] = useState(false);
//   const [data, setData] = useState([]);

//   const getDevice = async () => {
//     const response = await axios.get(
//       `${process.env.REACT_APP_API_URL}/device/` + deviceId,
//       { withCredentials: true }
//     );
//     if (response) {
//       setDeviceDetails(response.data);
//     }
//   };
//   const getDeviceData = async () => {
//     setIsLoading(true);
//     const response = await axios.get(
//       `${process.env.REACT_APP_API_URL}/device/device-data/` + deviceId,
//       { withCredentials: true }
//     );
//     if (response) {
//       setData(response.data);
//       setIsLoading(false);
//     }
//   };
//   useEffect(() => {
//     getDeviceData();
//     getDevice();
//     // eslint-disable-next-line
//   }, [deviceId]);

//   const columns = [
//     {
//       title: "No.",
//       render: (_, __, idx) => <div>{(page - 1) * limit + idx + 1}</div>,
//       width: "60px",
//       center: true,
//     },
//     {
//       title: "Parameter Name",
//       dataIndex: "name",
//     },

//     {
//       title: "Value",
//       dataIndex: "value",
//     },
//     {
//       title: "Date",
//       dataIndex: "date",
//       render: (createdAt) => moment(createdAt).format("DD/MM/YYYY hh:mm:ss a"),
//       center: true,
//     },
//   ];

//   // page handler
//   const onChangePagination = (p) => {
//     setPage(p);
//   };

//   return (
//     <div className="devices">
//       <div className="container-fluid">
//         <div className="row my-5 vh60">
//           <div className="col-md-2">
//             <DevicesSidebar />
//           </div>
//           <div className="col-md-10">
//             <div className="card p-3 mb-3">
//               <div className="row">
//                 <div className="col-md-6">
//                   <h3>Device Data Received</h3>
//                   <p style={{ fontSize: "16px", fontWeight: "500" }}>
//                     Device name: {deviceDetails?.name || "--"}
//                   </p>
//                 </div>
//                 <div className="col-md-6">
//                   <div className="d-flex justify-content-end">
//                     <button
//                       onClick={getDeviceData}
//                       to="#"
//                       className="btn btn-success me-1"
//                     >
//                       Refresh
//                     </button>
//                     <Link to="/devices" className="btn btn-secondary">
//                       Back
//                     </Link>
//                   </div>
//                 </div>
//               </div>
//               {/* <div className="d-flex justify-content-center">
//                 {isLoading && <Spinner animation="border" variant="dark" />}
//               </div> */}
//               {/* {!isLoading && ( */}
//               <Table
//                 className="que-table"
//                 columns={columns}
//                 dataSource={data}
//                 loading={isLoading}
//                 scroll={{ x: true }}
//                 rowKey={(row) => row?._id}
//                 th
//                 pagination={{
//                   total,
//                   current: page,
//                   //   showSizeChanger: false,
//                   pageSize: limit,
//                   onChange: onChangePagination,
//                 }}
//               />
//               {/* // <DataTable
//                 //   columns={columns}
//                 //   data={data}
//                 //   pagination
//                 //   striped={!isDark}
//                 //   theme={isDark ? "dark" : "light "}
//                 //   paginationPerPage={10}
//                 //   onChangePage={(data) => {
//                 //     console.log(data);
//                 //   }}
//                 //   paginationTotalRows={20000}
//                 //   paginationRowsPerPageOptions={[10, 20, 50]}
//                 // />
//               )} */}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DeviceData;
