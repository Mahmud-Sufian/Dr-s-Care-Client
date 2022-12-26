import React from 'react'
import { useQuery } from 'react-query'
import Loading from '../Shared/Loading';
import UserRow from './UserRow';

const Users = () => {
    const { data: users, isLoading, refetch } = useQuery('users', () => fetch(`https://dr-s-care-server.vercel.app/user`, {
        method: 'GET',
        headers: {
            authorization : `bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => res.json()));

    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div>
            <h2 className='text-2xl'>All User {users.length}</h2>
            <div className="overflow-x-auto">
                <table className="table w-full"> 

                    <thead>
                        <tr>
                            <th>SL.</th>
                            <th>Email</th>
                            <th>Make Admin</th>
                            <th>Remove</th>
                        </tr>
                    </thead>
                    <tbody>  
                        {
                            users?.map((user, i) => <UserRow key={i} user={user} refetch={refetch} i={i}></UserRow>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Users