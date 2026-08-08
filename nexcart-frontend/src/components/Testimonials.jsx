import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const testimonials = [
  { 
    name: "Aditi", 
    text: "Amazing deals and fast delivery!", 
    role: "Fashion Enthusiast", 
    avatar: "https://randomuser.me/api/portraits/women/44.jpg" 
  },
  { 
    name: "Rahul", 
    text: "The best shopping experience I've had online.", 
    role: "Tech Lover", 
    avatar: "https://randomuser.me/api/portraits/men/46.jpg" 
  },
  { 
    name: "Sneha", 
    text: "Beautiful UI and smooth checkout process.", 
    role: "Designer", 
    avatar: "https://randomuser.me/api/portraits/women/47.jpg" 
  },
  { 
    name: "Arjun", 
    text: "Great customer support and fast refunds!", 
    role: "Entrepreneur", 
    avatar: "https://randomuser.me/api/portraits/men/48.jpg" 
  },
  { 
    name: "Meera", 
    text: "Loved the product quality and packaging.", 
    role: "Lifestyle Blogger", 
    avatar: "https://randomuser.me/api/portraits/women/49.jpg" 
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-gradient-to-r from-pink-50 via-purple-50 to-blue-50 text-gray-800 relative overflow-hidden">
      {/* Decorative background accents */}
      <div className="absolute inset-0">
        <div className="absolute -top-24 left-1/4 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <h2 className="text-4xl font-extrabold mb-12 drop-shadow-sm text-gray-900">
          What Our Customers Say
        </h2>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {testimonials.map((t, i) => (
            <SwiperSlide key={i}>
              <div className="bg-white/70 backdrop-blur-md rounded-xl p-8 shadow-md hover:shadow-xl hover:scale-105 transition-transform duration-300">
                {/* Avatar */}
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-16 h-16 rounded-full mx-auto mb-4 border-2 border-white shadow-md"
                />

                {/* Quote */}
                <p className="italic text-lg leading-relaxed text-gray-700">"{t.text}"</p>

                {/* Star Rating */}
                <div className="flex justify-center mt-4 text-yellow-400">
                  {Array(5).fill().map((_, idx) => (
                    <svg
                      key={idx}
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.562-.955L10 0l2.95 5.955 6.562.955-4.756 4.635 1.122 6.545z" />
                    </svg>
                  ))}
                </div>

                {/* Name & Role */}
                <h4 className="mt-6 font-semibold text-xl text-gray-900">{t.name}</h4>
                <p className="text-sm text-gray-600">{t.role}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
