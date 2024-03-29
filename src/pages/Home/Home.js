import React from 'react'
import Banner from './Banner'
import Contact from './Contact';
import Footer from '../Shared/Footer';
import Info from './Info';
import MakeAppointment from './MakeAppointment';
import Services from './Services';
import Term from './Term';
import Testimonials from './Testimonials';

const Home = () => {
  return (
    <div>
        <Banner></Banner> 
        <Info></Info>
        <Services></Services>
        <Term></Term>
        <MakeAppointment></MakeAppointment>
        <Testimonials></Testimonials>
        <Contact></Contact>
        <Footer></Footer>
    </div>
  )
}

export default Home