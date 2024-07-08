import React, { useState } from "react";
import { motion } from "framer-motion";
import AnimatedInput from "./AnimatedInputs";

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

  const handleAnswerChange = (e) => {
    setAnswers({
      ...answers,
      [currentQuestionIndex]: e.target.value,
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Handle form submission or completion
      console.log("Form submitted:", answers);
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="flex flex-col items-center justify-top h-screen bg-gray-100">
      <div className="w-full text-center mt-20">
        <h2 className="text-5xl  text-bold my-4">Create Organisation</h2>
      </div>
      <div className="p-4 w-full max-w-lg rounded">
        <motion.div
          key={currentQuestion.id}
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.5 }}
        >
          <div className="my-10">
            <label className="block text-7xl mb-6 text-center">
              {currentQuestion.question}
            </label>
            <input
              type="text"
              value={answers[currentQuestionIndex] || ""}
              onChange={handleAnswerChange}
              placeholder="Enter your answer..."
              className="w-full p-4 border-b-2 border-gray-300 rounded-lg outline-none focus:border-gray-800 text-xl"
            />
            <div className="mt-8 flex justify-center">
              <button
                onClick={handleNextQuestion}
                className="px-6 py-3 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-500 hover:text-white transition duration-300 ease-in-out shadow-xl text-xl"
              >
                {currentQuestionIndex < questions.length - 1 ? "->" : "Submit"}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Questionnaire;
