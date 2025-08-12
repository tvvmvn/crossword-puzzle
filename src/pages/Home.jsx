
import { Link } from "react-router";
import db from "../db.json";

export default function Home() {

  return (
      <>
        <h1 className="my-4 text-2xl font-semibold"> 
          K-Crossword Puzzle 📚
        </h1>

        <blockquote className="mt-8 px-4 py-2 bg-red-400 rounded">
          <p className="text-white font-semibold">
            🗓️ Puzzle is updated in every Saturday!
          </p>
        </blockquote>

        <div className="mt-8">
          <img 
            src="main.jpg"
            alt="main-image" 
            className="w-full h-48 object-cover"
          />
        </div>

        <ul className="list-disc mt-8 px-4">
          {db
            .map(item => (
            <li key={item.id} className="my-2">
              <Link 
                to={"/crossword-puzzle/puzzles/" + item.id}
                className="underline"
              >
                Puzzle published at {item.id}
              </Link>
            </li>
          ))}
        </ul>
      </>
  )
}
