import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
const Footer = () => {
  const navigate=useNavigate()
  return (
    <div className="md:mx-10">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        {/* left */}
        <div>
          <img className="mb-5 w-40" src={assets.logo2} alt="" />
          <p className="w-full md:w-2/3 text-gray-600 leading-6 ">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nam amet
            beatae molestiae voluptatibus provident. Delectus minima omnis minus
            ex impedit illo rerum ipsa rem, obcaecati unde reiciendis ad cum
            doloremque.
          </p>
        </div>
        {/* center */}
        <div>
          <p className="text-sm font-medium mb-5">COMPANY</p>
          <ul className="text-gray-600 flex flex-col gap-2">
            <li className="cursor-pointer" onClick={()=>{navigate('/')}}>Home</li>
            <li className="cursor-pointer" onClick={()=>{navigate('/about')}}>About us</li>
            <li className="cursor-pointer" onClick={()=>{navigate('/contact')}}>Contact us</li>
            <li className="cursor-pointer" onClick={()=>{navigate('/privacy')}}>Privacy Policy</li>
          </ul>
        </div>
        {/* right */}
        <div>
          <p className="text-sm font-medium mb-5">GET IN TOUCH</p>
          <ul className="text-gray-600 flex flex-col gap-2">
            <li>+91 123-456-7890</li>
            <li>Treat.@gmail.com</li>
          </ul>
        </div>
      </div>
      <div>
        <hr />
        <p className="py-5 text-sm text-center">Copyright 2025@ Treat.-All Right Reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
