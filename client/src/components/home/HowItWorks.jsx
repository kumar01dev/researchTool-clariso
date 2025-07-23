import React from 'react';


function HowItWorks() {
    const working = [
        {
            title:"Add Youtube Video ",
            summary:"Simply paste the URL of a video into the platform  ",
            icon:" "
        },
        {
            title:"Verify & Explore ",
            summary:"Our AI analyzes the content, answer your questions, and verify its authenticity. ",
            icon:" "
        },
        {
            title:"Organize & Set Reminders ",
            summary:"Categorize your content, set reminders, and track your learning progress. ",
            icon:" "
        },
        {
            title:"Resume Anytime ",
            summary:"Save your spot and return to your videos whenever you're ready."
        },
    ]

    return (
        <section className="bg-black border-white/10 border-[1px] rounded-md my-5 mx-8 py-8 mt-20 px-5 sm:px-6 lg:px-8"> 
            <div className="max-w-5xl mx-auto py-10 px-8 bg-black text-center " >    
                <div className="text-center mb-10">
                    <div className="inline-block mb-6 px-5 py-1.5 bg-gray-600 text-white text-sm font-semibold rounded-full shadow-sm">
                        How it Works
                    </div>
                    <h2 className="text-3xl text-white sm:text-4xl font-bold">Our Simple, Smart <br className="hidden sm:block" />
                       and Scalable Process
                    </h2>
                    <p className="my-10 text-gray-400 text-base sm:text-lg ">
                        "Smart, scalable tools to help you understand <br className='lg:hidden'/> and revisit content effortlessly.”
                    </p>
                </div>

                <div className="bg-black  grid gap-10 lg:gap-14 md:grid-cols-2 py-2 my-6 ">
                    {working.map((feature, index) => (
                        <div key={index} className="bg-zinc-900 rounded-xl p-6 shadow-sm hover:shadow-md transition">
                            <div> {feature.icon} </div>
                            <h3 className="text-xl font-bold text-gray-200 mb-2">
                                {feature.title}
                            </h3>
                            <p className="text-sm text-gray-400">{feature.summary}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default HowItWorks;