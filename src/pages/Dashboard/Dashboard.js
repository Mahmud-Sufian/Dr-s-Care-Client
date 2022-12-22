import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Link, Outlet } from 'react-router-dom'
import auth from '../../firebase.init'
import useAdmin from '../../Hooks/useAdmin'

const Dashboard = () => {
    const [user] = useAuthState(auth);
    const [admin] = useAdmin(user);
    return (
        <div className="drawer drawer-mobile">
            <input id="dashboarde-sidebar" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content ">
                <h1 className='text-2xl font-bold text-primary'>Welcome to your Dashboard</h1>
                <Outlet></Outlet>
                

            </div>
            <div className="drawer-side">
                <label htmlFor="dashboarde-sidebar" className="drawer-overlay"></label>
                <ul className="menu p-4 w-48 bg-base-100 text-base-content">
                    {/* <!-- Sidebar content here --> */}
                    <li><Link to='/dashboard'>My Appointment</Link></li>
                    <li><Link to='/dashboard/review'>My Review</Link></li>
                    {admin && <li><Link to='/dashboard/users'>All Users</Link></li>}
                </ul>

            </div>
        </div>
    )
}

export default Dashboard