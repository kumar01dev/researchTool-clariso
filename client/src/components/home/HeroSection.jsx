import React from 'react'
import { Link } from 'react-router-dom';


function HeroSection() {
  return (
    <div className='bg-black text-white py-8 px-2 sm:px-6 lg:px-8  ' > 
      <div className='my-2 lg:my-0  bg-black rounded-xl shadow-md'>

        <h2 className='text-center my-10 mx-4'>
            <span className=' text-xl px-4 py-2 text-center rounded-xl border-white border-[1px]'>
                ✦   Powered by Gemini 2.5 Flash
            </span>
        </h2>

        <h1 className='font-bold text-4xl lg:text-7xl my-2 text-center'>
          {/* The all-in-one space for <br className="hidden sm:block" /> content you can trust */}
          Understand. Organize. Revisit. Content made smart.
        </h1>
        <p className='text-gray-400  text-md lg:my-12 lg:text-xl my-10 text-center'>
          {/* Empowering you to verify, organize, and revisit <br /> content—tailored for curious minds and critical thinkers. */}
            Verify and revisit YouTube content you care about — all in one place.
        </p>

        <div className="flex justify-center mt-20">
          <Link 
            to="/login"
            className="bg-blue-500 text-white font-bold py-3 px-6 rounded-xl text-xl lg:text-2xl lg:px-7 hover:bg-opacity-60 transition">
            Get Started
          </Link>
        </div>

      </div>
    </div>
  );
}
export default HeroSection;