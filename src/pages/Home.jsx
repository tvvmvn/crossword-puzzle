import { Link } from "react-router";
import Paper from "../components/Paper";
import db from "../db";

export default function Home() {

  const data = db[db.length - 1]

  return (
    <>
      <header className="border-b-4">
        <div className="p-6 flex justify-between items-center">
          <h1 className="text-xl font-semibold">
            <code>Crossword Puzzle 🙏</code>
          </h1>
          <Link to="/archives" className="font-semibold text-gray-400">
            Archives
          </Link>
        </div>
      </header>
    
      <div className="max-w-5xl mx-auto px-4">
        <h3 className="my-6 text-lg font-semibold">
          This week's Puzzle
        </h3>
        {/* <p className="my-4 px-4 py-1 bg-red-400 text-white rounded">
          🕓 Puzzle is updated at every Saturday!
        </p> */}
      </div>

      <Paper
        result={data.result}
        desc={data.desc}
      />
    </>
  )
}