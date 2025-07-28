import { useState, useEffect } from "react";
import db from "../db";
import { 
  generateInitialError,
  generateInitialInput,
  generateLabels,
  isError,
  isFullfilled
 } from "../utils";

export default function Form({ id }) {

  const data = db.find(item => item.id == id)
  const labels = generateLabels(data.result)
  const [input, setInput] = useState(generateInitialInput(data.result))
  const [error, setError] = useState(generateInitialError(data.result))
  const [done, setDone] = useState(false)

  function handleChange(e, r, c) {

    const updatedInput = input.map((row, _r) => {
      return row.map((val, _c) => {
        if (_r == r && _c == c) {
          return e.target.value
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

  const board = input.map((row, r) => (
    <div
      key={r}
      className="grid grid-cols-5 gap-2"
    >
      {row.map((val, c) => (
        <div key={c} className="relative">
          {labels[r][c] && (
            <span className="absolute top-0 left-1">
              {labels[r][c]}
            </span>
          )}
          {val != null && (
            <input
              type="text"
              className="w-full p-2 text-center bg-white border outline-none"
              value={input[r][c]}
              onChange={(e) => handleChange(e, r, c)}
              maxLength={1}
              style={{ 
                backgroundColor: error[r][c] && "pink"
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
        <p className="my-4 bg-blue-400">
          Done! 🎉
        </p>
      )}

      <div className="flex flex-col gap-2">
        {board}
      </div>

      {!done && (
        <button 
          className="my-4 px-2 border disabled:opacity-20 cursor-pointer"
          disabled={!isFullfilled(input)}
        >
          Submit
        </button>
      )}
      
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
