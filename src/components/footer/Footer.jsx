import React from 'react'

function Footer() {
  return (
    <div>
      <div className='bg-gray-100 h-[70vh] flex flex-wrap items-center'>
        <div className="flex items-center w-[80vw] mx-auto h-[30%] w">
          <div className="bg-black text-white px-3 py-2 rounded-md">
            <span className="font-bold text-lg">CU</span>
          </div>
          <h1 className="text-2xl font-bold ml-4">Choice <br /> Up</h1>
        </div>
        <div className="flex justify-between items-center container mx-auto px-4  w-[80vw] h-[70%]]">
          <div className="flex justify-between space-x-8  w-full ">
            <div>
              <h2 className="text-xl font-bold">Company</h2>
              <ul className=" mt-4 font-light space-y-2">
                <li><a href="">About us</a></li>
                <li><a href="">Terms & conditions</a></li>
                <li><a href="">Privacy policy</a></li>
                <li><a href="">Anti-discrimination policy</a></li>
                <li><a href="">UC impact</a></li>
                <li><a href="">Careers</a></li>
              </ul>
            </div>
            <div>
              <h2 className="text-xl font-bold">For customers</h2>
              <ul className=" mt-4 font-light space-y-2">
                <li><a href="">UC reviews</a></li>
                <li><a href="">Categories near you</a></li>
                <li><a href="">Blog</a></li>
                <li><a href="">Contact us</a></li>
              </ul>
            </div>
            <div>
              <h2 className="text-xl font-bold space-y-2">For partners</h2>
              <p className="mt-4 font-light"><a href="">Register as a professional </a></p>
              <p className="mt-2 font-light"><a href="">Add Vendors </a></p>
            </div>

          </div>

          <hr />

        </div>

        

        <p className="text-left font-light text-gray-500 my-8 w-[80vw] mx-auto">&copy; Copyright 2024 Choice Up. All rights reserved. </p>
      </div>
    </div>
  )
}

export default Footer


