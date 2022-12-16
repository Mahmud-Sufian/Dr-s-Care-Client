import React from 'react'

const Review = ({ review }) => {
    const { name, img } = review;
    return (
        <div className="card lg:max-w-lg bg-base-100 shadow-xl">
            <div className="card-body">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, quidem id reiciendis aspernatur dolorum quisquam?
                </p>
                <div className='flex items-center'>
                    <div className="avatar">
                        <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 mr-5">
                            <img src={img} />
                        </div>
                    </div>
                    <div>
                        <h2 className='text-xl'>{name}</h2>
                        <h4>California</h4>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Review