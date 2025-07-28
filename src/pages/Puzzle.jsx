
import { Link, useParams } from "react-router";
import Form from "../components/Form";
import db from "../db";

export default function Puzzle() {

  const { id } = useParams();
  const data = db.find(item => item.id == id)

  return (
    <>
      <p className="my-4">
        <Link to="/archives">← Archives</Link>
      </p>

      <h1 className="my-4 text-2xl font-semibold">
        Puzzle at {data.createdAt}
      </h1>

      <Form data={data} />
    </>
  )
}
