import React from 'react'
import { Link } from 'react-router-dom'

export default function NotificationSidebar() {
    return (
        <div>
            <h3>Notification</h3>
            <ul className="list-group mb-3">
                <li className='list-group-item'><Link to='/alarm-summary' className='text-dark text-decoration-none'>System Alarm Summary</Link></li>
                <li className='list-group-item'><Link to='/create-alarm' className='text-dark text-decoration-none'>Create New Alarm</Link></li>
                <li className='list-group-item'><Link to='/recipient-list' className='text-dark text-decoration-none'>Notification Recipient List</Link></li>
            </ul>
        </div>
    )
}
