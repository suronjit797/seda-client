import React, { useContext, useState } from "react";
import DataTable from "react-data-table-component";
import { FiEdit } from "react-icons/fi";
import { BiStar } from "react-icons/bi";
import { AiFillStar } from "react-icons/ai";
import axios from "axios";
import Swal from "sweetalert2";
import { ThemeContext } from "../../App.js";
import { Modal } from "antd";
import { useEffect } from "react";

const DeviceParameters = ({ data, device, getDevice, getDeviceParameters }) => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [singleDeviceParameter, setSingleDeviceParameter] = useState({});
  const [parameters, setParameters] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  //   const []
  let { isDark } = useContext(ThemeContext);

  const handleCancel = () => {
    setIsModalOpen(false);
    setLoading(false);
  };
  const getParameters = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/parameters`,
      { withCredentials: true }
    );
    if (response) {
      setParameters(response.data);
    }
  };
  useEffect(() => {
    getParameters();
  }, []);
  console.log(parameters);
  const columns = [
    {
      name: "No.",
      cell: (row, index, column, id) => (
        <div>{(page - 1) * limit + index + 1}</div>
      ),
      selector: (row) => console.log(row),
      width: "60px",
    },
    {
      name: "Device Parameter Name",
      cell: (row) => <div className="text-capitalize">{row?._id}</div>,
      selector: (row) => row?._id,
    },
    {
      name: "System Parameter Name",
      cell: (row) => <div className="text-capitalize">{"--"}</div>,
      selector: (row) => row?._id,
    },
    {
      name: "Count",
      selector: (row) => row?.count,
      center: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <div>
          <button
            className="btn btn-info me-1"
            onClick={() => {
              setIsModalOpen(true);
              console.log({ row });
              setSingleDeviceParameter(row);
            }}
          >
            <FiEdit />
          </button>
          {device?.parameter === row?._id ? (
            <button className="btn btn-warning">
              <AiFillStar />
            </button>
          ) : (
            <button
              className="btn btn-warning"
              onClick={() => setParameter(row?._id)}
            >
              <BiStar />
            </button>
          )}
        </div>
      ),
      right: "yes",
    },
  ];

  const setParameter = async (parameter) => {
    let data = {
      parameter: parameter,
    };
    Swal.fire({
      title: "Are you sure?",
      text: "You want to set this parameter as default?",
      //icon: "warning",
      dangerMode: true,
      showCancelButton: true,
      confirmButtonText: "Confirm",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .put(`${process.env.REACT_APP_API_URL}/device/` + device._id, data, {
            withCredentials: true,
          })
          .then((res) => {
            getDevice();
            getDeviceParameters();
            Swal.fire({
              title: "Done!",
              text: "Set default parameter Successfully",
              icon: "success",
              timer: 2000,
              button: false,
            });
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    });
  };
//   console.log(singleDeviceParameter);
  return (
    <div>
      <h4 className="mb-3">Available Device Parameters </h4>
      <Modal
        title={`Assign System Parameter Name - ${singleDeviceParameter?._id}`}
        open={isModalOpen}
        onOk={() => setLoading(true)}
        onCancel={handleCancel}
        okButtonProps={{
          className: "btn btn-success h-auto ",
          loading,
        }}
        cancelButtonProps={{ className: "btn btn-secondary h-auto" }}
      >
        <select
          className="form-select"
          name="interval"
          value={singleDeviceParameter?.systemParameter}
          onChange={(e) =>
            setSingleDeviceParameter({
              ...singleDeviceParameter,
              systemParameter: e.target.value,
            })
          }
        >
          <option>Select system parameter</option>
          {parameters.map(({ _id, name }) => (
            <option value={_id} key={_id}>
              {name}
            </option>
          ))}
        </select>
      </Modal>
      <DataTable
        columns={columns}
        data={data}
        pagination
        striped={!isDark}
        theme={isDark ? "dark" : "light "}
        paginationPerPage={limit}
        onChangePage={(data) => setPage(data)}
        onChangeRowsPerPage={(data) => {
          setLimit(data);
          setPage(1);
        }}
        paginationRowsPerPageOptions={[10, 20, 50]}
      />
    </div>
  );
};

export default DeviceParameters;
