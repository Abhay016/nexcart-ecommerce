import { ShoppingBag, ClipboardList, Clock } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      icon: <ShoppingBag className="w-12 h-12 text-indigo-500 group-hover:text-violet-600 transition-colors" />,
      title: "Shop Styles",
      description:
        "Browse our curated collections for Men, Women, Kids & Accessories.",
    },
    {
      icon: <Clock className="w-12 h-12 text-indigo-500 group-hover:text-violet-600 transition-colors" />,
      title: "Pick Your Fit",
      description:
        "Find your perfect size with our detailed fit guides and style notes for every piece.",
    },
    {
      icon: <ClipboardList className="w-12 h-12 text-indigo-500 group-hover:text-violet-600 transition-colors" />,
      title: "Checkout Fast",
      description:
        "Enjoy a quick and secure checkout experience with flexible payment options.",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-indigo-50 via-violet-50 to-rose-50 relative overflow-hidden">
      {/* Decorative background accents */}
      <div className="absolute inset-0">
        <div className="absolute -top-24 left-1/4 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-rose-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      </div>

      <div className="container mx-auto px-6 lg:px-20 relative z-10">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 drop-shadow-sm">
            How It Works
          </h2>
          <p className="mt-3 text-lg text-gray-600">
            Just Pick, Pack and Ship.
          </p>
          <div className="mt-6 w-28 h-1 bg-gradient-to-r from-indigo-500 via-violet-500 to-rose-500 mx-auto rounded-full animate-pulse"></div>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-10">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="group flex flex-col items-center text-center bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-10 border border-gray-100 hover:-translate-y-2"
            >
              <div className="mb-6">{step.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {step.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {step.description}
              </p>
              <div className="mt-6 w-16 h-1 bg-gradient-to-r from-indigo-400 to-rose-400 rounded-full"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
