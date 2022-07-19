import React, { useRef, useState } from "react";
import Seo from "../components/Seo";
import { useGlobalState } from "../hooks/useGlobalState";
import axios, { AxiosError, AxiosResponse } from 'axios'
import handleAxiosError from "../hooks/handleAxiosError";
import { MongooseAccountInterface } from "../interfaces/account";
import moment from "moment";
import { useRouter } from "next/router";

const Login = () => {
  const { state, setState } = useGlobalState();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const router = useRouter()

  const actions = async (e: React.FormEvent) => {
    e.preventDefault();
    if (emailRef.current && passwordRef.current) {
      axios.get("/api/accountHandler", {
        headers: {
          method: "login",
          email: emailRef.current.value,
          password: passwordRef.current.value,
        }
      }).then((response: AxiosResponse<MongooseAccountInterface>) => {
        setState({
          account: response.data,
          expiresOn: moment(Date()).add(24, 'hours').toString(),
          loggedIn: true
        });
        router.push("/account")
      }).catch((error: AxiosError<Error>) => handleAxiosError(error));
    }
  };

  return (
    <>
      <Seo />
      <section className="text-gray-400 body-font relative">
        <div className="container px-5 py-12 mx-auto">
          <div className="flex flex-col text-center w-full mb-2">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-white">
              Login
            </h1>
          </div>
          <form onSubmit={actions}>
            <div className="lg:w-1/2 md:w-2/3 mx-auto">
              <div className="flex flex-wrap -m-2">
                <div className="p-2 w-1/2">
                  <div className="relative">
                    <label className="leading-7 text-sm text-gray-400">
                      Email
                    </label>
                    <input
                      ref={emailRef}
                      type="email"
                      autoComplete="email"
                      required
                      className="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-indigo-500 focus:bg-gray-900 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                  </div>
                </div>
                <div className="p-2 w-1/2">
                  <div className="relative">
                    <label className="leading-7 text-sm text-gray-400">
                      Password
                    </label>
                    <input
                      ref={passwordRef}
                      type="password"
                      required
                      className="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-indigo-500 focus:bg-gray-900 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                  </div>
                </div>
                <div
                  className="p-2 w-full"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <button
                    className="mx-auto relative inline-flex items-center justify-center p-4 px-5 py-3 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out rounded-full shadow-xl group hover:ring-1 hover:ring-purple-500"
                  >
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-600 via-purple-600 to-pink-700"></span>
                    <span className="absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 transition duration-500 origin-bottom-left transform rotate-45 translate-x-24 bg-pink-500 rounded-full opacity-30 group-hover:rotate-90 ease"></span>
                    <span className="relative text-white poppins">Login</span>
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Login;
