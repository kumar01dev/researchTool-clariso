import React from 'react';
import { FaVideo } from "react-icons/fa6";
import { FaNoteSticky } from "react-icons/fa6";
import { TbPlayerTrackNextFilled } from "react-icons/tb";
import { FaBell } from "react-icons/fa6";


function Features({id}) {
  const allFeatures = [
    {
      icon: <FaVideo />,
      title: 'AI-Powered Content Analysis',
      summary: "Verify content authenticity using advanced AI analysis and get reliable answers to support your learning and research. " 
    },
    {
      icon: <FaNoteSticky />,
      title: 'Research Library',
      summary: 'Save and organise all your research in one place with our platform to excel your learning.'
    },
    {
      icon: <TbPlayerTrackNextFilled />,
      title: 'Seamless Progress Tracking',
      summary: 'Save your watch progress with timestamps—pick up exactly where you left off, every time. '
    },
    {
      icon: <FaBell />,
      title: 'Set reminders to revisit it',
      summary: 'Set customizable reminders to revisit saved content, rewatch content to continue your learning .'
    },
  ];

  return (
    <section id={id} className="bg-black border-white/10 border-[1px] rounded-md my-5 mx-8 py-7 mt-20 px-5 sm:px-6 lg:px-8  ">
      <div className="max-w-5xl mx-auto py-10 px-8 bg-black text-center">
            <div className="text-center mb-10">-
                <div className="inline-block mb-6 px-5 py-1.5 bg-gray-600 text-white text-sm font-semibold rounded-full shadow-sm">
                    Features
                </div>
                <h2 className="text-2xl text-white sm:text-4xl font-bold">Unlock Limitless Creativity <br className="hidden sm:block" />
                    with Powerful AI Features</h2>
                <p className="my-10 text-gray-400 text-base sm:text-lg ">
                    "Set reminders to revisit and retain what you learned."
                </p>
            </div>

            <div className="bg-black grid gap-10 lg:gap-14 md:grid-cols-2 py-2">
                {allFeatures.map((feature, index) => (
                    <div key={index} className=" rounded-xl p-6 shadow-sm bg-zinc-900 hover:shadow-md transition">
                        <div className='text-white'> {feature.icon} </div>
                        <h3 className="text-xl font-bold text-gray-200 mb-1">
                            {feature.title}
                        </h3>
                        <p className="text-md  text-gray-400">{feature.summary}</p>
                    </div>
                ))}
            </div>
        </div>
    </section>
  );
}

export default Features;