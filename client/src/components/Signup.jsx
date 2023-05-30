import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [tel, setTel] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const postSignUpDetails = () => {
    fetch("http://localhost:4000/api/register", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
        tel,
        username,
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
        alert(data.message)
        navigate("/")
      }
    })
    .catch((err) => console.error(err))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // call it within the submit function
    postSignUpDetails()
    setEmail("")
    setUsername("")
    setTel("")
    setPassword("")
  }

  const gotoSignInPage = () => navigate("/")

  return (
    <div className="flex items-center justify-center h-screen">
    <form className="min-w-fit flex-col border bg-white px-6 py-14 shadow-md rounded-[4px]" onSubmit={handleSubmit}>
      <div className="mb-8 flex justify-center">
        <img className="w-24" src="https://vitejs.dev/logo-with-shadow.png" alt="" />
      </div>
      <div className="flex flex-col text-sm rounded-md">
        <input className="mb-5 rounded-[4px] border p-3 hover:outline-none focus:outline-none hover:border-yellow-500 " type="text" placeholder="Email id" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input className="mb-5 rounded-[4px] border p-3 hover:outline-none focus:outline-none hover:border-yellow-500 " type="text" placeholder="Username" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <input className="mb-5 rounded-[4px] border p-3 hover:outline-none focus:outline-none hover:border-yellow-500 " type="tel" placeholder="Telephone" id="tel" name="tel" value={tel} onChange={(e) => setTel(e.target.value)} required />
        <input className="border rounded-[4px] p-3 hover:outline-none focus:outline-none hover:border-yellow-500" type="password" placeholder="Password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} minLength={8} required />
      </div>
      <button className="mt-5 w-full border p-2 bg-gradient-to-r from-gray-800 bg-gray-500 text-white rounded-[4px] hover:bg-slate-400 scale-105 duration-300" type="submit">Sign up</button>
      <div className="mt-5 flex justify-between text-sm text-gray-600">
        <label htmlFor="">Already have an account?</label>
        <a onClick={gotoSignInPage} className="hover:cursor-pointer">Sign in</a>
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

export default Signup