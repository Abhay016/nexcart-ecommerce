import ProductCard from "./shared/ProductCard";

const products = [
  {
    image: "https://embarkx.com/sample/placeholder.png",
    productName: "iPhone 13 Pro Max",
    description:
      "The iPhone 13 Pro Max offers exceptional performance with its A15 Bionic chip, stunning Super Retina XDR display, and advanced camera features for breathtaking photos.",
    specialPrice: 720,
    price: 780,
  },
  {
    image: "https://embarkx.com/sample/placeholder.png",
    productName: "Samsung Galaxy S21",
    description:
      "Experience the brilliance of the Samsung Galaxy S21 with its vibrant AMOLED display, powerful camera, and sleek design that fits perfectly in your hand.",
    specialPrice: 699,
    price: 799,
  },
  {
    image: "https://embarkx.com/sample/placeholder.png",
    productName: "Google Pixel 6",
    description:
      "The Google Pixel 6 boasts cutting-edge AI features, exceptional photo quality, and a stunning display, making it a perfect choice for Android enthusiasts.",
    price: 599,
    specialPrice: 400,
  },
];

const About = () => {
  return (
    <section className="relative py-20 bg-gradient-to-br from-gray-50 via-white to-rose-50 overflow-hidden">
      {/* Decorative blurred accents */}
      <div className="absolute inset-0">
        <div className="absolute -top-24 left-1/4 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-rose-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Hero Section */}
        <h1 className="text-slate-900 text-5xl md:text-6xl font-extrabold text-center mb-14 tracking-tight">
          About Us
        </h1>

        <div className="flex flex-col lg:flex-row justify-between items-center mb-20 gap-12">
          <div className="w-full md:w-1/2 text-center md:text-left space-y-6">
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
              Welcome to our e-commerce store! We are dedicated to providing the
              best products and services to our customers. Our mission is to offer
              a seamless shopping experience while ensuring the highest quality of
              our offerings.
            </p>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
              With a curated selection of top-notch products, we aim to bring
              innovation, style, and convenience right to your fingertips. Your
              satisfaction is our priority, and we strive to exceed expectations
              every step of the way.
            </p>
          </div>

          <div className="w-full md:w-1/2">
            <img
              src="https://embarkx.com/sample/placeholder.png"
              alt="About Us"
              className="w-full h-auto rounded-2xl shadow-xl transform transition-transform duration-500 hover:scale-105 hover:shadow-2xl"
            />
          </div>
        </div>

        {/* Products Showcase */}
        <div className="py-12 space-y-12">
          <h2 className="text-slate-900 text-4xl md:text-5xl font-bold text-center">
            Our Products
          </h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto text-lg">
            Explore some of our featured products that combine cutting-edge
            technology, sleek design, and unbeatable value.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {products.map((product, index) => (
              <div
                key={index}
                className="transform transition duration-300 hover:scale-105 hover:shadow-lg rounded-xl"
              >
                <ProductCard
                  image={product.image}
                  productName={product.productName}
                  description={product.description}
                  specialPrice={product.specialPrice}
                  price={product.price}
                  about
                />
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-20 text-center">
          <h3 className="text-2xl md:text-3xl font-semibold text-slate-900 mb-4">
            Ready to start shopping?
          </h3>
          <p className="text-gray-600 mb-6 text-lg">
            Discover exclusive deals and premium products tailored just for you.
          </p>
          <a
            href="/products"
            className="inline-block bg-gradient-to-r from-indigo-500 to-rose-500 text-white px-8 py-4 rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition-transform duration-300 font-semibold text-lg"
          >
            Browse Products
          </a>
        </div>
      </div>
    </section>
  );
};

export default About;
