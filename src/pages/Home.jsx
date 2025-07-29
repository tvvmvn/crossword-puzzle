import { Link } from "react-router";
import Form from "../components/Form";
import db from "../db";
import { useState } from "react";

export default function Home() {
  
  const data = db[db.length-1]
  const [active, setActive] = useState(false)

  return (
    <>
      <h1 className="mt-8 text-2xl font-bold text-center">
        <code>K-Crossword Puzzle 🕯️</code> 
      </h1>

      <div className="flex justify-between mt-2">
        <Link 
          to="/archives" 
          className="p-2 font-semibold"
        >
          Archives
        </Link>
        <div id="dropdown-container" className="relative">
          <button 
            className="p-2 font-semibold cursor-pointer"
            onClick={() => setActive(!active)}
          >
            About
          </button>
          <div 
            className="w-80 px-4 absolute right-0 bg-white rounded-lg z-99"
            style={{ 
              boxShadow: "0 0 5px 5px #eee",
              display: active ? "block" : "none"
            }}
          >
            <img 
              className="my-4 w-20 h-20 object-cover rounded-full"
              src="profile.webp" 
              alt="" 
            />
            <p className="font-semibold">
              tvvmvn@gmail.com
            </p>
            <p className="my-4 text-gray-500">
              Hi there!   
              My name is Taemin and I am a web developer. 
              I made this puzzle to help those who is learning Korean and
              tried to put casual words in.
              Thank you for loving Korean and our culture!
              You can see more previous puzzles at <span className="">Archives</span>.
              Enjoy!
            </p>
          </div>
        </div>
      </div>

      <p 
        id="ribbon" 
        className="my-4 px-2 py-1 font-semibold bg-rose-800 text-white"
      >
        <i>
          Puzzle will be Updated on every Sunday! 
        </i>
      </p>

      <Form data={data} />

      <aside className="my-8">
        <div className="h-20 bg-gray-200 flex justify-center items-center">
          Advertise
        </div>
      </aside>
    </>
  )
}