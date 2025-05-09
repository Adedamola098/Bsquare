import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { Helmet } from 'react-helmet';

const ContactUs = () => {
  const form = useRef();
  const [statusMessage, setStatusMessage] = useState('');

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        'service_uj6pnuf', 
        'template_ewruiy4', 
        form.current,
        'YO41U-y7xz2XfbNyJ'   
      )
      .then(
        () => {
          setStatusMessage('Message sent successfully!');
          e.target.reset();
        },
        (error) => {
          console.error(error.text);
          setStatusMessage('Failed to send message. Please try again later.');
        }
      );
  };

  return (
    <section id="contact" className="min-h-screen py-20">
            <Helmet>
        <title>Contact Us | Bsquare</title>
        <meta
          name="description"
          content="Contact Bsquare for support, questions, or inquiries about your orders."
        />
        <meta
          name="keywords"
          content="contact us, customer support, gaming store inquiries, order support, online store"
        />
        <meta name="author" content="Bsquare" />
      </Helmet>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <h2 className="text-4xl header md:text-5xl font-extrabold text-blue-600 text-center mb-16 drop-shadow-lg">
          Contact Us
        </h2>

        <div className="max-w-2xl mx-auto">
          <form
            ref={form}
            onSubmit={sendEmail}
            className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition duration-500 hover:shadow-2xl hover:ring-4 hover:ring-blue-300/50 border border-blue-100 p-8 sm:p-10"
          >
            <p className="text-gray-600 text text-center text-sm mb-8">
              Have questions or need assistance? Reach out to us, and we'll get back to you as soon as possible!
            </p>

            <div className="space-y-6">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-gray-900 text-sm font-semibold mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  name="user_name"
                  placeholder="Your Name"
                  required
                  className="w-full px-4 py-3 bg-gray-100 text-gray-900 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                />
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-gray-900 text-sm font-semibold mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  name="user_email"
                  placeholder="Your Email"
                  required
                  className="w-full px-4 py-3 bg-gray-100 text-gray-900 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                />
              </div>

              {/* Message Field */}
              <div>
                <label htmlFor="message" className="block text-gray-900 text-sm font-semibold mb-2">Message</label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Your Message"
                  rows="5"
                  required
                  className="w-full px-4 py-3 bg-gray-100 text-gray-900 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 resize-none"
                ></textarea>
              </div>

              {/* Submit Button */}
              <div className="text-center">
                <button
                  type="submit"
                  className="w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-600 transition transform hover:scale-105 shadow-md"
                >
                  Send Message
                </button>
              </div>

              {/* Status Message */}
              {statusMessage && (
                <p className="text-center text-sm text-green-600 font-medium mt-4">{statusMessage}</p>
              )}
            </div>
          </form>

          {/* Additional Contact Info */}
          <div className="mt-16 text-center text-gray-200 text-base sm:text-lg md:text-xl leading-relaxed">
            <p className="font-medium">Or reach us directly at:</p>
            <p className="mt-3">
              Email:{" "}
              <a href="mailto:lawalabiolaibileh@gmail.com" className="text-blue-400 hover:underline font-semibold">
                lawalabiolaibileh@gmail.com
              </a>
            </p>
            <p className="mt-1">
              Phone:{" "}
              <a href="tel:+2348108153209" className="text-blue-400 hover:underline font-semibold">
                +234 810 815 3209
              </a>
              <a href="tel:+2348108153209" className="text-blue-400 hover:underline font-semibold">
                +234 816 582 6960
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
