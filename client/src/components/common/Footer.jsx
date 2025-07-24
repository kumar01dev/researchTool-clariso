// import React from 'react';

// function Footer() {
//   return (
//   // {/* <footer className="bg-black text-gray-300 px-6 py-16  border- border-gray-800">
//   // <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8"> */}

//     <footer className="bg-black  my-5 mx-8 py-8 mt-12 px-5 sm:px-6 lg:px-8"> 
//       <div className="max-w-5xl mx-auto py-10 px-8 text-center flex-col lg:flex-row justify-center items-center gap-y-16 lg:gap-x-16" >

//         {/* Brand */}
//         <div>
//           <h2 className="text-2xl font-bold text-white">clariso.co.in</h2>
//           {/* <p className="text-sm text-white mt-2">Your trusted space to verify, save, and revisit YouTube content intelligently.</p> */}
//           <p className="text-sm text-white mt-2">The all-in-one trusted space.</p>

//           <span className="text-sm text-white " > support@clariso.co.in</span>
//         </div>

//         {/* Navigation */}
//         <div>
//           <h3 className="text-lg font-semibold text-white">Explore</h3>
//           <ul className="mt-2 space-y-1 text-white">
//             <li><a href="#features" className="hover:cursor-pointer hover:opacity-50">Features</a></li>
//             <li><a href="pricing" className="hover:cursor-pointer hover:opacity-50">Pricing</a></li>
//             <li><a href="/contact" className="hover:cursor-pointer hover:opacity-50">Contact</a></li>
//             <li><a href="#faqs" className="hover:cursor-pointer hover:opacity-50">FAQs</a></li>
//           </ul>
//         </div>

//         {/* Connect / Social */}
//         <div>
//           <h3 className="text-lg font-semibold text-white">Stay Connected</h3>
//           <ul className="mt-2 space-y-1 text-white " >
//             <li><a href="mailto:clariso.co.in" className="hover:cursor-pointer hover:opacity-50">Email Us</a></li>
//             <li><a href="#" className="hover:cursor-pointer hover:opacity-50">Twitter</a></li>
//             <li><a href="#" className="hover:cursor-pointer hover:opacity-50">LinkedIn</a></li>
//           </ul>
//         </div>

//       </div>

//       <div className="mt-10 text-center text-xs text-gray-500">
//         ©{new Date().getFullYear()} clariso. All rights reserved.
//       </div>

//     </footer>
//   );
// };

// export default Footer;











import React from 'react';
import {Link} from 'react-router-dom'

export default function Footer() {
  return (
    <footer className='bg-black text-white py-8 ' >
       {/* Main Content */}
      <div className="max-w-5xl mx-auto flex flex-col items-center text-center lg:flex-row lg:items-start lg:justify-between lg:text- gap-y-16 lg:gap-x-3 ">

        {/* Brand */}
        <div className="lg:max-w-sm space-y-2 ">
          <h2 className="text-2xl font-bold"> clariso </h2>
          <p className="text-sm text-gray-400 ">The all-in-one trusted space for learners.</p>
          <span className="text-sm text-gray-400 block mt-1">support@clariso.co.in</span>
        </div>

        {/* Explore */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Explore</h3>
          <ul className="space-y-2">
            <li><a href="#features" className="text-gray-400 hover:text-gray-600">Features</a></li>
            <li><a href="#faqs" className="text-gray-400 hover:text-gray-600">FAQs</a></li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Social</h3>
          <ul className="space-y-2">
            <li><a href="mailto:support@clariso.co.in" className="text-gray-400 hover:text-gray-600">Email Us</a></li>
            {/* <li><a href="#" className="text-gray-400 hover:text-gray-600">Twitter</a></li> */}
          </ul>
        </div>

        {/* Product Hunt badge (optional) */}
        {/* <div className="pt-4 lg:pt-0">
          <a href="#" className="inline-block border border-red-400 rounded-lg px-4 py-2 text-red-500 font-semibold hover:bg-red-50 transition-all">
            <div className="flex items-center gap-2">
              <span>🚀</span>
              <span>Product Hunt</span>
              <span className="text-xs">↑ 21</span>
            </div>
          </a>
        </div> */}

      </div>

      {/* Bottom Bar */}
      <div className="mt-12 border-t border-gray-800 pt-6 text-xs text-center text-gray-500 flex flex-col lg:flex-row justify-between max-w-7xl mx-auto px-4">
        <p>© {new Date().getFullYear()} clariso. All rights reserved.</p>
        <div className="mt-2 lg:mt-0 space-x-4">
          <Link to="/terms" className="hover:text-gray-300">Terms & Conditions</Link>
          {/* <a href="#" className="hover:text-gray-300">Refund Policy</a> */}
        </div>
      </div>
    </footer>
  );
};