import { useEffect, useRef, useState } from "react";
import { createBoard, createErrors, createLabels, createValues } from "../utils";
import db from "../db.json";
import { Link, useParams } from "react-router";

export default function Puzzle() {

  const { id } = useParams();
  const data = db.find(item => item.id == id)

  const board = createBoard(data.result)
  const labels = createLabels(data.result)
  const [values, setValues] = useState(createValues(data.result));
  const [errors, setErrors] = useState(createErrors(data.result));

  const [targetCrds, setTargetCrds] = useState([-1, -1])
  const [down, setDown] = useState(false)
  const [done, setDone] = useState(false)
  const inputRef = useRef(null)

  // console.log(values)
  // console.log(targetCrds)

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  })

  function handleSubmit(e) {
    e.preventDefault();

    const updatedErrors = errors.map((row, r) => row.map((col, c) => {
      if (values[r][c] != data.result[r][c]) {
        return true;
      }
      return col;
    }))
    setErrors(updatedErrors)
    setDone(true)
  }

  function handleChange(e, r, c) {
    const value = e.target.value[1] || e.target.value;

    const updatedValues = values.map((row, _r) => row.map((col, _c) => {
      if (r == _r && c == _c) {
        return value.trim();
      }
      return col;
    }))
    setValues(updatedValues)
  }

  function handleClick(e, r, c) {
    setTargetCrds([r, c])

    let right = c < board[0].length - 1 && board[r][c + 1];
    let bottom = r < board.length - 1 && board[r + 1][c];

    if (right && bottom) {
      let sameClicked = targetCrds[0] == r && targetCrds[1] == c;

      if (sameClicked) {
        setDown(!down)
      } else {
        setDown(false)
      }
    } else if (right) {
      setDown(false)
    } else if (bottom) {
      setDown(true)
    } else {
      setDown(false)
    }
  }

  function handleKeyUp(e, r, c) {
    if (e.key == 'Backspace') return;

    let right = c < board[0].length - 1 && board[r][c + 1];
    let bottom = r < board.length - 1 && board[r + 1][c];

    if (down) {
      if (bottom) {
        setTargetCrds([++r, c])
      }
    } else {
      if (right) {
        setTargetCrds([r, ++c])
      }
    }
  }
  
  function handleKeyDown(e, r, c) {
    if (e.key != 'Backspace' || e.target.value) return;

    let left = c > 0 && board[r][c - 1];
    let top = r > 0 && board[r - 1][c];

    if (down) {
      if (top) {
        setTargetCrds([--r, c])
      }
    } else {
      if (left) {
        setTargetCrds([r, --c])
      }
    }
  }

  return (
    <>
      <h1 className="my-4 text-2xl font-semibold">
        Puzzle at {data.id} ✏️
      </h1>

      <p className="my-4">
        <Link to="/" className="">
          ← Back
        </Link>
      </p>

      <form 
        onSubmit={handleSubmit}
        className="mt-8"
        >
        
        {/* Result message */}
        {done && (
          <div className="my-4">
            {errors.flat()
              .filter(item => item == true).length > 0 ? (
              <p className="text-red-500">
                Oops! Try later 🥲
              </p>
            ) : ( 
              <p className="text-blue-500">
                You did it! 🎉
              </p>
            )}
          </div>
        )}

        {/* Board */}
        <div 
          className="grid gap-1"
          style={{ gridTemplateColumns: `repeat(${data.colCount}, minmax(0, 1fr))` }}
        >
          {board.map((row, r) => row.map((col, c) => (
            <div
              key={'key' + r + c}
              className="relative pt-[100%]"
            >
              {!!col && (
                <>
                  {labels[r][c] && (
                    <label 
                      htmlFor={'c' + r + c}
                      className="absolute top-0 left-0 px-1 font-semibold z-10"
                    >
                      {labels[r][c]}
                    </label>
                  )}
                  <input 
                    id={'c' + r + c}
                    type="text" 
                    className={`absolute inset-0 ${errors[r][c] ? "bg-red-200" : "bg-gray-200"} ${down ? "outline-yellow-200" : "outline-blue-200"} text-center`}
                    value={done ? data.result[r][c] : values[r][c]}
                    onChange={(e) => handleChange(e, r, c)}
                    onKeyUp={(e) => handleKeyUp(e, r, c)}
                    onKeyDown={(e) => handleKeyDown(e, r, c)}
                    onClick={(e) => handleClick(e, r, c)}
                    ref={(r == targetCrds[0] && c == targetCrds[1]) ? inputRef : null }
                    disabled={done}
                    autoComplete="off"
                  />
                </>
              )}
            </div>
          )))}
        </div>

        {!done && (
          <div className="mt-8">
            <button className="px-2 py-1 bg-black text-white font-semibold rounded">
              Done
            </button>
          </div>
        )}
      </form>

      <div className="mt-8">
        <p className="whitespace-pre-line text-base/8">
          {data.desc}
        </p>
      </div>
    </>
  )
}