import { FaInstagram } from "react-icons/fa";
import { ShieldCheck, Truck, Sparkles, Users } from "lucide-react";

export default function PromoSubscribe() {
  const features = [
    {
      icon: <ShieldCheck className="w-10 h-10 text-blue-600" />,
      title: "Secure Checkout",
      description: "Your data is protected with industry‑leading encryption.",
    },
    {
      icon: <Truck className="w-10 h-10 text-green-600" />,
      title: "Fast Shipping",
      description: "Get your orders delivered quickly and reliably worldwide.",
    },
    {
      icon: <Sparkles className="w-10 h-10 text-pink-500" />,
      title: "Exclusive Deals",
      description: "Unlock members‑only discounts and seasonal offers.",
    },
    {
      icon: <Users className="w-10 h-10 text-purple-600" />,
      title: "Community Access",
      description: "Join a vibrant fashion community with insider tips.",
    },
  ];

  return (
    <section className="relative bg-gradient-to-br from-indigo-50 via-pink-50 to-yellow-50 py-20 px-6 lg:px-20 overflow-hidden">
      {/* Decorative background accents */}
      <div className="absolute inset-0">
        <div className="absolute -top-24 left-1/4 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      </div>

      <div className="relative z-10 container mx-auto">
        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 drop-shadow-sm">
            Get 10% Off on Your First Order
          </h2>
          <p className="mt-3 text-lg text-gray-600">
            Plus exclusive access to product drops, style tips, and insider deals.
          </p>
        </div>

        {/* Subscription Form */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
          <input
            type="email"
            placeholder="Enter your email *"
            className="w-full sm:w-96 px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
          />
          <button className="px-6 py-3 rounded-md bg-gradient-to-r from-red-500 to-rose-600 text-white font-semibold shadow-md hover:scale-105 transition-transform duration-300">
            Subscribe
          </button>
        </div>

        {/* Professional Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center text-center bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 p-6"
            >
              {feature.icon}
              <h3 className="mt-4 text-lg font-semibold text-gray-800">
                {feature.title}
              </h3>
              <p className="mt-2 text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Social Follow */}
        <div className="text-center">
          <p className="text-gray-700 font-medium flex items-center justify-center gap-2">
            Follow us <span className="font-semibold">@NexCart</span>
            <FaInstagram className="w-5 h-5 text-pink-500" />
          </p>
        </div>
      </div>
    </section>
  );
}
