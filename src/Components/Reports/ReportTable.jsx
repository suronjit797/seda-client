import React, { useEffect } from 'react';
import $ from 'jquery';
import JSZip from 'jszip';
import moment from 'moment/moment';

const ReportTable = ({data, title}) => {
    useEffect(() => {
        setTimeout(function () {
            window.JSZip = JSZip;
            $('#example').DataTable(
                {
                    "lengthMenu": [10, 25, 50, 75, 100],
                    pagingType: 'full_numbers',
                    pageLength: 10,
                    processing: true,
                    dom: 'Blfrtip',
                    buttons: [
                        {
                            extend: "copy",
                            className: "btn btn-sm btn-secondary"
                        },
                        // 'csv',
                        {
                            extend: "csv",
                            title: title,
                            className: "btn btn-sm btn-success"
                        },
                        {
                            extend: "print",
                            className: "btn btn-sm btn-info"
                        },
                        {
                            extend: "excel",
                            title: title,
                            className: "btn btn-sm btn-primary"
                        },
                        {
                            extend: 'pdfHtml5',
                            orientation: 'landscape',
                            pageSize: 'LEGAL',
                            title: title,
                            className: "btn btn-sm btn-danger"
                        }
                    ],

                    "bDestroy": true,
                }
            );
        },
            1000
        );
    }, []);
    return (
        <div className='p-3'>
            <table id="example" class="table table-striped w-100">
                <thead>
                    <tr>
                        <td className='text-center'>No.</td>
                        <td>Name</td>
                        <td>Value</td>
                        <td>Date Time</td>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, index) => {
                        return (
                            <tr>
                                <td className='text-center'>{index + 1}</td>
                                <td>{row?.name}</td>
                                <td>{row?.value}</td>
                                <td>{moment(row?._id).format("DD/MM/YYYY HH:mm A")}</td>
                            </tr>

                        )
                    })}


                </tbody>
            </table>
        </div>
    );
}

export default ReportTable;
