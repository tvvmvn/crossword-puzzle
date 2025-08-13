import { useParams, useNavigate } from "react-router";
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
    <Puzzle
      id={data.id}
      result={data.result}
      colCount={data.colCount}
      desc={data.desc}
    />
  )
}