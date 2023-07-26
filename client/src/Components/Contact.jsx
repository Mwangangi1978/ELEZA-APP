import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Contact = () => {
    const [title, setTitle] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
  
    const handleFormSubmit = (e) => {
      e.preventDefault();
  
      const emailData = {
        ContactFormTitle: title, 
        ContactFormName: name,
        ContactFormEmail: email,
        ContactFormMessage: message,
        to_email: 'dennomwangs1978@gmail.com',
      };


    const serviceId = 'service_i9w40pp';
    const templateId = 'template_7eksnn7';
    const userId = 'T2RQ6RsaTy0PowB7J';

    emailjs
      .send(serviceId, templateId, emailData, userId)
      .then(() => {
        toast.success('Message sent successfully!', {
          position: 'top-center',
          autoClose: 3000,
        });
        setTitle(''); // Clear the title field after sending the message
        setName('');
        setEmail('');
        setMessage('');
      })
      .catch((error) => {
        console.error('Error sending email:', error);
        toast.error('Failed to send message. Please try again.', {
          position: 'top-center',
          autoClose: 3000,
        });
      });
  };

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <img
        src="/public/images/ELEZA.png"
        alt="User Role"
        className="w-32 h-32 mx-auto mb-4 rounded-full object-cover"
      />
      <h1 className="text-2xl font-bold mb-4 mx-auto text-center">Holla at Us!</h1>
      <form onSubmit={handleFormSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block font-medium">
            Name:
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border border-gray-400 rounded dark:bg-[grey]"
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block font-medium">
            Email:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-400 rounded dark:bg-[grey]"
            required
          />
        </div>
        <div>
          <label htmlFor="title" className="block font-medium">
            Message Summary:
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-gray-400 rounded dark:bg-[grey]"
            required
          />
        </div>
        <div>
          <label htmlFor="message" className="block font-medium">
            Message:
          </label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full p-2 border border-gray-400 rounded dark:bg-[grey]"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full p-2 bg-green-500 text-white font-medium rounded hover:bg-green-600"
        >
          Send Message
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Contact;