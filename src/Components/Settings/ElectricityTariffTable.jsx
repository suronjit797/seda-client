import React, {useState} from 'react'
import { FiTrash, FiEdit, } from "react-icons/fi"
import { Spinner } from 'react-bootstrap';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import EditETariffModal from '../Modals/EditETariffModal';

export default function ElectricityTariffTable({data, getElectricityTariff}) {
    const [isLoading, setIsLoading] = useState(false);
    const [SuccessMessage, setSuccessMessage] = useState();
    const [modalShow, setModalShow] = useState(false);
    const [ETariffToEdit, setETariffToEdit] = useState();
    const columns = [
        {
            name: "No.",
            cell: (row, index, column, id) => <div>{index + 1}</div>,
            selector: row => (console.log(row)),
            width: "60px",
            center: true
        },
        {
            name: 'Category',
            selector: row => (row.name),
            width: "100px"

        },
        {
            name: 'Description',
            cell: row => <div className='text-warp p-1 description' dangerouslySetInnerHTML={{ __html: row?.description }}></div>,
            selector: row => (row?.description),
            grow: 3

        },
        {
            name: 'Action',
            cell: row => <div>
                <button className='btn btn-info me-1' onClick={() => editETariff(row)}><FiEdit/></button>
                <button className='btn btn-danger' onClick={() => deleteETariff(row._id)}><FiTrash/></button>
            </div>,
            center: true
        },
    ];
    const editETariff= (data) => {
        setETariffToEdit(data)
        setModalShow(true)
    }
    const deleteETariff = async (etId) => {
        setIsLoading(true)
        const response = await axios.delete(`${process.env.REACT_APP_API_URL}/electricity-tariff/` + etId, { withCredentials: true })
        if (response) {
            setIsLoading(false)
            setSuccessMessage("Electricity Tariff deleted successfully.")
            getElectricityTariff()
            setTimeout(() => {
                setSuccessMessage()
            }, 2000)
        }
    }
  return (
    <div>
            <h4 className='mb-3'>Electricity Tariff</h4>
            <div className='d-flex justify-content-center'>
                {isLoading && <Spinner animation="border" variant="dark" />}
            </div>
            {SuccessMessage && <div className="alert alert-success" role="alert">{SuccessMessage} </div>}
            <DataTable
                columns={columns}
                data={data}
                pagination
                striped
                paginationPerPage={10}
                paginationRowsPerPageOptions={[10, 20, 50]}
            />
            <EditETariffModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                ETariffToEdit={ETariffToEdit}
                setModalShow={setModalShow}
                getElectricityTariff={getElectricityTariff}
            />
        </div>
  )
}
