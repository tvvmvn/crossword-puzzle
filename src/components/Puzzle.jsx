import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { 
  createBoard, 
  createErrors, 
  createLabels, 
  createValues 
} from "../utils";

export default function Board({ 
  id,
  result,
  colCount,
  desc,
 }) {

  const [board, setBoard] = useState(createBoard(result))
  const [labels, setLabels] = useState(createLabels(result));
  const [values, setValues] = useState(createValues(result));
  const [errors, setErrors] = useState(createErrors(result));
  const [crds, setCrds] = useState([-1, -1])
  const [down, setDown] = useState(false)
  const [done, setDone] = useState(false)
  const [typing, setTyping] = useState(false)
  const inputRef = useRef(null)
  const keyboardRef = useRef(null)

  // console.log(values)
  // console.log(crds)

  const keys = result.flat().filter((val, i, arr) => {
    return val && arr.indexOf(val) === i;
  }).sort()

  useEffect(() => {
    document.addEventListener("click", (e) => {
      let kbClicked = keyboardRef.current.contains(e.target); 
      let inputClicked = e.target.type == 'text';

      if (!kbClicked && !inputClicked) {
        setCrds([-1, -1])
        setTyping(false)
      } 
    })
  }, [])

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
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

  function handleClick(e, r, c) {
    
    setCrds([r, c])
    setTyping(true)

    let right = c < board[0].length - 1 && board[r][c + 1];
    let bottom = r < board.length - 1 && board[r + 1][c];

    if (right && bottom) {
      let sameClicked = crds[0] == r && crds[1] == c;

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

  function f(key) {

    let value = key;

    if (key == 'Backspace') {
      value = ''
    }

    const updatedValues = values.map((row, r) => row.map((col, c) => {
      if (crds[0] == r && crds[1] == c) {
        return value;
      }
      return col;
    }))

    setValues(updatedValues)

    let r = crds[0]
    let c = crds[1]

    console.log(crds)

    let top = r > 0 && board[r - 1][c];
    let bottom = r < board.length - 1 && board[r + 1][c];
    let left = c > 0 && board[r][c - 1];
    let right = c < board[0].length - 1 && board[r][c + 1];

    if (key == 'Backspace') {
      if (down) {
        if (top) {
          setCrds([--r, c])
        }
      } else {
        if (left) {
          setCrds([r, --c])
        }
      }
    } else {
      if (down) {
        if (bottom) {
          setCrds([++r, c])
        }
      } else {
        if (right) {
          setCrds([r, ++c])
        }
      }
    }
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
          style={{ gridTemplateColumns: `repeat(${colCount}, minmax(0, 1fr))` }}
        >
          {board.map((row, r) => row.map((col, c) => (
            <div
              key={'key' + r + c}
              className="relative pt-[75%] bg-gray-300"
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
                    className={`absolute inset-0 ${errors[r][c] ? "bg-red-200" : "bg-gray-100"} ${down ? "focus:bg-yellow-200" : "focus:bg-blue-200"} text-center outline-none`}
                    value={done ? result[r][c] : values[r][c]}
                    onClick={(e) => handleClick(e, r, c)}
                    ref={(crds[0] == r && crds[1] == c) ? inputRef : null}
                    disabled={done}
                    readOnly={true}
                    autoComplete="off"
                    inputMode="none"
                  // style={{ boxShadow: '0 0 10px 2px #ddd' }}
                  />
                </>
              )}
            </div>
          )))}
        </div>

        {!done && (
          <div className="mt-8 px-4">
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

      {/* Keyboard */}
      <div 
        className={`fixed left-0 ${typing ? 'bottom-0' : '-bottom-72'} w-full h-72 bg-black/[0.2] border-t-4 z-20 transition-all`}
        ref={keyboardRef}
        style={{ visibility: !typing && "hidden"  }}
      >
        <div className="p-4 max-w-xl mx-auto">
          <div className="grid grid-cols-8 gap-2 px-2">
            {keys.map((key, i) => (
            <div className="relative pt-[100%]">
              <button
                key={i}
                className="absolute inset-0 flex items-center justify-center bg-white font-semibold rounded-full"
                onClick={(e) => f(key)}
              >
                {key}
              </button>
            </div>
            ))}
          </div>
          <div className="flex justify-end">
            <button 
              className="px-4 py-2 bg-white font-semibold rounded" 
              onClick={() => f('Backspace')}
            >
              ←
            </button>
          </div>
        </div>
      </div>

    </>
  )
}