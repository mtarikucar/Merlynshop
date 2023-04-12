import React from 'react'
import ContactForm from '../components/contact/ContactForm'
import ContactUs from '../components/contact/ContactUs'

function Contact() {
  return (
    <div className='bg-slate-50'>
      <ContactForm/>
      <ContactUs/>
    </div>
  )
}

export default Contact