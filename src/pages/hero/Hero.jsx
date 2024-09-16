import React, { useState, useEffect } from 'react';
import salon from "./assets/salon.png";
import makeup from "./assets/makeup.png"; 
import ac from './assets/ac.png'; 
import engineer from "./assets/engineer.png";
import sanitizer from './assets/sanitizer.png';
import paint from './assets/paint-roller.png';



function Hero() {

    
    // State to store the count fetched from the API
    const [clickCount, setClickCount] = useState(0);

    // Function to call the Count API
    // const fetchClickCount = async () => {
    //     try {
    //       // Use 'no-cors' mode if testing or set appropriate headers if possible
    //       const response = await fetch('https://api.countapi.xyz/hit/mysite.com/awesomeclick', {
    //         mode: 'no-cors',
    //       });
    //       console.log('Click count fetched:', response);
    //     } catch (error) {
    //       console.error('Error fetching click count:', error);
    //     }
    //   };

    // UseEffect to call the API when the component mounts
    // useEffect(() => {
    //     fetchClickCount();
    // }, []);


    return (
        
        <div>

            <div className='w-[80vw] mx-auto '>

                <div className="my-6 pt-5 flex justify-between ">

                    <div className="left w-[48%] ">
                        <div className='grid grid-cols-2 gap-2 '>
                            <img src="https://img.over-blog-kiwi.com/3/37/65/86/20190729/ob_cd645d_blog-01.jpg" className='object-fill size-72 rounded-lg' alt="beauty" />
                            <img src="https://www.royalmalemassage.com/wp-content/uploads/2023/08/Best-Male-Massage-Center.jpg" className='object-center size-72 rounded-lg' alt="massage" />
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFWhXb4gKTsgjhgPstnGPtoTaSJi0WLXbuVA&s" className='object-center size-72 rounded-lg' alt="chimney repair" />
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbT_wob0_vc5w0ZabqfwqzjGY0qYVvpXT5iQ&s" className='object-center size-72 rounded-lg' alt="ac repair" />
                        </div>
                    </div>


                    <div className="right w-[48%]">
                        <div className="p-4  rounded-lg ">
                            <h2 className="text-2xl font-bold mb-4">Bringing top-notch home services  <br /> straight to your door !</h2>
                            <div className='border rounded-lg space-y-3'>
                                <p className='ml-6 my-3 font-normal text-xl'>What are you seeking?</p>
                                <div className="grid grid-cols-3 gap-4   ">
                                    <div className="p-4 ">
                                        <img src={makeup} alt="Women's Salon & Spa" className="w-16 h-16 mx-auto mb-2  rounded-lg shadow-sm" />
                                        <p className="text-center text-gray-700 font-medium">Women's Salon & Spa</p>
                                    </div>
                                    <div className="p-4 ">
                                        <img src={salon} alt="Men's Salon & Massage" className="w-16 h-16 mx-auto mb-2  rounded-lg shadow-sm" />
                                        <p className="text-center text-gray-700 font-medium">Men's Salon & Massage</p>
                                    </div>
                                    <div className="p-4 ">
                                        <img src={ac} alt="AC & Appliance Repair" className="w-16 h-16 mx-auto mb-2  rounded-lg shadow-sm " />
                                        <p className="text-center text-gray-700 font-medium">AC & Appliance Repair</p>
                                    </div>
                                    <div className="p-4 ">
                                        <img src={sanitizer} alt="Cleaning & Pest Control" className="w-16 h-16 mx-auto mb-2  rounded-lg shadow-sm" />
                                        <p className="text-center text-gray-700 font-medium">Cleaning & Pest Control</p>
                                    </div>
                                    <div className="p-4 ">
                                        <img src={engineer} alt="Electrician, Plumber & Carpenter" className="w-16 h-16 mx-auto mb-2  rounded-lg shadow-sm" />
                                        <p className="text-center text-gray-700 font-medium">Electrician, Plumber & Carpenter</p>
                                    </div>
                                    <div className="p-4 ">
                                        <img src={paint} alt="Painting & Water proofing" className="w-16 h-16 mx-auto mb-2  rounded-lg shadow-sm" />
                                        <p className="text-center text-gray-700 font-medium">Painting & Water proofing</p>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <div className='my-12 flex items-center gap-20 '>
                    <div className='flex gap-2 items-center'>
                        <img src="https://res.cloudinary.com/urbanclap/image/upload/t_high_res_template,q_auto:low,f_auto/w_48,dpr_1,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/growth/home-screen/1693491890812-e86755.jpeg" alt="" />
                        <p>
                            <span> {clickCount} </span>
                            <br />
                            Users reached
                        </p>
                    </div>

                    <div className='flex gap-2 items-center'>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTmhrKNhGKm1017Rqi1iF6tRd_1OIH-afkBg&s" className='size-16' alt="target" />
                        <p>Our aim is to achieve <br /> 1L+ user</p>
                    </div>

                </div>
            

            </div>



        </div>
    )
}

export default Hero
