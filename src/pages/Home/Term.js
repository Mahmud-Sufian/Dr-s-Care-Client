import React from 'react';
import treatment from '../../assets/images/treatment.png';
import PrimaryButton from '../Shared/PrimaryButton';
const Term = () => {
    return (
        <div className="hero ">
            <div className="hero-content flex-col lg:flex-row gap-20">
                <img src={treatment} className="max-w-sm rounded-lg shadow-2xl" />
                <div>
                    <h1 className="text-5xl font-bold">Exceptional Dental Care, on Your Terms</h1>
                    <p className="py-6">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam, odio esse aut nihil perspiciatis incidunt dolor tenetur numquam in, delectus nemo dicta, ut asperiores. Voluptatibus, atque esse sed similique culpa deserunt consequuntur aspernatur amet quibusdam magnam cum voluptatem iure fugit dicta rem exercitationem ex vel porro ducimus eveniet ullam voluptatum mollitia. Cupiditate minima obcaecati repellendus architecto tempora soluta temporibus voluptate! Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    <PrimaryButton>Get started</PrimaryButton>
                </div>
            </div>
        </div>
    )
}

export default Term