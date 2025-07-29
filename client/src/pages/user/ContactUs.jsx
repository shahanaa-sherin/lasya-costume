import React from 'react';

const ContactUs = () => {
  return (
    <section className="bg-white py-16 px-6">
      <h2 className="text-3xl font-bold text-center mb-8">Contact Us</h2>
      <form className="max-w-xl mx-auto space-y-4">
        <input type="text" placeholder="Name" className="w-full p-3 border rounded-md" />
        <input type="email" placeholder="Email" className="w-full p-3 border rounded-md" />
        <textarea rows="4" placeholder="Message" className="w-full p-3 border rounded-md" />
        <button type="submit" className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800">Send Message</button>
      </form>
    </section>
  );
};

export default ContactUs;
