import { useState } from "react";
import { 
  createBoard, 
  createErrors, 
  createLabels, 
  createValues 
} from "../utils";

export default function Puzzle({ 
  result,
  colCount,
  desc,
 }) {

  const [board, setBoard] = useState(createBoard(result))
  const [labels, setLabels] = useState(createLabels(result));
  const [values, setValues] = useState(createValues(result));
  const [errors, setErrors] = useState(createErrors(result));
  const [done, setDone] = useState(false)

  // console.log(values)

  function handleSubmit(e) {
    e.preventDefault();

    const updatedErrors = errors.map((row, r) => row.map((col, c) => {
      if (values[r][c] != result[r][c]) {
        return true;
      }
      return col;
    }))
    setErrors(updatedErrors)
    setDone(true)
  }

  function handleChange(e, r, c) {
    const updatedValues = values.map((row, _r) => row.map((col, _c) => {
      if (r == _r && c == _c) {
        return e.target.value.trim();
      }
      return col;
    }))
    setValues(updatedValues)
  }

  function handleClick(e, r, c) {
    const updatedValues = values.map((row, _r) => row.map((col, _c) => {
      if (r == _r && c == _c) {
        return ''
      }
      return col;
    }))
    setValues(updatedValues)
  }

  return (
    <>
      <form 
        onSubmit={handleSubmit}
        className="mt-8 px-4"
      >
        {/* Result message */}
        {done && (
          <div className="my-4">
            {errors.flat()
              .filter(item => item == true).length > 0 ? (
              <p className="text-red-400">
                Oops! Try later 🥲
              </p>
            ) : (
              <p className="text-blue-400">
                You did it! 🎉
              </p>
            )}
          </div>
        )}

        {/* Board */}
        <div
          className="grid gap-1"
          style={{ gridTemplateColumns: `repeat(${colCount}, minmax(0, 1fr))` }}
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
                      className={`absolute top-0 left-0 px-1 ${errors[r][c] && "text-red-400"} font-semibold z-10`}
                    >
                      {labels[r][c]}
                    </label>
                  )}
                  <input
                    id={'c' + r + c}
                    type="text"
                    className={`absolute inset-0 border-2 ${errors[r][c] ? 'border-red-400 text-red-400' : 'border-gray-200'} focus:border-black text-center outline-none rounded`}
                    value={done ? result[r][c] : values[r][c]}
                    onChange={(e) => handleChange(e, r, c)}
                    onClick={(e) => handleClick(e, r, c)}
                    autoComplete="off"
                    maxLength={1}
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

      <div className="mt-8 px-4">
        <p className="whitespace-pre-line text-base/8">
          {desc}
        </p>
      </div>
    </>
  )
}