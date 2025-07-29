import { useState, useEffect } from "react";
import { 
  generateInitialError,
  generateInitialInput,
  generateLabels,
  isError,
  isFullfilled
 } from "../utils";

export default function Form({ data }) {

  const labels = generateLabels(data.result)
  const [input, setInput] = useState(null)
  const [error, setError] = useState(null)
  const [done, setDone] = useState(false)
  const [pending, setPending] = useState(true)

  useEffect(() => {
    setPending(true)
    setInput(generateInitialInput(data.result))
    setError(generateInitialError(data.result))
    setDone(false)
    setPending(false)
  }, [])

  function handleChange(e, r, c) {

    if (e.target.value == ' ') return;
    if (e.target.value.length > 1) return;

    const updatedInput = input.map((row, _r) => {
      return row.map((val, _c) => {
        if (_r == r && _c == c) {
          return e.target.value;
        }
        return val;
      })
    })

    setInput(updatedInput)
  }
  
  function handleSubmit(e) {
    e.preventDefault()

    const updatedError = error.map((row, r) => {
      return row.map((val, c) => {
        if (data.result[r][c] != input[r][c]) {
          return true
        }
        return false
      })
    })

    if (isError(updatedError)) {
      setDone(false)
    } else {
      setDone(true)
    }

    setError(updatedError)
  }

  if (pending) {
    return <p>Loading..</p>
  }

  const board = input.map((row, r) => (
    <div
      key={r}
      className="grid grid-cols-5 gap-1"
    >
      {row.map((val, c) => (
        <div key={c} className="relative">
          {labels[r][c] && (
            <span className="absolute top-1 left-2 font-bold">
              {labels[r][c]}
            </span>
          )}
          {val != null && (
            <input
              type="text"
              className="w-full p-2 text-center bg-white border-2 border-gray-200 outline-none"
              value={input[r][c]}
              onChange={(e) => handleChange(e, r, c)}
              style={{ 
                borderColor: error[r][c] && "#d00"
              }}
            />
          )}
        </div>
      ))}
    </div>
  ))

  return (
    <form onSubmit={handleSubmit}>
      {done && (
        <p className="my-4 text-xl text-sky-500 font-bold">
          You did it! 🎉
        </p>
      )}

      <div className="flex flex-col gap-1">
        {board}
      </div>

      <button 
        className="my-4 px-2 py-1 bg-black text-white font-semibold rounded disabled:opacity-10 cursor-pointer"
        disabled={!isFullfilled(input)}
      >
        Submit
      </button>
      
      <ul>
        {data.q.map((item, i) => (
          <li key={i}>
            {item}
          </li>
        ))}
      </ul>
    </form>
  )  
}
