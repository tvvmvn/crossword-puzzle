
import { Link } from "react-router";
import db from "../db";

export default function Archives() {

  return (
      <>
        <h1 className="my-4 text-2xl font-semibold"> 
          K-Crossword Puzzle 📚
        </h1>

        <blockquote className="my-4 px-4 py-2 bg-red-400 rounded">
          <p className="text-white">
            Puzzle is updated in every Saturday!
          </p>
        </blockquote>

        <ul className="list-disc px-4">
          {db
            .map(item => (
            <li key={item.id}>
              <Link to={"/archives/" + item.id}>
                Puzzle published at {item.createdAt}
              </Link>
            </li>
          ))}
        </ul>
      </>
  )
}
