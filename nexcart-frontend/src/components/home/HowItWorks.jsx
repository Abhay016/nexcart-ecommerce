import { ShoppingBag, ClipboardList, Clock } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      icon: <ShoppingBag className="w-10 h-10 text-red-500" />,
      title: "Shop Styles",
      description:
        "Browse our curated collections for Men, Women, Kids & Accessories.",
    },
    {
      icon: <Clock className="w-10 h-10 text-red-500" />,
      title: "Pick Your Fit",
      description:
        "Find your perfect size with our detailed fit guides and style notes for every piece.",
    },
    {
      icon: <ClipboardList className="w-10 h-10 text-red-500" />,
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
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 drop-shadow-sm">
            How It Works
          </h2>
          <p className="mt-2 text-lg text-gray-600">
            Just Pick, Pack and Ship.
          </p>
          {/* Professional divider */}
          <div className="mt-6 w-24 h-1 bg-gradient-to-r from-indigo-400 to-rose-400 mx-auto rounded-full"></div>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-10">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center text-center bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 p-8 border border-gray-100"
            >
              <div className="mb-4">{step.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {step.title}
              </h3>
              <p className="text-gray-600 text-sm">{step.description}</p>
              {/* Accent line for polish */}
              <div className="mt-4 w-16 h-1 bg-gradient-to-r from-indigo-400 to-rose-400 rounded-full"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
