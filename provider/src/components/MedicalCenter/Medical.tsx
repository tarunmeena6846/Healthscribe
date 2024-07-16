import { useState } from "react";

const Medical = () => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    dateOfBirth: "",
    patients: [],
    providers: [],
    support: [],
  });

  const handleChange = (event: any) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log("Form Data:", formData);
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <p className="text-center mb-12 text-2xl">Medical Center Form</p>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label
            htmlFor="fullName"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="shadow-sm bg-gray-50 border border-gray-300 rounded-md w-full py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={formData.name}
            onChange={handleChange}
          />
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

        <div className="mb-6 flex flex-wrap">
          <label
            htmlFor="patients"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Patients
          </label>
          <input
            type="text"
            id="allergies"
            name="patients"
            className="shadow-sm bg-gray-50 border border-gray-300 rounded-md w-full py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={formData.patients}
            onChange={handleChange}
          />
        </div>

        <div className="mb-6 flex flex-wrap">
          <div className="md:w-1/2 px-2 mb-6 md:mb-0">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Care Team
            </label>
            <input
              type="text"
              id="allergies"
              name="providers"
              className="shadow-sm bg-gray-50 border border-gray-300 rounded-md w-full py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={formData.providers}
              onChange={handleChange}
            />
          </div>
          <div className="md:w-1/2 px-2 mb-6 md:mb-0">
            <label
              htmlFor="phoneNumber"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Support
            </label>
            <input
              type="text"
              id="phoneNumber"
              name="support"
              className="shadow-sm bg-gray-50 border border-gray-300 rounded-md w-full py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={formData.support}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex justify-center bg-green-500 items-center border-md rounded-md py-2">
          <button>Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Medical;
