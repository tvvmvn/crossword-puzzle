
import { Link } from "react-router";
import db from "../db";

export default function Archives() {

  return (
    <>
      <h1 className="px-8 py-4 text-2xl bg-gray-200 font-semibold"> 
        Archives for K-Crossword Puzzle 📚
      </h1>


      <div className="max-w-2xl mx-auto px-4">
        <p className="my-4">
          <Link to="/">← Home</Link>
        </p>

        <ul className="list-disc px-4">
          {db
            .filter((item, i) => i < db.length - 1)
            .reverse()
            .map(item => (
            <li key={item.id}>
              <Link to={"/archives/" + item.id}>
                Puzzle published at {item.createdAt}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
