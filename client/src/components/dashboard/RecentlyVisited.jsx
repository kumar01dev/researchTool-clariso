import React from 'react'

function RecentlyVisited() {
    
    
    return (
        <div className='w-full max-w-4xl mx-auto px-5 py-12 bg-red-500  '>

            {/* <div className='bg-green-300 w-[90%] h-[90%] m-1 border-black border-[2px]'> */}
                <h2 className='py-2 text-start pl-2 '>Recently Visited</h2>
                <div className='bg-black h-[95%] flex justify-evenly items-center gap-2 ' >

                    {/* cards of recently visited */}
                     <div className='bg-pink-300 h-28 w-32 rounded-md '>
                        icon  1
                        title 1 
                     </div>
                     <div className='bg-pink-300 h-28 w-32 rounded-md '>
                        icon  1
                        title 1 
                     </div>
                     <div className='bg-pink-300 h-28 w-32 rounded-md '>
                        icon  1
                        title 1 
                     </div>
                     <div className='bg-pink-300 h-28 w-32 rounded-md '>
                        icon  1
                        title 1 
                     </div>
                    

                </div>
            {/* </div> */}
        </div>
    )
}

export default RecentlyVisited;