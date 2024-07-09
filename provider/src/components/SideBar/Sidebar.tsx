import React, { useState } from "react";

const Sidebar = () => {
  //   const [isMenuOpen, setIsMenuOpen] = useState(false);

  //   const toggleMenu = () => {
  //     setIsMenuOpen(!isMenuOpen);
  //   };

  // Dummy patient data
  const patient = {
    name: "John Doe",
    status: "Active",
    birthday: "1/9/2000",
    email: "johndoe@example.com",
    address: "123 Main St, Anytown, USA",
    phone: "(408)786-7563",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg", // Example avatar URL
    Caregiver: "Sally Chen",
  };

  return (
    <div className="h-screen bg-orange-50 text-black flex flex-col relative">
      {/* Sidebar
      <div
        className={`absolute top-0 left-0 h-full bg-orange-50 w-60 shadow-md ${
          isMenuOpen ? "block" : "hidden"
        }`}
      >
        <ul className="p-4">
          <li className="pt-6 pb-2 hover:text-gray-300">Add Patient</li>
          <li className="py-2 hover:text-gray-300">Add Medical Center</li>
          <li className="py-2 hover:text-gray-300">Add Provider</li>
          <li className="py-2 hover:text-gray-300">Add Support</li>
        </ul>
      </div> */}

      {/* Main Content */}
      <div className="flex flex-col p-4 ">
        {/* Hamburger Icon
        <div className="top-4 left-4 z-10 cursor-pointer" onClick={toggleMenu}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            )}
          </svg>
        </div> */}

        {/* Patient Information */}
        <div className="flex flex-col items-center  my-10">
          {/* Avatar */}
          <img
            src={patient.avatar}
            className="w-20 h-20 rounded-full mb-2"
            alt="Patient Avatar"
          />

          {/* Patient Details */}
          <div className="flex flex-col py-10 text-center">
            <p className="font-bold">{patient.name}</p>
            <div className="p-2 bg-green-800 text-white rounded-2xl">
              {patient.status}
            </div>
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex gap-4 items-center">
            <img src={"./birthday.svg"} className="w-8 h-8" />
            <span>{patient.birthday}</span>
          </div>

          <div className="flex gap-4 items-center">
            <img src={"./mail.svg"} className="w-8 h-8" />
            <span>{patient.email}</span>
          </div>

          <div className="flex gap-4 items-center">
            <img src={"./phone.svg"} className="w-8 h-8" />
            <span>{patient.phone}</span>
          </div>
          <div className="flex gap-4 items-center">
            <img src={"./address.svg"} className="w-8 h-8" />
            <span>{patient.address}</span>
          </div>
          <div className="flex gap-4 items-center">
            <img src={"./star.svg"} className="w-8 h-8" />
            <span>{patient.Caregiver}</span>
          </div>
        </div>
        {/* Additional Content */}
      </div>
    </div>
  );
};

export default Sidebar;
