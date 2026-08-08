import { FaFacebookF, FaInstagram, FaPinterestP, FaYoutube, FaTwitter } from "react-icons/fa";
import { SiVisa, SiMastercard, SiGooglepay, SiPaypal, SiApple, SiStripe } from "react-icons/si";

const Footer = () => {
  return (
    <footer className="bg-gray-50 text-gray-700 mt-16 border-t border-gray-200">
      <div className="container mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
        
        {/* Brand + Description */}
        <div>
          <h2 className="text-2xl font-bold text-blue-600 mb-4">NexCart</h2>
          <p className="text-sm text-gray-600">
            Your one-stop shop for premium products. We bring you the best deals with a seamless shopping experience.
          </p>
          {/* Payment Icons */}
          <div className="flex space-x-3 mt-4 text-xl text-gray-500">
            {[SiVisa, SiMastercard, SiGooglepay, SiPaypal, SiApple, SiStripe].map((Icon, i) => (
              <Icon key={i} className="hover:text-blue-600 transition-transform transform hover:scale-110 cursor-pointer" />
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            {["About", "Blogs", "Contact", "FAQ"].map((link, i) => (
              <li key={i}>
                <a href={`/${link.toLowerCase()}`} className="hover:text-blue-600 transition-colors">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Account */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Account</h3>
          <ul className="space-y-2 text-sm">
            {["My Account", "Orders Tracking", "Checkout", "Wishlist"].map((link, i) => (
              <li key={i}>
                <a href={`/${link.replace(/\s+/g, "").toLowerCase()}`} className="hover:text-blue-600 transition-colors">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Newsletter</h3>
          <form className="flex flex-col space-y-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-600 to-indigo-500 text-white font-semibold px-4 py-2 rounded-md shadow hover:opacity-90 hover:scale-[1.02] transition-transform"
            >
              SUBSCRIBE
            </button>
          </form>
          {/* Social Icons */}
          <div className="flex space-x-4 mt-6 text-xl text-gray-500">
            {[FaFacebookF, FaTwitter, FaYoutube, FaInstagram, FaPinterestP].map((Icon, i) => (
              <Icon key={i} className="hover:text-blue-600 transition-transform transform hover:scale-110 cursor-pointer" />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-100 text-center py-4 text-sm text-gray-600 border-t border-gray-200">
        © 2026 NexCart. All rights reserved | Made with ❤️ by Archit
      </div>
    </footer>
  );
};

export default Footer;
