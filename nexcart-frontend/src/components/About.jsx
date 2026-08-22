import ProductCard from "./shared/ProductCard";

const products = [
  {
    image: "https://embarkx.com/sample/placeholder.png",
    productName: "iPhone 13 Pro Max",
    description:
      "Exceptional performance with A15 Bionic chip, Super Retina XDR display, and advanced camera features.",
    specialPrice: 720,
    price: 780,
  },
  {
    image: "https://embarkx.com/sample/placeholder.png",
    productName: "Samsung Galaxy S21",
    description:
      "Vibrant AMOLED display, powerful camera, and sleek design that fits perfectly in your hand.",
    specialPrice: 699,
    price: 799,
  },
  {
    image: "https://embarkx.com/sample/placeholder.png",
    productName: "Google Pixel 6",
    description:
      "Cutting-edge AI features, exceptional photo quality, and a stunning display for Android enthusiasts.",
    price: 599,
    specialPrice: 400,
  },
];

const testimonials = [
  {
    quote:
      "Shopping with NexCart was seamless — fast delivery and genuine products every time.",
    name: "Ananya S.",
    role: "Verified Buyer",
  },
  {
    quote:
      "Customer support was quick and helpful when I needed an exchange. Truly hassle-free.",
    name: "Rohit M.",
    role: "Happy Customer",
  },
  {
    quote:
      "Great deals, authentic products, and smooth checkout. NexCart is my go-to store.",
    name: "Priya K.",
    role: "Frequent Shopper",
  },
];

const About = () => {
  return (
    <section className="relative py-20 bg-gradient-to-br from-indigo-50 via-white to-rose-50 overflow-hidden">
      {/* Decorative accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 left-1/4 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-rose-200 rounded-full mix-blend-multiply blur-3xl opacity-20"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Hero */}
        <header className="text-center mb-12">
          <h1 className="text-slate-900 text-5xl md:text-6xl font-extrabold tracking-tight">
            About NexCart
          </h1>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-lg">
            Curated products, transparent pricing, and exceptional service —
            everything you need for a confident shopping experience.
          </p>
        </header>

        {/* Intro */}
        <div className="flex flex-col lg:flex-row items-center gap-12 mb-16">
          <div className="w-full lg:w-1/2 space-y-6">
            <p className="text-gray-700 text-lg leading-relaxed">
              At NexCart, our mission is simple: make online shopping delightful.
              We partner with trusted brands, ensure authenticity, and deliver
              products with speed and care.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed">
              From the latest gadgets to everyday essentials, we focus on quality,
              value, and service — so you spend less time searching and more time
              enjoying.
            </p>
          </div>
          <div className="w-full lg:w-1/2">
            <img
              src="https://embarkx.com/sample/placeholder.png"
              alt="About NexCart"
              className="w-full h-auto rounded-2xl shadow-xl transform transition duration-500 hover:scale-105 hover:shadow-2xl"
            />
          </div>
        </div>

        {/* Featured Products */}
        <section className="py-12 mb-16">
          <h2 className="text-slate-900 text-3xl md:text-4xl font-bold text-center mb-4">
            Featured Products
          </h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-8">
            Explore customer favorites that combine innovation, design, and value.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <ProductCard key={index} {...product} about />
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="mb-16">
          <h2 className="text-slate-900 text-3xl md:text-4xl font-bold text-center mb-6">
            What Our Customers Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <blockquote
                key={i}
                className="p-6 bg-white/90 rounded-xl shadow hover:shadow-lg transition backdrop-blur-md"
              >
                <p className="text-gray-700 italic">“{t.quote}”</p>
                <footer className="mt-4">
                  <div className="text-sm font-semibold text-indigo-600">
                    {t.name}
                  </div>
                  <div className="text-xs text-gray-500">{t.role}</div>
                </footer>
              </blockquote>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="mt-8 text-center">
          <h3 className="text-2xl md:text-3xl font-semibold text-slate-900 mb-4">
            Ready to shop with confidence?
          </h3>
          <p className="text-gray-600 mb-6">
            Join thousands of happy customers and discover curated deals every week.
          </p>
          <a
            href="/products"
            className="inline-block bg-gradient-to-r from-indigo-600 to-rose-500 text-white px-8 py-4 rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition font-semibold"
          >
            Browse Products
          </a>
        </div>
      </div>
    </section>
  );
};

export default About;
