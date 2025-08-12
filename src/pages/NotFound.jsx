import { Link } from "react-router";

export default function NotFound() {
  return (
    <>
      <h1 className="my-4 text-2xl font-semibold">
        Pages Not Found
      </h1>

      <p>
        <Link to="/">
          ← Back to home
        </Link>
      </p>
    </>
  )
}