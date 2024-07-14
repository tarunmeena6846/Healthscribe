import React from "react";

// Define your menu items in a configuration object
const menuItems = [
  { label: "Home", href: "#home", icon: "./home.svg" },
  { label: "Schedule", href: "#schedule", icon: "./schedular.svg" },
  { label: "Chat", href: "#chat", icon: "./chat.svg" },
  { label: "Forms", href: "#forms", icon: "./form.svg" },
  { label: "Tasks", href: "#tasks", icon: "./task.svg" },
  { label: "Care Plans", href: "#care-plans", icon: "./plan.svg" },
  { label: "Documents", href: "#documents", icon: "./ducment.svg" },
  { label: "Visit Notes", href: "/visit-notes", icon: "./visit.svg" },
  {
    label: "Prescriptions",
    href: "#prescriptions",
    icon: "./prescription.svg",
  },
  { label: "Labs", href: "#labs", icon: "./lab.svg" },
  { label: "Imaging", href: "#imaging", icon: "./imaging.svg" },
  {
    label: "Eligibility Checks",
    href: "#eligibility-checks",
    icon: "./eligiblity.svg",
  },
  { label: "Bills", href: "#bills", icon: "./bill.svg" },
  { label: "Fax", href: "#fax", icon: "./fax.svg" },
];
//hover:text-white hover:bg-green-500 hover:shadow-xl hover:border-black hover:border-t-4 hover:border-b-4 hover:border-r-4 hover:rounded-xl
const TopBar = () => {
  return (
    <div className="flex justify-between items-center border bg-orange-50">
      <div className="flex divide-x divide-gray-300 w-full">
        {menuItems.map((item, index) => (
          <a
            key={index}
            href={item.href}
            className="flex flex-1 items-center justify-center space-x-2 px-4 py-2 text-black transition-all duration-300 hover:bg-green-400"
          >
            <div className="flex flex-col items-center">
              <img src={item.icon} className="w-8 h-8" alt={item.label} />
              <span>{item.label}</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default TopBar;
