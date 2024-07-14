import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router";

const questions = [
  { id: 1, question: "Enter Organiztion name" },
  { id: 2, question: "Set up email" },
  { id: 3, question: "Set up Phone number" },
  { id: 4, question: "What is your speciality?" },
  { id: 5, question: "Set up Medical Centers" },
];

const Questionnaire = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();

  const handleAnswerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnswers({
      ...answers,
      [currentQuestionIndex]: e.target.value,
    });
  };

  const handleNextQuestion = async () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Handle form submission or completion
      console.log("Form submitted:", answers[4]);
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_SERVER_URL}/org/create-organization`,
          {
            name: answers[0],
            email: answers[1],
            phone: answers[2],
            specialty: answers[3],
            medicalCenters: answers[4], // Medical Centers (comma-separated list)
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-type": "application/json",
            },
          }
        );
        console.log(response);
        if (response.status === 201) {
          console.log(response.organization);
          navigate("/dashboard");
        } else {
          alert("Error while submitting form");
        }
      } catch (err) {
        alert("Server Error");
      }
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="flex flex-col justify-top h-screen bg-gray-100">
      <div className="w-full text-center mt-20">
        <h2 className="text-3xl text-bold my-4">Organization Form</h2>
      </div>
      <div className="p-10 flex justify-left max-w-6xl">
        <motion.div
          key={currentQuestion.id}
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.5 }}
          className="my-10 flex flex-col grow"
        >
          {/* <div className="my-10 grow"> */}
          <div className="flex gap-2">
            {/* <div className="flex "> */}
            <h1 className="p-1 text-xl">{currentQuestion.id} </h1>
            <img src="./arrow-right.svg" className="pb-5"></img>
            {/* </div> */}
            <label className="block text-3xl mb-6 text-center">
              {currentQuestion.question}
            </label>
          </div>
          <input
            type="text"
            value={answers[currentQuestionIndex] || ""}
            onChange={handleAnswerChange}
            placeholder="Enter your answer..."
            className="w-full max-w-3xl p-4 border-b-2 border-gray-300  bg-gray-100 outline-none focus:border-gray-800 text-xl"
          />
          <div className="mt-8 flex justify-left pl-5">
            <button
              onClick={handleNextQuestion}
              className="px-6 py-3 border border-gray-500 text-gray-500 rounded-lg hover:bg-gray-500 hover:text-white transition duration-300 ease-in-out shadow-xl text-xl"
            >
              {currentQuestionIndex < questions.length - 1 ? "Next" : "Submit"}
            </button>
          </div>
          {/* </div> */}
        </motion.div>
      </div>
    </div>
  );
};

export default Questionnaire;
