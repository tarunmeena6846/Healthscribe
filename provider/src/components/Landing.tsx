import React from "react";

const Landing: React.FC = () => {
  return (
    <div className="h-full bg-white antialiased font-sans">
      <header className="bg-blue-600 text-white">
        <div className="container mx-auto flex items-center justify-between p-4">
          <a href="/" className="text-3xl font-bold">
            avon
          </a>
          <nav className="hidden md:flex space-x-4">
            <div className="relative group">
              <button className="text-sm font-semibold hover:text-gray-300">
                Products
              </button>
              <div className="absolute left-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <a
                  href="/product1"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Product 1
                </a>
                <a
                  href="/product2"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Product 2
                </a>
              </div>
            </div>
            <div className="relative group">
              <button className="text-sm font-semibold hover:text-gray-300">
                Developers
              </button>
              <div className="absolute left-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <a href="/docs" className="block px-4 py-2 hover:bg-gray-100">
                  Docs
                </a>
                <a href="/api" className="block px-4 py-2 hover:bg-gray-100">
                  API
                </a>
              </div>
            </div>
            <div className="relative group">
              <button className="text-sm font-semibold hover:text-gray-300">
                Resources
              </button>
              <div className="absolute left-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <a href="/blogs" className="block px-4 py-2 hover:bg-gray-100">
                  Blogs
                </a>
                <a
                  href="/community"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Community
                </a>
              </div>
            </div>
            <a
              href="/pricing"
              className="text-sm font-semibold hover:text-gray-300"
            >
              Pricing
            </a>
          </nav>
          <button className="md:hidden text-gray-700 p-2">
            <svg
              className="h-8 w-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </div>
      </header>

      <main className="container mx-auto p-4">
        <section className="my-8">
          <h1 className="text-4xl font-bold mb-4">
            Powering next-gen healthcare
          </h1>
          <p className="mb-4">
            Welcome to Avon Health, your partner in advanced healthcare
            solutions. We strive to provide top-notch services and products to
            enhance the well-being of individuals and communities worldwide.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-100 rounded-md shadow-md">
              <h2 className="text-2xl font-semibold mb-2">Our Services</h2>
              <p>
                We offer a wide range of services including telehealth
                consultations, medical research, and personalized healthcare
                plans.
              </p>
            </div>
            <div className="p-4 bg-gray-100 rounded-md shadow-md">
              <h2 className="text-2xl font-semibold mb-2">Our Products</h2>
              <p>
                Explore our innovative products designed to improve health
                outcomes, from wearable devices to health monitoring software.
              </p>
            </div>
          </div>
        </section>
        <section className="my-8">
          <h2 className="text-3xl font-bold mb-4">Why Choose Us?</h2>
          <ul className="list-disc pl-5">
            <li className="mb-2">
              Cutting-edge technology to deliver the best healthcare solutions.
            </li>
            <li className="mb-2">
              A dedicated team of professionals committed to your health.
            </li>
            <li className="mb-2">
              Personalized healthcare plans tailored to your needs.
            </li>
            <li className="mb-2">
              24/7 support to assist you anytime, anywhere.
            </li>
          </ul>
        </section>
      </main>

      <footer className="bg-gray-800 text-white p-4">
        <div className="container mx-auto text-center">
          <p>© 2024 Avon Health. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
