import React from "react";

import FAQCard from "./FAQCard";

function FAQ() {
  const faqData = [
    {
      question: "What is Lorem Ipsum?",
      answer:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
    {
      question: "Why use Lorem Ipsum?",
      answer:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
    },
    {
      question: "Where does it come from?",
      answer:
        "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.",
    },
    {
      question: "How many variations exist?",
      answer:
        "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.",
    },
    {
      question: "Where can I get some?",
      answer:
        "There are many websites on the Internet that provide Lorem Ipsum passages, and many variants of the text can be found by performing a simple search.",
    },
  ];

  return (
    <div className="p-6 w-full font-lexend flex flex-col space-y-4 items-center">
      <h1 className="font-bold text-white drop-shadow-text-white md:text-2xl md:mb-4">
        Frequently Asked Question
      </h1>
      {faqData.map((item, index) => (
        <FAQCard key={index} question={item.question} answer={item.answer} />
      ))}
    </div>
  );
}

export default FAQ;
