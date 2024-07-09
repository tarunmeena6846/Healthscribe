// AddPatientForm.js

import React, { useState } from "react";

const AddPatientForm = () => {
  //   const [formData, setFormData] = useState({
  //     firstName: "",
  //     lastName: "",
  //     email: "",
  //     phoneNumber: "",
  //     dateOfBirth: "",
  //     address: "",
  //     referringProviderId: "", // Ensure you handle referring provider selection
  //   });

  //   const handleChange = (e) => {
  //     const { name, value } = e.target;
  //     setFormData((prevFormData) => ({
  //       ...prevFormData,
  //       [name]: value,
  //     }));
  //   };

  //   const handleSubmit = (e) => {
  //     e.preventDefault();
  //     // Handle form submission (e.g., send data to backend, create patient)
  //     console.log("Form submitted with data:", formData);
  //     // Add your logic to send form data to backend or update state accordingly
  //   };

  //   return (
  //     <div className="container mx-auto">
  //       <h1 className="text-2xl font-bold mt-4 mb-8">Add Patient</h1>
  //       <form onSubmit={handleSubmit} className="max-w-md mx-auto">
  //         <div className="grid grid-cols-2 gap-4">
  //           <div>
  //             <label
  //               htmlFor="firstName"
  //               className="block text-sm font-medium text-gray-700"
  //             >
  //               First Name
  //             </label>
  //             <input
  //               type="text"
  //               id="firstName"
  //               name="firstName"
  //               value={formData.firstName}
  //               onChange={handleChange}
  //               required
  //               className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
  //             />
  //           </div>
  //           {/* Add similar input fields for other form fields */}
  //         </div>

  //         <div className="mt-6">
  //           <button
  //             type="submit"
  //             className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
  //           >
  //             Add Patient
  //           </button>
  //         </div>
  //       </form>
  //     </div>

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    dateOfBirth: "",
    insurancePolicyNumber: "",
    gender: "",
    address: "",
    occupation: "",
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form Data:", formData);
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <h2 className="text-xl font-semibold text-center mb-6">Welcome</h2>
      <p className="text-center mb-12">Let us know more about the Patient</p>
      <form onSubmit={handleSubmit}>
        <h1 className="text-2xl mb-6">Personal Information</h1>
        <div className="mb-6">
          <label
            htmlFor="fullName"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            className="shadow-sm bg-gray-50 border border-gray-300 rounded-md w-full py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={formData.fullName}
            onChange={handleChange}
          />
        </div>
        <div className="mb-6 flex flex-wrap">
          <div className="md:w-1/2 px-2 mb-6 md:mb-0">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="shadow-sm bg-gray-50 border border-gray-300 rounded-md w-full py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="md:w-1/2 px-2 mb-6 md:mb-0">
            <label
              htmlFor="phoneNumber"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Phone number
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              className="shadow-sm bg-gray-50 border border-gray-300 rounded-md w-full py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="mb-6 flex flex-wrap">
          <div className="w-full md:w-1/2 px-2">
            <label
              htmlFor="dateOfBirth"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Date of birth
            </label>
            <input
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              className="shadow-sm bg-gray-50 border border-gray-300 rounded-md w-full py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={formData.dateOfBirth}
              onChange={handleChange}
            />
          </div>
          <div className="w-full md:w-1/2 px-2 mb-6 md:mb-0">
            <label
              htmlFor="gender"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Gender
            </label>
            <div className="flex items-center space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={formData.gender === "Male"}
                  onChange={handleChange}
                  className="form-radio border-gray-300"
                />
                <span className="ml-2">Male</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={formData.gender === "Female"}
                  onChange={handleChange}
                  className="form-radio"
                />
                <span className="ml-2">Female</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="Other"
                  checked={formData.gender === "Other"}
                  onChange={handleChange}
                  className="form-radio"
                />
                <span className="ml-2">Other</span>
              </label>
            </div>
          </div>
        </div>
        <div className="mb-6">
          <label
            htmlFor="address"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Address
          </label>
          <input
            type="text"
            id="address"
            name="address"
            className="shadow-sm bg-gray-50 border border-gray-300 rounded-md w-full py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={formData.address}
            onChange={handleChange}
          />
        </div>

        <h1 className="text-2xl mb-6">Medical Information</h1>
        <div className="mb-6 flex flex-wrap">
          <div className="md:w-1/2 px-2 mb-6 md:mb-0">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Allergies (if any)
            </label>
            <input
              type="text"
              id="allergies"
              name="email"
              className="shadow-sm bg-gray-50 border border-gray-300 rounded-md w-full py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="md:w-1/2 px-2 mb-6 md:mb-0">
            <label
              htmlFor="phoneNumber"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Medications
            </label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              className="shadow-sm bg-gray-50 border border-gray-300 rounded-md w-full py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="mb-6 flex flex-wrap">
          <div className="md:w-1/2 px-2 mb-6 md:mb-0">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Insurance number
            </label>
            <input
              type="text"
              id="allergies"
              name="email"
              className="shadow-sm bg-gray-50 border border-gray-300 rounded-md w-full py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="md:w-1/2 px-2 mb-6 md:mb-0">
            <label
              htmlFor="phoneNumber"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Medical Center
            </label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              className="shadow-sm bg-gray-50 border border-gray-300 rounded-md w-full py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="mb-6">
          <label
            htmlFor="address"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Care Team
          </label>
          <input
            type="text"
            id="address"
            name="address"
            className="shadow-sm bg-gray-50 border border-gray-300 rounded-md w-full py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={formData.address}
            onChange={handleChange}
          />
        </div>
        <div className="flex justify-center bg-green-500 items-center border-md rounded-md py-2">
          <button>Submit</button>
        </div>
      </form>
    </div>
  );
};

export default AddPatientForm;
