import { FaEnvelope, FaMapMarkedAlt, FaPhone } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 py-16">
      <div className="w-full max-w-lg bg-white shadow-2xl rounded-2xl py-10 sm:px-10 px-6 border border-gray-100">
        
        {/* Header */}
        <div className="flex flex-col items-center justify-center space-y-4 mb-6">
          <div className="p-5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-500 text-white shadow-lg">
            <FaEnvelope className="text-4xl" />
          </div>
          <h1 className="text-center font-montserrat lg:text-3xl text-2xl font-bold text-gray-800">
            Contact Us
          </h1>
          <p className="text-gray-500 text-sm text-center">
            We would love to hear from you! Fill out the form below or reach us directly.
          </p>
        </div>

        <hr className="mt-4 mb-8 border-gray-300" />

        {/* Form */}
        <form className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              required
              className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              required
              className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Message</label>
            <textarea
              rows="4"
              required
              className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-500 text-white py-3 rounded-md shadow-lg transition hover:scale-[1.02] hover:shadow-xl">
            Send Message
          </button>
        </form>

        {/* Contact Info */}
        <div className="mt-10 text-center">
          <h2 className="text-lg font-semibold text-gray-800">Contact Information</h2>
          <div className="flex flex-col items-center space-y-3 mt-4 text-gray-600">
            <div className="flex items-center">
              <FaPhone className="text-blue-500 mr-2" />
              <span>+1 (123) 456-7890</span>
            </div>
            <div className="flex items-center">
              <FaEnvelope className="text-blue-500 mr-2" />
              <span>nexcartofficial@gmail.com</span>
            </div>
            <div className="flex items-center">
              <FaMapMarkedAlt className="text-blue-500 mr-2" />
              <span>123 Main St, New York, USA</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
