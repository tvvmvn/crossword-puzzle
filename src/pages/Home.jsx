import { Link } from "react-router";
import Form from "../components/Form";
import db from "../db";
import { useState } from "react";

export default function Home() {
  
  const data = db.find(item => item.id == "p0")

  const [active, setActive] = useState(false)

  return (
    <>
      <h1 className="mt-8 text-2xl font-bold text-center text-emerald-700">
        K-Crossword Puzzle
      </h1>

      <div className="flex justify-between my-4">
        <Link 
          to="/archives" 
          className="p-2 font-semibold"
        >
          Archives
        </Link>
        <div id="dropdown-container" className="relative">
          <button 
            className="font-semibold p-2 cursor-pointer"
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
            <p className="text-emerald-700">
              tvvmvn@gmail.com
            </p>
            <p className="my-4">
              Hi there!   
              My name is Taemin and I am a web developer. 
              I made this puzzle to help those who is learning Korean.
              Thank you for loving Korean and our culture!
              You can see more previous puzzles at <span className="">Archives</span>.
              Enjoy!
            </p>
          </div>
        </div>
      </div>

      <Form data={data} />
    </>
  )
}