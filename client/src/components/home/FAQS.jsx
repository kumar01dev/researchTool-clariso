import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";


const faqs = [
  {
    question: "What does this tool do?",
    answer:
      "It lets you analyze YouTube videos using AI — ask questions, summarize content, set reminders, and organize insights.",
  },
  {
    question: "Why use this instead of just watching videos?",
    answer:
      "Because it helps you understand and remember better by interacting with the content like a personal study assistant.",
  },
  {
    question: "How does it work?",
    answer:
      "You paste a video link → the tool fetches content → you can chat with the video, generate summaries, set reminders, and more.",
  },
  {
    question: "Do I need to sign up to use this tool?",
    answer:
      "Yes, you need to create an account to access features like asking AI, saving videos, and setting reminders.",
  },
  {
    question: "What makes it unique?",
    answer:
      "It gives you everything in one place — verify content with AI, save genuine videos, and set reminders to stay organized and focused.",
  },
];

export default function FAQS({ id }) {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(index === openIndex ? null : index);
  };

  return (
     <section id={id} className="bg-black border-white/10 border-[1px] rounded-md my-5 mx-8 py-8 mt-20 px-5 sm:px-6 lg:px-8"> 
      <div className="max-w-5xl mx-auto py-10 px-8 bg-black text-center " >
        {/* Header */}
        <div className="mb-10">
          <div className="inline-block mb-4 px-4 py-1.5 bg-gray-600 text-white text-sm font-semibold rounded-full shadow-sm">
            FAQ'S
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold text-white">
            Frequently Asked Questions
          </h2>
          <p className="my-10 text-gray-400 text-base sm:text-lg">
            Everything you need to know about using our tool.
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-5 text-left ml-2 mr-2">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border-b border-gray-700 pb-4"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center py-3 text-left"
              >
                <span className="text-white font-medium text-base sm:text-lg">
                  {faq.question}
                </span>
                <span className="text-white">
                  {openIndex === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </span>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? "max-h-[200px] mt-3" : "max-h-0"
                }`}
              >
                <p className="text-gray-400 text-sm sm:text-base leading-relaxed pr-2">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};