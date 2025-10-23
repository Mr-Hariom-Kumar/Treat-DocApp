import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from 'axios'
import Spiner from "../../../admin/src/components/Spiner";
import { useNavigate } from "react-router-dom";


const Login = () => {
  const [state, setState] = useState("sign up");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isAdmin,setisAdmin]=useState(false)

  const navigate=useNavigate()

  const { token, setToken, backendURL,loading,setLoading,userData,adminLoginURL } = useContext(AppContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (state === "sign up") {
          setLoading(true) 
          const { data } = await axios.post(backendURL + "/api/user/register", {
            name,
            email,
            password,
          });
        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
          setState("login")
          navigate('/login')
          toast.success("Account created successfully.Login here")
        } else {
          toast.error(data.message);
        }

      }else{
        setLoading(true) 
        const {data}=await axios.post(backendURL+'/api/user/login',{email,password})
        const userName=userData.name

        if(data.success){
          console.log(data)
          localStorage.setItem("token",data.token)
          setToken(data.token)
          navigate('/')
          toast.success(`logged in! Welcome ${userName}`)
        }else{
          toast.error(data.message)
        }

      }

  } catch (error) {
    console.log(error);
  }finally{
      setLoading(false) 
    }
  };
  // useEffect(()=>{
  //   if(token){
  //     navigate('/')
  //   }
  // },[token])

  return (

    <>
      {loading && (<Spiner/>)}
    <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center">
      
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96  rounded-xl text-zinc-900 text-sm shadow-2xl border border-zinc-300">
        <div className="flex justify-center items-center w-full">
            <div className="px-12 py-3 bg-gray-300 hover:bg-primary cursor-pointer hover:text-white font-medium rounded-tl-lg rounded-bl-lg">Patient</div>
            <a href={adminLoginURL}><div className="px-12 py-3 bg-gray-300 hover:bg-primary cursor-pointer hover:text-white font-medium  rounded-tr-lg rounded-br-lg">Admin</div></a>
                   
      </div>
        <p className="text-2xl font-semibold">
          {state === "sign up" ? "Create an account" : "Login"}
        </p>
        <p>
          Please {state === "sign up" ? "sign up" : "login"} here to book an
          appointment
        </p>

        {state === "sign up" && (
          <div className="w-full">
            <p>Full name</p>
            <input
              className="border border-zinc-700 rounded w-full p-2 mt-1"
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
            />
          </div>
        )}

        <div className="w-full">
          <p>Email</p>
          <input
            className="border border-zinc-700 rounded w-full p-2 mt-1"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </div>

        <div className="w-full">
          <p>Password</p>
          <input
            className="border border-zinc-700 rounded w-full p-2 mt-1"
            type="text"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
        </div>
        <button type="submit" className="bg-primary text-white w-full py-2 rounded-md text-base">
          {state === "sign up" ? "Create an account" : "Login"}
        </button>
        {state === "sign up" ? (
          <p>
            Already have an account?
            <span
              onClick={() => setState("login")}
              className="text-blue-700 cursor-pointer"
            >
              Login here
            </span>
          </p>
        ) : (
          <p>
            Create an new account?
            <span
              onClick={() => setState("sign up")}
              className="text-blue-700 cursor-pointer"
            >
              click here
            </span>
          </p>
        )}
      </div>
    </form>
    </>
  );
};


export default Login;
