
import { useParams } from "react-router";
import Form from "../components/Form";

export default function Archives() {

  const { id } = useParams();

  return (
    <>
      <h1 className="text-2xl my-4">Archives</h1>

      <Form id={id} />
    </>
  )
}
