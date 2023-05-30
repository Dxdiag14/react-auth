import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const postLoginDetails = () => {
    fetch("http://localhost:4000/api/login", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => res.json())
    .then((data) => {
      if (data.error_message) {
        alert(data.error_message)
      } else {
        // logs the username to the console
        console.log(data.data)
        // save the username to the local storage
        localStorage.setItem("username", data.data.username)
        // navigates to the 2fa route
        navigate('/phone/verify')
      }
    })
    .catch((err) => console.error(err))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // calls the function
    postLoginDetails()
    setEmail("")
    setPassword("")
  }

  const gotoSignUpPage = () => navigate('/register')

  return (
        <div className="flex items-center justify-center h-screen">
          <form className="min-w-fit flex-col border bg-white px-6 py-14 shadow-md rounded-[4px]" onSubmit={handleSubmit}>
            <div className="mb-8 flex justify-center">
              <img className="w-24" src="https://vitejs.dev/logo-with-shadow.png" alt="" />
            </div>
            <div className="flex flex-col text-sm rounded-md">
              <input className="mb-5 rounded-[4px] border p-3 hover:outline-none focus:outline-none hover:border-yellow-500 " type="text" placeholder="Username or Email id" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              <input className="border rounded-[4px] p-3 hover:outline-none focus:outline-none hover:border-yellow-500" type="password" placeholder="Password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} minLength={8} required />
            </div>
            <button className="mt-5 w-full border p-2 bg-gradient-to-r from-gray-800 bg-gray-500 text-white rounded-[4px] hover:bg-slate-400 scale-105 duration-300" type="submit" >Sign in</button>
            <div className="mt-5 flex justify-between text-sm text-gray-600">
              <label htmlFor="">Still no account?</label>
              <a onClick={gotoSignUpPage} className="hover:cursor-pointer">Sign up</a>
            </div>
            <div className="mt-5 flex text-center text-sm text-gray-400">
              <p>
                This site is protected by reCAPTCHA and the Google <br />
                <a className="underline" href="">Privacy Policy</a>  and <a className="underline" href="">Terms of Service</a>  apply.
              </p>
            </div>
          </form>
          </div>
  )
}

export default Login