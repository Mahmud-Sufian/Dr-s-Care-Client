import React from 'react'
import { toast } from 'react-toastify';

const DeleteConfirmModal = ({ deleteDoctor, refetch , setDeleteDoctor}) => {
    const {email, name } = deleteDoctor;
    console.log(deleteDoctor)

    const handleDelete = () => {
        fetch(`https://dr-s-care-server.vercel.app/doctor/${email}`, {
            method: 'DELETE',
            headers: {
                authorization: `beare ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.deletedCount) {
                    toast(`Doctor ${name} is deleted`); 
                    setDeleteDoctor(null);
                    refetch();
                }

            })

    }

    return (
        <div>



            <input type="checkbox" id="delete-confirm-modal" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">are you want to delete ${name}</h3>
                    <p className="py-4">You've been selected for a chance to get one year of subscription to use Wikipedia for free!</p>
                    <div className="modal-action">
                        <button onClick={() => handleDelete()} className="btn btn-xs btn-error">Delete</button>
                        <label htmlFor="delete-confirm-modal" className="btn btn-xs">Cancel</label>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default DeleteConfirmModal