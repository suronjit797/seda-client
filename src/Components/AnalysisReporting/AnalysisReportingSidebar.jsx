import React from 'react'
import { Link } from 'react-router-dom'

export default function AnalysisReportingSidebar() {
    return (
        <div>
            <h3 className='mb-4'>Analysis &amp; Reporting</h3>
            <ul className="list-group mb-3">
                <li className='list-group-item'><Link to='/admins' className='text-dark text-decoration-none'>Generate Report</Link></li>
            </ul>
        </div>
    )
}
