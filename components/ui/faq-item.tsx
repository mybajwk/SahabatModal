import React, { useState } from "react";

// Define the props type
interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleFAQ = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-full mb-4">
      {/* Question */}
      <button
        onClick={toggleFAQ}
        className="flex justify-between items-center w-full bg-white text-black px-6 py-4 text-lg font-semibold rounded-full shadow-lg focus:outline-none"
      >
        <span>{question}</span>
        <span>{isOpen ? "▲" : "▼"}</span>
      </button>

      {/* Answer */}
      {isOpen && (
        <div className="bg-white text-black px-6 py-4 text-base rounded-lg mt-2 shadow-md">
          {answer}
        </div>
      )}
    </div>
  );
};

const FAQSection = () => {
  const faqs = [
    { question: "Pertanyaan 1", answer: "This is the answer to Pertanyaan 1." },
    { question: "Pertanyaan 2", answer: "This is the answer to Pertanyaan 2." },
    { question: "Pertanyaan 3", answer: "This is the answer to Pertanyaan 3." },
    { question: "Pertanyaan 4", answer: "This is the answer to Pertanyaan 4." },
  ];

  return (
    <section className="bg-gray-100 py-10">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold mb-8">Frequently Asked Questions</h2>
        {faqs.map((faq, index) => (
          <FAQItem key={index} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </section>
  );
};

export default FAQSection;
