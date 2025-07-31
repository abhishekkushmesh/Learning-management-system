import React from 'react'
import Hero from '../../components/student/Hero'
import Companies from '../../components/student/Companies'
import CoursesSection from '../../components/student/CoursesSection'
import TestimonialsSection from '../../components/student/TestimonialsSection'
import CallToaction from '../../components/student/CallToaction'
import Footer from '../../components/student/Footer'
const Home = () => {
  return (
    <div className='flex-col items-center text-center space-y-7'>
      <Hero />
      <Companies />
      <CoursesSection />
      <TestimonialsSection />
      <CallToaction />
      <Footer />
    </div>
  )
}

export default Home
