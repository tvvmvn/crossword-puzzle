
import { Link, useParams } from "react-router";
import Paper from "../components/Paper";
import db from "../db";

export default function Puzzle() {

  const { id } = useParams();
  const data = db.find(item => item.id == id)

  return (
    <>
      <h1 className="px-8 py-4 text-2xl font-semibold bg-gray-200">
        Puzzle published at {data.createdAt} 📃
      </h1>

      <p className="max-w-5xl mx-auto px-4 my-4">
        <Link to="/archives">← Archives</Link>
      </p>
      
      <Paper 
        result={data.result} 
        desc={data.desc}
        createdAt={data.createdAt}
      />
    </>
  )
}
