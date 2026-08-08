import { bannerImageTwo } from "../utils/constant";

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white overflow-hidden">
      {/* Decorative background shapes */}
      <div className="absolute inset-0">
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-yellow-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      </div>

      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between py-28 px-6 relative z-10">
        
        {/* Left Content */}
        <div className="max-w-xl space-y-6 animate-fadeIn">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-snug tracking-tight drop-shadow-lg">
            Shop <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">Smarter</span>, Live Better
          </h1>
          <p className="text-lg md:text-xl text-blue-100">
            Discover exclusive deals on fashion, electronics, and more. 
            Elevate your shopping experience with NexCart.
          </p>
          <div className="flex space-x-4">
            <a
              href="/shop"
              className="px-6 py-3 bg-gradient-to-r from-white to-gray-100 text-blue-700 font-semibold rounded-md shadow-md hover:scale-105 hover:shadow-xl transition-transform"
            >
              Start Shopping
            </a>
            <a
              href="/deals"
              className="px-6 py-3 border border-white text-white font-semibold rounded-md hover:bg-white hover:text-blue-700 transition"
            >
              View Deals
            </a>
          </div>
        </div>

        {/* Right Image */}
        <div className="mt-12 md:mt-0 md:w-1/2 relative animate-slideUp">
          <img
            src={bannerImageTwo}
            alt="Shopping"
            className="rounded-xl shadow-2xl transform hover:scale-105 hover:-translate-y-1 transition-transform duration-500"
          />
          {/* Glow effect */}
          <div className="absolute inset-0 -z-10 flex justify-center">
            <div className="w-72 h-72 bg-gradient-to-r from-pink-500 to-yellow-400 rounded-full blur-3xl opacity-40"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
