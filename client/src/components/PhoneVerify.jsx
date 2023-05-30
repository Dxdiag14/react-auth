import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const PhoneVerify = () => {
  const [code, setCode] = useState("")
  const navigate = useNavigate()

  const postVerification = async () => {
    fetch("http://localhost:4000/api/verification", {
        method: "POST",
        body: JSON.stringify({
            code,
        }),
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((res) => res.json())
        .then((data) => {
            if (data.error_message) {
                alert(data.error_message);
            } else {
                //👇🏻 Navigates to the dashboard page
                navigate("/dashboard");
            }
        })
        .catch((err) => console.error(err));
};

  const handleSubmit = (e) => {
    e.preventDefault()
    // Calls the function
    postVerification();
    setCode("")
    navigate('/dashboard')
  }

  return (
    <div className="flex items-center justify-center h-screen">
    <form className="min-w-fit flex-col border bg-white px-6 py-14 shadow-md rounded-[4px]" onSubmit={handleSubmit}>
      <div className="mb-8 flex justify-center">
        <img className="w-24" src="https://www.pngall.com/wp-content/uploads/4/Cyber-Security-Logo-PNG.png" alt="" />
      </div>
      <div className="my-5 flex justify-center text-sm text-gray-400">
        <p>
          A code has been sent to your phone <br />
        </p>
      </div>
      <div className="flex flex-col text-sm rounded-md">
        <input className="rounded-[4px] border p-3 hover:outline-none focus:outline-none hover:border-yellow-500 " type="text" placeholder="Enter OTP" id="otp" name="otp" value={code} onChange={(e) => setCode(e.target.value)} required />
      </div>
      <button className="mt-5 w-full border p-2 bg-gradient-to-r from-gray-800 bg-gray-500 text-white rounded-[4px] hover:bg-slate-400 scale-105 duration-300" type="submit" >Authenticate</button>
    </form>
    </div>
  )
}

export default PhoneVerify