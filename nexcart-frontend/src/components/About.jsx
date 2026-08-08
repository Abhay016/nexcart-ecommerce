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
    <div className="max-w-7xl mx-auto px-6 py-16">
      {/* Hero Section */}
      <h1 className="text-slate-800 text-5xl font-extrabold text-center mb-12 tracking-tight">
        About Us
      </h1>

      <div className="flex flex-col lg:flex-row justify-between items-center mb-16 gap-10">
        <div className="w-full md:w-1/2 text-center md:text-left space-y-6">
          <p className="text-lg text-gray-700 leading-relaxed">
            Welcome to our e-commerce store! We are dedicated to providing the
            best products and services to our customers. Our mission is to offer
            a seamless shopping experience while ensuring the highest quality of
            our offerings.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
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
      <div className="py-10 space-y-10">
        <h2 className="text-slate-800 text-4xl font-bold text-center">
          Our Products
        </h2>
        <p className="text-center text-gray-600 max-w-2xl mx-auto">
          Explore some of our featured products that combine cutting-edge
          technology, sleek design, and unbeatable value.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
      <div className="mt-16 text-center">
        <h3 className="text-2xl font-semibold text-slate-800 mb-4">
          Ready to start shopping?
        </h3>
        <p className="text-gray-600 mb-6">
          Discover exclusive deals and premium products tailored just for you.
        </p>
        <a
          href="/products"
          className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition-transform duration-300 font-semibold"
        >
          Browse Products
        </a>
      </div>
    </div>
  );
};

export default About;
