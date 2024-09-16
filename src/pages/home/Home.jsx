import React from 'react'
import Layout from '../../components/layout/Layout'
import Hero from '../hero/Hero'

function Home() {
    return (
        <Layout >

            <Hero />

            <div className='w-[80vw] mx-auto '>

                <div className="flex flex-col items-center my-14">
                    <div className='flex justify-between items-center mb-6 mt-6 w-full'>
                        <h1 className="text-3xl font-semibold ">Salon for Women</h1>
                        <button className=" border hover:bg-gray-100 text-blue-600 font-normal py-2 px-4 rounded-lg ">See all</button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-6 my-3">
                        <div className="bg-white rounded-lg border border-color: rgb(148 163 184); overflow-hidden">
                            <div className="p-4">
                                <h2 className="text-base font-normal mb-3">Cleanup</h2>
                                <img src="https://cureskin.com/wp-content/uploads/2021/06/AdobeStock_358942388-1024x760.jpeg" alt="Cleanup" className=" size-52 object-cover rounded-lg duration-700 hover:scale-105 " />
                            </div>
                        </div>
                        <div className="bg-white rounded-lg border border-color: rgb(148 163 184); overflow-hidden">
                            <div className="p-4">
                                <h2 className="text-base font-normal mb-3">Waxing</h2>
                                <img src="https://previews.123rf.com/images/microgen/microgen1604/microgen160402136/57149911-beautician-waxing-woman-s-arm-in-beauty-salon.jpg" alt="Waxing" className="size-52 object-cover rounded-lg duration-700 hover:scale-105" />
                            </div>
                        </div>
                        <div className="bg-white rounded-lg border border-color: rgb(148 163 184); overflow-hidden">
                            <div className="p-4">
                                <h2 className="text-base font-normal mb-3">Manicure</h2>
                                <img src="https://res.cloudinary.com/urbanclap/image/upload/t_high_res_template/w_231,dpr_1,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/supply/customer-app-supply/1717398005609-e19abc.jpeg" alt="Manicure" className="size-52 object-cover rounded-lg duration-700 hover:scale-105" />
                            </div>
                        </div>
                        <div className="bg-white rounded-lg border border-color: rgb(148 163 184); overflow-hidden">
                            <div className="p-4">
                                <h2 className="text-base font-normal mb-3">Hair care</h2>
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRslIZ0k8lZM_rikQo81aaK6bMWpR7mS4fnVw&s" alt="Hair care" className="size-52 object-cover rounded-lg duration-700 hover:scale-105" />
                            </div>
                        </div>
                        <div className="bg-white rounded-lg border border-color: rgb(148 163 184); overflow-hidden">
                            <div className="p-4">
                                <h2 className="text-base font-normal mb-3">Threading & Face waxing</h2>
                                <img src="https://media.istockphoto.com/id/177177852/photo/woman-on-facial-hair-removal-threading-procedure.jpg?s=612x612&w=0&k=20&c=H_Ojngs3D6SKquUtRQVBh2jc2oIhtQSWfiteQIujFn4=" alt="Threading & Face waxing" className="size-52 object-cover rounded-lg duration-700 hover:scale-105" />
                            </div>
                        </div>
                    </div>

                </div>

                <div className="flex flex-col items-center my-14">
                    <div className='flex justify-between items-center mb-6 mt-6 w-full'>
                        <h1 className="text-3xl font-semibold ">Spa for Women</h1>
                        {/* <button className=" border hover:bg-gray-100 text-blue-600 font-normal py-2 px-4 rounded-lg ">See all</button> */}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-6 my-3">

                        <div className="bg-white rounded-lg border border-color: rgb(148 163 184); overflow-hidden">
                            <div className="p-4">
                                <h2 className="text-base font-normal mb-3">Stress relief</h2>
                                <img src="https://www.shutterstock.com/shutterstock/videos/1096066291/thumb/1.jpg?ip=x480" alt="Cleanup" className=" size-52 object-cover rounded-lg duration-700 hover:scale-105 " />
                            </div>
                        </div>
                        <div className="bg-white rounded-lg border border-color: rgb(148 163 184); overflow-hidden">
                            <div className="p-4">
                                <h2 className="text-base font-normal mb-3">Pain relief</h2>
                                <img src="https://www.credihealth.com/media/pce156lf5gbbkrl7exsdplamef92/neck-massage-young-woman-relaxing-spa-salon-min" alt="Waxing" className="size-52 object-cover rounded-lg duration-700 hover:scale-105" />
                            </div>
                        </div>
                        <div className="bg-white rounded-lg border border-color: rgb(148 163 184); overflow-hidden">
                            <div className="p-4">
                                <h2 className="text-base font-normal mb-3">Natural skincare</h2>
                                <img src="https://media.istockphoto.com/id/1399469980/photo/close-up-portrait-of-anorganic-facial-mask-application-at-spa-salon-facial-treatment-skin.jpg?s=612x612&w=0&k=20&c=ZvZi_bdGLicsykUtlrHgQe70ftZzd_xPKvq2vzfOyV0=" alt="Manicure" className="size-52 object-cover rounded-lg duration-700 hover:scale-105" />
                            </div>
                        </div>

                    </div>

                </div>

                <div className='border w-full h-[60vh] my-20 bg-orange-200  opacity-95 duration-200 ease-in hover:scale-105'>

                    <div className='flex justify-between items-center gap-4'>

                        <div className="left space-y-10 px-9 opacity-80">
                            <p className='text-2xl font-normal'>MASSAGE <br /> FOR MEN</p>
                            <p className='text-3xl font-bold '> Indulge with <br /> Ayurvedic massage <br /> at home</p>
                            <button className='bg-black text-white rounded-md p-2 z-30'>Explore now</button>
                        </div>

                        <div className="right w-[60%] h-full py-4 px-6 ">
                            <img src="https://res.cloudinary.com/urbanclap/image/upload/t_high_res_template,q_auto:low,f_auto/w_600,dpr_2,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/growth/luminosity/1655116278986-7474ab.jpeg" className='w-[44vw] rounded-lg  mr-4' alt="" />
                        </div>


                    </div>

                </div>

                <div className="flex flex-col items-center my-14">
                    <div className='flex justify-between items-center mb-6 mt-6 w-full'>
                        <h1 className="text-3xl font-semibold ">Cleaning and Pest Control</h1>
                        <button className=" border hover:bg-gray-100 text-blue-600 font-normal py-2 px-4 rounded-lg ">See all</button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-6 my-3">

                        <div className="bg-white rounded-lg border border-color: rgb(148 163 184); overflow-hidden">
                            <div className="p-4">
                                <h2 className="text-base font-normal mb-3">Full Home Cleaning</h2>
                                <img src="https://media.istockphoto.com/id/164473354/video/mopping-the-hardwood-floor.jpg?s=640x640&k=20&c=vHkuJdsdkudVRvvbMK0LMB6VNHxzUAsJnvKytPAgOAw=" alt="Cleanup" className=" size-52 object-cover rounded-lg duration-700 hover:scale-105 " />
                            </div>
                        </div>
                        <div className="bg-white rounded-lg border border-color: rgb(148 163 184); overflow-hidden">
                            <div className="p-4">
                                <h2 className="text-base font-normal mb-3">Sofa & Carpet Cleaning</h2>
                                <img src="https://myhomey.in/blog/wp-content/uploads/2021/05/sofacarpet-cleaning.jpg" alt="Waxing" className="size-52 object-cover rounded-lg duration-700 hover:scale-105" />
                            </div>
                        </div>
                        <div className="bg-white rounded-lg border border-color: rgb(148 163 184); overflow-hidden">
                            <div className="p-4">
                                <h2 className="text-base font-normal mb-3"> General Pest Control</h2>
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxYIHhQoczvzxDeZT_18FnFM0fmkpd4mIUnw&s" alt="Manicure" className="size-52 object-cover rounded-lg duration-700 hover:scale-105" />
                            </div>
                        </div>
                        <div className="bg-white rounded-lg border border-color: rgb(148 163 184); overflow-hidden">
                            <div className="p-4">
                                <h2 className="text-base font-normal mb-3">Bathroom Cleaning</h2>
                                <img src="https://img.freepik.com/free-photo/woman-cleaning-sink-bathroom_23-2148465048.jpg" alt="Manicure" className="size-52 object-cover rounded-lg duration-700 hover:scale-105" />
                            </div>
                        </div>
                        <div className="bg-white rounded-lg border border-color: rgb(148 163 184); overflow-hidden">
                            <div className="p-4">
                                <h2 className="text-base font-normal mb-3">Kitchen Cleaning</h2>
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0bIAZp5qyJtSXt4WeUfzGWk8eUwlqcfxDOA&s" alt="Manicure" className="size-52 object-cover rounded-lg duration-700 hover:scale-105" />
                            </div>
                        </div>

                    </div>

                </div>

                <div className="flex flex-col items-center my-14">
                    <div className='flex justify-between items-center mb-6 mt-6 w-full'>
                        <h1 className="text-3xl font-semibold ">AC and Appliance Repair</h1>
                        <button className=" border hover:bg-gray-100 text-blue-600 font-normal py-2 px-4 rounded-lg ">See all</button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-6 my-3">

                        <div className="bg-white rounded-lg border border-color: rgb(148 163 184); overflow-hidden">
                            <div className="p-4">
                                <h2 className="text-base font-normal mb-3">AC Repair & Service</h2>
                                <img src="https://webtk.sfastservices.com/blogimg/split-ac-service%20Sfastservices.jpg" alt="Cleanup" className=" size-52 object-cover rounded-lg duration-700 hover:scale-105 mt-9" />
                            </div>
                        </div>
                        <div className="bg-white rounded-lg border border-color: rgb(148 163 184); overflow-hidden">
                            <div className="p-4">
                                <h2 className="text-base font-normal mb-3">Washing Machine Repair</h2>
                                <img src="https://www.serviceonwheel.com/uploads/service/249261584075397.jpg" alt="Waxing" className="size-52 object-cover rounded-lg duration-700 hover:scale-105 mt-9" />
                            </div>
                        </div>
                        <div className="bg-white rounded-lg border border-color: rgb(148 163 184); overflow-hidden">
                            <div className="p-4">
                                <h2 className="text-base font-normal mb-3"> Water Purifier & Repair Service</h2>
                                <img src="https://www.aquapuresystem.in/wp-content/uploads/2023/11/Aqua-Guard-Water-Purifier-Services.jpg" alt="Manicure" className="size-52 object-cover rounded-lg duration-700 hover:scale-105" />
                            </div>
                        </div>
                        <div className="bg-white rounded-lg border border-color: rgb(148 163 184); overflow-hidden">
                            <div className="p-4">
                                <h2 className="text-base font-normal mb-3">Refrigerator Repair</h2>
                                <img src="https://media.istockphoto.com/id/1088965226/photo/partial-view-of-repairman-in-working-overall-fixing-refrigerator-by-screwdriver-in-kitchen.jpg?s=612x612&w=0&k=20&c=jB8_keIkYKJxDFFsV8NR8JuCWywD46HDhyXC02clYlE=" alt="Manicure" className="size-52 object-cover rounded-lg duration-700 hover:scale-105 mt-9" />
                            </div>
                        </div>
                        <div className="bg-white rounded-lg border border-color: rgb(148 163 184); overflow-hidden">
                            <div className="p-4">
                                <h2 className="text-base font-normal mb-3">Geyser Repair & Service</h2>
                                <img src="https://www.urbanrepairing.in/wp-content/uploads/2021/04/Layer-1.jpg" alt="Manicure" className="size-52 object-cover rounded-lg duration-700 hover:scale-105 mt-9" />
                            </div>
                        </div>

                    </div>

                </div>

                <div className="flex flex-col items-center my-14">
                    <div className='flex justify-between items-center mb-6 mt-6 w-full'>
                        <h1 className="text-3xl font-semibold ">Massage for Men</h1>
                        {/* <button className=" border hover:bg-gray-100 text-blue-600 font-normal py-2 px-4 rounded-lg ">See all</button> */}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-6 my-3">

                        <div className="bg-white rounded-lg border border-color: rgb(148 163 184); overflow-hidden">
                            <div className="p-4">
                                <h2 className="text-base font-normal mb-3">Pain Relief</h2>
                                <img src="https://res.cloudinary.com/urbanclap/image/upload/t_high_res_template/w_231,dpr_1,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/supply/customer-app-supply/1700135813754-417df5.jpeg" alt="Cleanup" className=" size-52 object-cover rounded-lg duration-700 hover:scale-105 mt-9" />
                            </div>
                        </div>
                        <div className="bg-white rounded-lg border border-color: rgb(148 163 184); overflow-hidden">
                            <div className="p-4">
                                <h2 className="text-base font-normal mb-3">Stress Relief</h2>
                                <img src="https://res.cloudinary.com/urbanclap/image/upload/t_high_res_template/w_231,dpr_1,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/supply/customer-app-supply/1700135826199-2ae5f2.jpeg" alt="Waxing" className="size-52 object-cover rounded-lg duration-700 hover:scale-105 mt-9" />
                            </div>
                        </div>
                        <div className="bg-white rounded-lg border border-color: rgb(148 163 184); overflow-hidden">
                            <div className="p-4">
                                <h2 className="text-base font-normal mb-3"> Post Workout</h2>
                                <img src="https://res.cloudinary.com/urbanclap/image/upload/t_high_res_template/w_231,dpr_1,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/supply/customer-app-supply/1700135829701-85b36c.jpeg" alt="Manicure" className="size-52 object-cover rounded-lg duration-700 hover:scale-105 mt-9" />
                            </div>
                        </div>


                    </div>

                </div>

            </div>

        </Layout>
    )
}

export default Home
