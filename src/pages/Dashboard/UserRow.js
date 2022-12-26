import React from 'react'
import { toast } from 'react-toastify';

const UserRow = ({ user, refetch, i }) => {
    const { email, role } = user;

    const makeAdmin = () => {
        fetch(`https://dr-s-care-server.vercel.app/user/admin/${email}`, {
            method: 'PUT',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => {
                if (res.status === 403) {
                    toast.error('feiled to make an admin');
                }
                return res.json()
            })
            .then(data => {
                if (data.result.modifiedCount > 0) {
                    refetch();
                    toast.success('made an admin successfully');
                }
            })
    }

    return (
        <tr>
            <th>{i + 1}</th>
            <td>{email}</td>
            <td>{role !== 'admin' && <button onClick={makeAdmin} className="btn btn-xs">Make Admin</button>}</td>
            <td><button className="btn btn-xs">Remove User</button></td>
        </tr>
    )
}

export default UserRow