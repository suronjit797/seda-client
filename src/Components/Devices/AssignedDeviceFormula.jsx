import React from "react";
import { FiTrash } from "react-icons/fi";

export const AssignedDeviceFormula = ({ deviceFormulas, UnassignFormula }) => {
  return (
    <>
      <h4 className="mt-3">Assigned Device Formulas</h4>
      <div className="row me-2">
        <div className="card ms-2 me-3">
          <div className="row py-1">
            <div className="col-md-2 text-center">
              <b>No.</b>
            </div>
            <div className="col-md-8 text-center">
              <b>Formula</b>
            </div>
            <div className="col-md-2 text-center">
              <b>Action</b>
            </div>
          </div>
          <hr className="m-1" />
          {deviceFormulas?.length > 0 &&
            deviceFormulas.map((item, index) => (
              <div className="row py-2 border-bottom" key={index}>
                <div className="col-md-2 text-center">{index + 1}</div>
                <div className="col-md-8 text-center">{item?.name}</div>
                <div className="col-md-2 text-center">
                  <button
                    className="btn btn-danger"
                    onClick={() => UnassignFormula(item._id)}
                  >
                    <FiTrash />
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};
