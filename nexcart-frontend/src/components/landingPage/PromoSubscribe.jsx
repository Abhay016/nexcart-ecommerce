import { FaInstagram } from "react-icons/fa";
import { ShieldCheck, Truck, Sparkles, Users } from "lucide-react";

export default function PromoSubscribe() {
  const features = [
    {
      icon: <ShieldCheck className="w-12 h-12 text-indigo-600 group-hover:text-violet-600 transition-colors" />,
      title: "Secure Checkout",
      description: "Your data is protected with industry‑leading encryption.",
    },
    {
      icon: <Truck className="w-12 h-12 text-green-600 group-hover:text-emerald-600 transition-colors" />,
      title: "Fast Shipping",
      description: "Get your orders delivered quickly and reliably worldwide.",
    },
    {
      icon: <Sparkles className="w-12 h-12 text-pink-500 group-hover:text-rose-500 transition-colors" />,
      title: "Exclusive Deals",
      description: "Unlock members‑only discounts and seasonal offers.",
    },
    {
      icon: <Users className="w-12 h-12 text-purple-600 group-hover:text-indigo-600 transition-colors" />,
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
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 drop-shadow-sm">
            Get 10% Off Your First Order
          </h2>
          <p className="mt-3 text-lg text-gray-600">
            Plus exclusive access to product drops, style tips, and insider deals.
          </p>
          <div className="mt-6 w-28 h-1 bg-gradient-to-r from-indigo-500 via-violet-500 to-rose-500 mx-auto rounded-full animate-pulse"></div>
        </div>

        {/* Subscription Form */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
          <input
            type="email"
            placeholder="Enter your email *"
            className="w-full sm:w-96 px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm transition"
          />
          <button className="px-8 py-3 rounded-md bg-gradient-to-r from-indigo-600 via-violet-600 to-rose-600 text-white font-semibold shadow-lg hover:scale-105 hover:shadow-xl transition-transform duration-300">
            Subscribe
          </button>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="group flex flex-col items-center text-center bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-8 hover:-translate-y-2"
            >
              {feature.icon}
              <h3 className="mt-6 text-lg font-semibold text-gray-900">
                {feature.title}
              </h3>
              <p className="mt-2 text-gray-600 text-sm leading-relaxed">
                {feature.description}
              </p>
              <div className="mt-4 w-16 h-1 bg-gradient-to-r from-indigo-400 to-rose-400 rounded-full"></div>
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
