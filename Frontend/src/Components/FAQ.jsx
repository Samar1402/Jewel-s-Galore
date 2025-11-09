import React, { useState } from "react";

const FAQ = () => {
  const faqs = [
    {
      question: "What is your return policy?",
      answer:
        "We offer a 2-day easy return policy. If you’re not satisfied with your hamper, you can request a return within 2 days of delivery.",
    },
    {
      question: "Do you offer customized gift hampers?",
      answer:
        "Yes! We specialize in fully customized gift hampers. You can choose the theme, products, packaging, and message to make your gift truly special.",
    },
    {
      question: "What kind of hampers do you offer?",
      answer:
        "We offer hampers for all occasions — birthdays, anniversaries, festivals, weddings, and corporate gifting. Each one is made with love and care.",
    },
    {
      question: "How long does delivery take?",
      answer:
        "Delivery usually takes 3–7 business days depending on your location and order customization level.",
    },
    {
      question: "Can I include a personal message in the hamper?",
      answer:
        "Absolutely! You can add a personalized note or card with every order. Just mention it while placing your request.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-6">
      <div className="w-full max-w-3xl bg-white border border-gray-200 rounded-2xl shadow-2xl p-10">
        <h1 className="text-4xl font-serif text-center text-[#b8860b] mb-10">
          Frequently Asked Questions
        </h1>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full text-left px-6 py-4 flex justify-between items-center text-gray-800 font-medium focus:outline-none"
              >
                {faq.question}
                <span className="text-[#b8860b] text-2xl">
                  {openIndex === index ? "−" : "+"}
                </span>
              </button>

              {openIndex === index && (
                <div className="px-6 pb-4 text-gray-600 border-t border-gray-200">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
