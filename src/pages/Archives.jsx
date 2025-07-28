
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

      {db.map(item => (
        <li key={item.id}>
          <Link to={"/archives/" + item.id}>
            Puzzle at {item.createdAt}
          </Link>
        </li>
      ))}
    </>
  )
}
