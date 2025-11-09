import React from "react";

const About = () => {
  return (
    <div className="bg-gradient-to-b from-yellow-50 to-white py-12 px-6 md:px-20">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-semibold text-amber-800 mb-6">
          💎 About Megha’s Jewels Galore
        </h1>
        <p className="text-lg text-gray-700 leading-relaxed mb-10">
          Megha’s Jewels Galore is a Patna-based jewelry brand that celebrates
          timeless beauty, elegance, and craftsmanship. We specialize in
          handcrafted jewelry that blends traditional artistry with modern
          design — making every piece a symbol of grace and confidence.
          <br />
          <br />
          Our collection includes necklaces, earrings, rings, and bracelets —
          each crafted with attention to detail and love. Whether it’s for daily
          wear or special occasions, Megha’s Jewels Galore offers something
          unique for every woman who loves to shine.
        </p>

        <h2 className="text-3xl font-semibold text-amber-700 mb-4">
          ✨ Our Mission
        </h2>
        <p className="text-gray-700 mb-10 leading-relaxed">
          To create jewelry that not only enhances your beauty but also tells
          your story — with designs inspired by tradition and empowered by
          modern trends.
        </p>

        <h2 className="text-3xl font-semibold text-amber-700 mb-4">
          💍 What We Offer
        </h2>
        <ul className="text-gray-700 mb-10 leading-relaxed text-left inline-block">
          <li>• Designer Jewelry (Gold Plated / Silver / Imitation)</li>
          <li>• Custom-made Jewelry</li>
          <li>• Bridal & Occasion Collections</li>
          <li>• Everyday Elegant Pieces</li>
          <li>• Affordable Luxury with Premium Quality</li>
        </ul>

        <h2 className="text-3xl font-semibold text-amber-700 mb-4">
          🌸 Why Choose Us
        </h2>
        <ul className="text-gray-700 mb-10 leading-relaxed text-left inline-block">
          <li>• 100% Anti-tarnish, Waterproof & Premium Finish</li>
          <li>• Trendy Yet Timeless Designs</li>
          <li>• Personalized Orders & Fast Delivery</li>
          <li>• Customer-Centric Approach</li>
          <li>• Based in Patna, Delivering PAN India</li>
        </ul>

        <h2 className="text-3xl font-semibold text-amber-700 mb-4">
          📞 Contact Us
        </h2>
        <p className="text-gray-700 leading-relaxed">
          📍 Patna, Bihar <br />
          📩{" "}
          <a
            href="mailto:meghajewelsgalore@gmail.com"
            className="text-amber-700 hover:underline"
          >
            meghajewelsgalore@gmail.com
          </a>{" "}
          <br />
          📱{" "}
          <a
            href="https://wa.me/916200597532"
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber-700 hover:underline"
          >
            +91 6200597532
          </a>{" "}
          <br />
          📸{" "}
          <a
            href="https://www.instagram.com/meghas_jewels_galore"
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber-700 hover:underline"
          >
            @meghas_jewels_galore
          </a>
        </p>
      </div>
    </div>
  );
};

export default About;
