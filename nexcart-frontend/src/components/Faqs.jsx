import { useState } from "react";
import { ChevronRight } from "lucide-react";

export default function FAQPage() {
  const faqSections = [
    {
      title: "Returns & Exchanges",
      items: [
        {
          question: "What is your return policy?",
          answer:
            "We accept returns within 14 days of delivery on unworn, unwashed items with original tags. Some items like final sale or underwear are non-returnable.",
        },
        {
          question: "How do I start a return or exchange?",
          answer:
            "You can initiate a return or exchange by visiting the 'My Orders' section in your account and selecting the item.",
        },
        {
          question: "When will I get my refund?",
          answer:
            "Refunds are processed within 5–7 business days after we receive and inspect the returned item.",
        },
        {
          question: "Can I exchange an item for a different size?",
          answer:
            "Absolutely! If the size you need is available, we’ll process an exchange once your original item is received.",
        },
      ],
    },
    {
      title: "Ordering & Payment",
      items: [
        {
          question: "What payment methods do you accept?",
          answer:
            "We accept credit/debit cards, UPI, net banking, and popular wallets. All payments are secure and encrypted.",
        },
        {
          question: "Can I apply a promo code or gift card at checkout?",
          answer:
            "Yes, you can enter promo codes or gift card details during checkout to avail discounts.",
        },
        {
          question: "Can I modify or cancel my order after placing it?",
          answer:
            "Orders are processed quickly, but if you contact us within 1 hour of purchase, we’ll do our best to accommodate changes or cancellations.",
        },
        {
          question: "Do you offer pre-orders?",
          answer:
            "Yes, selected items are available for pre-order. Estimated delivery dates are mentioned on the product page.",
        },
      ],
    },
    {
      title: "Shipping & Delivery",
      items: [
        {
          question: "How long does delivery take?",
          answer:
            "Standard delivery usually takes 3–5 business days, while express delivery options are available at checkout.",
        },
        {
          question: "Do you ship internationally?",
          answer:
            "Yes, we ship to most countries worldwide. International shipping charges and timelines vary by location.",
        },
        {
          question: "Can I track my order?",
          answer:
            "Absolutely! Once your order is shipped, you’ll receive a tracking link via email or SMS.",
        },
        {
          question: "What if my package is delayed?",
          answer:
            "If your package is delayed beyond the estimated delivery date, please contact our support team for assistance.",
        },
      ],
    },
    {
      title: "Account & Security",
      items: [
        {
          question: "Do I need an account to place an order?",
          answer:
            "You can checkout as a guest, but creating an account allows you to track orders, save addresses, and access exclusive deals.",
        },
        {
          question: "How do I reset my password?",
          answer:
            "Click on 'Forgot Password' at the login page and follow the instructions to reset your password via email.",
        },
        {
          question: "Is my personal information secure?",
          answer:
            "Yes, we use industry-standard encryption and security practices to protect your personal and payment information.",
        },
        {
          question: "Can I update my account details?",
          answer:
            "Yes, you can update your name, email, and address anytime from the 'My Account' section.",
        },
      ],
    },
    {
      title: "Products & Warranty",
      items: [
        {
          question: "Do your products come with a warranty?",
          answer:
            "Yes, most electronics and appliances come with a manufacturer’s warranty. Details are mentioned on the product page.",
        },
        {
          question: "How can I claim warranty service?",
          answer:
            "You can contact the manufacturer directly or reach out to our support team for guidance on warranty claims.",
        },
        {
          question: "Are your products authentic?",
          answer:
            "Yes, we only sell 100% genuine products sourced directly from brands or authorized distributors.",
        },
        {
          question: "Do you offer installation services?",
          answer:
            "For certain appliances, we provide free installation services. Check the product page for eligibility.",
        },
      ],
    },
    {
      title: "Support & Contact",
      items: [
        {
          question: "How can I contact customer support?",
          answer:
            "You can reach us via email at support@nexcart.com or call our helpline at +1 (123) 456-7890.",
        },
        {
          question: "What are your support hours?",
          answer:
            "Our support team is available Monday to Saturday, 9 AM – 8 PM IST.",
        },
        {
          question: "Do you offer live chat support?",
          answer:
            "Yes, live chat support is available on our website during business hours.",
        },
        {
          question: "Where can I find updates about offers?",
          answer:
            "Subscribe to our newsletter or follow us on social media to stay updated on the latest deals and offers.",
        },
      ],
    },
  ];


  const [openQuestion, setOpenQuestion] = useState(null);

  const toggleQuestion = (sectionIndex, itemIndex) => {
    const key = `${sectionIndex}-${itemIndex}`;
    setOpenQuestion(openQuestion === key ? null : key);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-rose-50 relative overflow-hidden min-h-screen">
      <div className="container mx-auto px-6 lg:px-20 relative z-10">
        {/* Heading */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-600 font-medium">
            Quick answers to common queries
          </p>
          <div className="mt-6 w-28 h-1 bg-gradient-to-r from-indigo-400 to-rose-400 mx-auto rounded-full"></div>
        </div>

        {/* FAQ Sections */}
        <div className="space-y-12">
          {faqSections.map((section, sectionIndex) => (
            <div
              key={sectionIndex}
              className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow duration-300"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {section.title}
              </h2>
              <ul className="space-y-5">
                {section.items.map((item, itemIndex) => {
                  const key = `${sectionIndex}-${itemIndex}`;
                  const isOpen = openQuestion === key;
                  return (
                    <li key={itemIndex}>
                      <div
                        onClick={() => toggleQuestion(sectionIndex, itemIndex)}
                        className="flex items-center justify-between w-full cursor-pointer text-gray-900 hover:text-indigo-600 transition-colors"
                      >
                        <span className="text-lg font-semibold">
                          {item.question}
                        </span>
                        <ChevronRight
                          className={`w-6 h-6 transform transition-transform ${isOpen ? "rotate-90 text-rose-500" : "text-gray-400"
                            }`}
                        />
                      </div>
                      <div
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-40 mt-3" : "max-h-0"
                          }`}
                      >
                        <p className="text-base text-gray-600 leading-relaxed">
                          {item.answer}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="text-center mt-20">
          <p className="text-gray-700 mb-5 text-lg font-medium">
            Still need help? We’re here for you.
          </p>
          <a
            href="/contact"
            className="inline-block px-8 py-4 rounded-md bg-gradient-to-r from-indigo-500 to-rose-500 text-white text-lg font-semibold shadow-md hover:scale-105 transition-transform duration-300"
          >
            Contact Support
          </a>
        </div>
      </div>
    </section>
  );
}
