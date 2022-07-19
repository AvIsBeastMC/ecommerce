/* eslint-disable @next/next/no-html-link-for-pages */
import React, { useState } from 'react'
import Link from 'next/link'
import NavLink, { NavLinkProps } from './NavLink'
import { useGlobalState } from '../hooks/useGlobalState'

const Navbar: React.FC = () => {
  const [mobileNavOpen, setMobileNavOpen] = useState(true)
  const {state, setState} = useGlobalState()

  const links: NavLinkProps[] = [
    { link: "/", title: "Home" },
    { link: "/login", title: "Login" },
    { link: "/signup", title: "Signup" }
  ]

  return (
    <>
      <nav className="shadow bg-gray-900">
        <div className="container px-6 py-4 mx-auto lg:flex lg:justify-between lg:items-center">
          <div className="lg:flex lg:items-center">
            <div className="flex items-center justify-between">
              <div>
                <a className="font-bold transition-colors duration-200 transform text-white text-2xl hover:text-gray-700 dark:hover:text-gray-300 poppins" href="#">Brand</a>
              </div>

              <div className="flex lg:hidden">
                <button onClick={() => setMobileNavOpen(!mobileNavOpen)} type="button" className="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400" aria-label="toggle menu">
                  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                    <path fillRule="evenodd" d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"></path>
                  </svg>
                </button>
              </div>
            </div>
            {mobileNavOpen ? (
              <div data-aos="fade-up" className="flex flex-col text-gray-400 capitalize lg:flex lg:px-16 lg:-mx-4 lg:flex-row lg:items-center">
                {links.map((link) => {
                  return (
                    <>
                      <NavLink key={link.title + link.link} title={link.title} link={link.link} />
                    </>
                  )
                }
                )}
              </div>
            ) : <h1 className='hidden'></h1>}
          </div>
          {state.loggedIn ? (
            <span className="text-gray-200 poppins">Welcome {state.account.name.split(" ")[0]}!</span>
          ) : <></>}
        </div>
      </nav>
    </>
  )
}

export default Navbar