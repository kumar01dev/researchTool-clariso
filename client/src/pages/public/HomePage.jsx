import React, {useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../utlis/SupabaseClient';

import HeroSection from '../../components/home/HeroSection.jsx';
import Features from '../../components/home/Features.jsx';
import HowItWorks from '../../components/home/HowItWorks.jsx';
import FAQS from '../../components/home/FAQS.jsx';

function HomePage() {
  const navigate = useNavigate();
  
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate('/dashboard');
      }
    };

    checkSession();
  }, [navigate]);

    return (
      <div className='w-full bg-black flex justify-center items-center py-6  ' >
        <div className='min-h-screen max-w-6xl mx-2 my-4 bg-yellow- w-full rounded-sm px-2 py-4 lg:py-8 ' >

          <HeroSection />

          <Features id="features" />

          <HowItWorks />

          <FAQS id="faqs" />

        </div>
      </div>
    )
}

export default HomePage; 