import { useParams, useNavigate, Link } from "react-router";
import Puzzle from "../components/Puzzle";
import db from "../db.json";

export default function Post() {

  const { id } = useParams();
  const data = db.find(item => item.id == id)
  const navigate = useNavigate()

  if (!data) {
    return navigate('/not-found', { replace: true })
  }

  return (
    <>
      <div className="px-4">
        <h1 className="my-4 text-2xl font-semibold">
          Puzzle at {id} ✏️
        </h1>

        <p className="my-4">
          <Link to="/" className="">
            ← Back
          </Link>
        </p>
      </div>
        
      <Puzzle
        id={data.id}
        result={data.result}
        colCount={data.colCount}
        desc={data.desc}
      />

      <div className="mt-8 px-4">
        <p className="whitespace-pre-line text-base/8">
          {data.desc}
        </p>
      </div>
    </>
  )
}