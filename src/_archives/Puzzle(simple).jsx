import { useEffect, useRef, useState } from "react";
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
  const [typing, setTyping] = useState(false)
  const [crds, setCrds] = useState([-1, -1]);
  const keyboardRef = useRef(null)
  const inputRef = useRef(null)

  // console.log(values)

  const keys = result.flat().filter((val, i, arr) => {
    return val && arr.indexOf(val) === i;
  }).sort()

  console.log(keys)

  useEffect(() => {
    document.addEventListener("click", (e) => {
      let kbClicked = keyboardRef.current.contains(e.target); 
      let inputClicked = e.target.type == 'text';

      if (!kbClicked && !inputClicked) {
        setTyping(false)
        setCrds([-1, -1])
      } 
    })
  }, [])

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  })

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
    setCrds([r, c]);
    setTyping(true);
  }

  function handleButton(key) {
    const updatedValues = values.map((row, r) => row.map((col, c) => {
      if (r == crds[0] && c == crds[1]) {
        return key
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
                    readOnly={true}
                    autoComplete="off"
                    maxLength={1}
                    ref={(r == crds[0] && c == crds[1]) ? inputRef : null}
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
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. 
            Repellendus a non esse blanditiis, accusantium debitis vitae? 
            Impedit, adipisci dolore! Velit ex dolores porro! 
            A adipisci laborum doloremque provident, commodi repudiandae?

            Lorem ipsum, dolor sit amet consectetur adipisicing elit. 
            Repellendus a non esse blanditiis, accusantium debitis vitae? 
            Impedit, adipisci dolore! Velit ex dolores porro! 
            A adipisci laborum doloremque provident, commodi repudiandae?
        </p>
      </div>

      <div 
        className={`fixed w-full h-[40vh] left-0 ${typing ? 'bottom-0' : '-bottom-[40vh]'} bg-gray-300 border-t-4 transition-all`}
      >
        {/* keyboard */}
        <div 
          className="mx-auto max-w-xl grid grid-cols-6 gap-2 p-4 bg-gray-100"
          ref={keyboardRef}
        >
          {keys.map(key => (
            <button 
              key={key}
              className="p-2 bg-white rounded-lg font-semibold bg-white"
              onClick={() => handleButton(key)}
            >
              {key}
            </button>
          ))}
        </div>
      </div>
    </>
  )
}