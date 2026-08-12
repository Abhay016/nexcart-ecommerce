import { FaEnvelope, FaMapMarkedAlt, FaPhone } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-rose-50 py-20 relative overflow-hidden">
      {/* Decorative accents */}
      <div className="absolute -top-24 left-1/4 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-rose-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>

      <div className="w-full max-w-2xl bg-white shadow-xl rounded-2xl py-12 sm:px-12 px-6 border border-gray-100 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col items-center justify-center space-y-4 mb-8">
          <div className="p-6 rounded-full bg-gradient-to-r from-indigo-500 to-rose-500 text-white shadow-lg">
            <FaEnvelope className="text-4xl" />
          </div>
          <h1 className="text-center font-montserrat text-3xl md:text-4xl font-extrabold text-gray-900">
            Contact Us
          </h1>
          <p className="text-gray-600 text-base text-center max-w-md">
            We’d love to hear from you! Fill out the form below or reach us directly.
          </p>
        </div>

        <hr className="mt-4 mb-8 border-gray-200" />

        {/* Form */}
        <form className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700">Name</label>
            <input
              type="text"
              required
              className="mt-2 block w-full border border-gray-300 rounded-lg p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">Email</label>
            <input
              type="email"
              required
              className="mt-2 block w-full border border-gray-300 rounded-lg p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">Message</label>
            <textarea
              rows="4"
              required
              className="mt-2 block w-full border border-gray-300 rounded-lg p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            />
          </div>

          <button className="w-full bg-gradient-to-r from-indigo-500 to-rose-500 text-white py-3 rounded-md shadow-md font-semibold text-lg transition hover:scale-[1.02] hover:shadow-lg">
            Send Message
          </button>
        </form>

        {/* Contact Info */}
        <div className="mt-12 text-center">
          <h2 className="text-xl font-bold text-gray-900">Contact Information</h2>
          <div className="flex flex-col items-center space-y-4 mt-6 text-gray-700">
            <div className="flex items-center">
              <FaPhone className="text-indigo-500 mr-3 text-lg" />
              <span className="text-base font-medium">+1 (123) 456-7890</span>
            </div>
            <div className="flex items-center">
              <FaEnvelope className="text-indigo-500 mr-3 text-lg" />
              <span className="text-base font-medium">nexcartofficial@gmail.com</span>
            </div>
            <div className="flex items-center">
              <FaMapMarkedAlt className="text-indigo-500 mr-3 text-lg" />
              <span className="text-base font-medium">123 Main St, New York, USA</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
