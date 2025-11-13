import React from "react";

const RefundPolicy = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-6 py-12">
      <div className="max-w-3xl w-full bg-white border border-[#d4af37]/40 rounded-2xl shadow-2xl p-10">
        <h1 className="text-4xl font-serif font-semibold text-center text-[#1a1a1a] mb-8">
          Refund & Return Policy
        </h1>

        <div className="space-y-6 text-[#2c2c2c] leading-relaxed">
          <p>
            At{" "}
            <span className="text-[#d4af37] font-medium">
              Megha’s Jewels Galore
            </span>
            , your satisfaction is our top priority. Every jewelry piece is
            crafted with love and care — but if you’re not fully satisfied, we
            offer a{" "}
            <span className="text-[#d4af37] font-semibold">
              2 Days Easy Return Policy
            </span>{" "}
            for your convenience.
          </p>

          <h2 className="text-2xl font-serif text-[#d4af37] mt-6">
            🛍️ Return Eligibility
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              Items can be returned within <strong>2 days</strong> of delivery.
            </li>
            <li>
              The product must be <strong>unused</strong>, in its original
              packaging, and with all tags intact.
            </li>
            <li>
              Customized, personalized, or sale items are{" "}
              <strong>non-returnable</strong>.
            </li>
          </ul>

          <h2 className="text-2xl font-serif text-[#d4af37] mt-6">
            💰 Refund Process
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              Once your return is received and inspected, we’ll notify you via
              email or WhatsApp.
            </li>
            <li>
              Refunds will be processed to your original payment method within{" "}
              <strong>3–5 business days</strong>.
            </li>
            <li>
              For COD orders, refunds are issued via UPI or bank transfer.
            </li>
          </ul>

          <h2 className="text-2xl font-serif text-[#d4af37] mt-6">
            🚚 Damaged or Wrong Product
          </h2>
          <p>
            If you receive a damaged, defective, or incorrect item, please
            contact us within <strong>24 hours</strong> of delivery. Share clear
            images of the product and packaging for a quick resolution. We’ll
            offer a replacement or refund as per your choice.
          </p>

          <h2 className="text-2xl font-serif text-[#d4af37] mt-6">
            📞 Need Help?
          </h2>
          <p>
            For any refund or return-related queries, contact us at:
            <br />
            <span className="block mt-2">
              📩 <strong>Email:</strong>{" "}
              <a
                href="mailto:meghajewelsgalore@gmail.com"
                className="text-[#d4af37] hover:underline"
              >
                meghajewelsgalore@gmail.com
              </a>
            </span>
            <span className="block">
              📱 <strong>WhatsApp:</strong>{" "}
              <a
                href="https://wa.me/916200597532"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#d4af37] hover:underline"
              >
                +91 62005 97532
              </a>
            </span>
          </p>

          <p className="text-center text-[#d4af37] font-semibold mt-8">
            💎 Hassle-Free 2 Days Return — Because Your Happiness Matters 💎
          </p>
        </div>
      </div>
    </div>
  );
};

export default RefundPolicy;
