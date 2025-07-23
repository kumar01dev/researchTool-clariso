import React, { useEffect, useState } from 'react';

import { useLayout } from '../../components/context/DashboardContext.jsx';

import PromptSection from '../../components/dashboard/PromptSection.jsx';
import AiFullChat from '../../components/dashboard/AiFullChat.jsx';
// import RecentlyVisited from '../../components/dashboard/RecentlyVisited.jsx';
// import UpcomingEvents from '../../components/dashboard/UpcomingEvents.jsx';


function DashboardHomePage() {
    const [greeting, setGreeting] = useState("");
    const { layout } = useLayout();

    useEffect(()=>{
        const hour = new Date().getHours();       
        if (hour >= 6 && hour < 12) setGreeting("Good Morning");
        else if (hour < 18) setGreeting("Good Afternoon");
        else setGreeting("Good Evening");
    }, []);


    return (
        <>
            <div className="w-full min-h-screen flex flex-col justify-center items-center bg-black text-white gap-4">
                {layout === "DashboardHomePage" ? (
                    <>
                        <h1 className="text-xl font-semibold " >{greeting} </h1>
                        <PromptSection />
                        {/* <RecentlyVisited />
                        <UpcomingEvents /> */}
                    </>
                    ) : (
                        <AiFullChat />
                    )}
            </div>
        </>
    );
};

export default DashboardHomePage;