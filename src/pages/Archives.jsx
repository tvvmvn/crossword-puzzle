
import { Link } from "react-router";
import db from "../db";

export default function Archives() {

  return (
    <>
      <p className="my-4">
        <Link to="/">← Home</Link>
      </p>

      <h1 className="my-4 text-2xl font-semibold"> 
        Archives for K-Crossword Puzzle
      </h1>

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
    </>
  )
}
