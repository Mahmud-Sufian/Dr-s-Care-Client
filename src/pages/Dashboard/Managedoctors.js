import React, { useState } from 'react'
import { useQuery } from 'react-query'
import Loading from '../Shared/Loading'
import DeleteConfirmModal from './DeleteConfirmModal'
import DoctorRow from './DoctorRow'

const Managedoctors = () => {
    const [deleteDoctor, setDeleteDoctor] = useState(null);

    const { data: doctors, isLoading, refetch } = useQuery('doctors', () => fetch(`https://dr-s-care-server.vercel.app/doctor`, { method: 'GET', headers: { authorization: `bearer ${localStorage.getItem('accessToken')}` } }).then(res => res.json()))

    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <div>
            <h2 className='text-2xl'>Manage Doctors {doctors.length}</h2>

            <div className="overflow-x-auto">
                <table className="table w-full">

                    <thead>
                        <tr>
                            <th></th>
                            <th>Avatar</th>
                            <th>Name</th>
                            <th>Specialization</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                         {
                            doctors.map((doctor, index) => <DoctorRow key={doctor._id} doctor={doctor} index={index} refetch={refetch} setDeleteDoctor={setDeleteDoctor}></DoctorRow>)
                         }
                    </tbody>
                </table>
            </div>
            {deleteDoctor && <DeleteConfirmModal deleteDoctor={deleteDoctor} refetch={refetch} setDeleteDoctor={setDeleteDoctor}></DeleteConfirmModal>}
        </div>
    )
}

export default Managedoctors