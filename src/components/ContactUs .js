import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import './ContactUs.css'
export const ContactUs = () => {
  const form = useRef();
    const [success, setSuccess] = useState(false)
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_8phj5ba', 'template_rb0eldn', form.current, 'uGFBh6uWXYXR35k8b')
      .then((result) => {
          console.log(result.text);
          console.log("message send")
          setSuccess(true)
      }, (error) => {
          console.log(error.text);
      });
  };

  return (
    <div>
    <form className='contact-form'  ref={form} onSubmit={sendEmail}>
      <label className='contact-label'>Name</label>
      <input className='contact-input' type="text" name="user_name" />
      <label className='contact-label'>Email</label>
      <input className='contact-input' type="email" name="user_email" />
      <label className='contact-label'>Message</label>
      <textarea name="message" />
      <input className='contact-input' type="submit" value="Send" />
    </form>
    {success === true && <h5>We received your email,
         thank you for contacting us</h5>} 
    </div>
  );
};