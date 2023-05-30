import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const checkUser = () => {
      if(!localStorage.getItem('username')){
        navigate('/')
      }
    }
    checkUser()
  }, [navigate])


  const handleSignOut = () => {
    localStorage.removeItem('username')
    navigate('/')
  }

  return (
    <>
    <div className="relative overflow-hidden">
      <div className="bg-white pt-10 pb-14 sm:pt-16 lg:overflow-hidden lg:pt-24 lg:pb-24">
        <div className="mx-auto max-w-5xl lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8">
            <div className="mx-auto max-w-md px-4 text-center sm:max-w-2xl sm:px-6 lg:flex lg:items-center lg:px-0 lg:text-left">
              <div className="lg:py-24">
                <h1 className="mt-4 text-4xl font-bold tracking-tight text-black sm:mt-5 sm:text-6xl lg:mt-6 xl:text-6xl"><span className="block text-pink-500">Welcome </span><span className="block text-black">To Dashboard</span></h1>
                <p className="mt-3 text-base text-gray-400 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">You are successfully signed up within our page. Congrats!</p>
                <div className="mt-10 sm:mt-12">

                  <div className="sm:mx-auto sm:max-w-xl lg:mx-0">
                    <div className="sm:flex">
                      <div className="mt-3 sm:mt-0 sm:ml-3"><button type="submit" onClick={handleSignOut} className="block w-full rounded-md bg-pink-500 py-3 px-4 font-medium text-white shadow hover:bg-pink-400 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 focus:ring-offset-gray-900">Sign out</button></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-12 hidden lg:block"><img className="" src="https://user-images.githubusercontent.com/1884712/202186141-9f8a93e1-7743-459a-bc95-b1d826931624.png" alt="" /></div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Dashboard