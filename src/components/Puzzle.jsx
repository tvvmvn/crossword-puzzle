import { useEffect, useRef, useState } from "react";
import { 
  createBoard, 
  createErrors, 
  createLabels, 
  createValues 
} from "../utils";
import Keyboard from "./Keyboard";

export default function Puzzle({ 
  result,
 }) {

  const [board, setBoard] = useState(createBoard(result))
  const [labels, setLabels] = useState(createLabels(result));
  const [values, setValues] = useState(createValues(result));
  const [errors, setErrors] = useState(createErrors(result));
  const [crds, setCrds] = useState([-1, -1]);
  const [down, setDown] = useState(true)
  const [typing, setTyping] = useState(false)
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

  function inputClicked(e, r, c) {
    // set starting point
    setCrds([r, c]);

    // keyboard boom 
    setTyping(true);

    // set direction to move
    let bottom = r < board.length - 1 && board[r + 1][c];
    let right = c < board[r].length - 1 && board[r][c + 1];

    if (right && bottom) {
      if (r == crds[0] && c == crds[1]) {
        setDown(!down)
      } else {
        setDown(false)
      }
    } else if (bottom) {
      setDown(true)
    } else {
      setDown(false)
    }
  }

  function keyClicked(key) {
    // current crds
    let r = crds[0];
    let c = crds[1];

    // update value
    const updatedValues = values.map((row, _r) => row.map((col, _c) => {
      if (_r == r && _c == c) {
        return (key == 'del') ? '' : key;
      }
      return col;
    }))
    setValues(updatedValues)

    // move input
    let top = r > 0 && board[r - 1][c]
    let bottom = r < board.length - 1 && board[r + 1][c];
    let left =  c > 0 && board[r][c - 1];
    let right = c < board[r].length - 1 && board[r][c + 1];

    if (down) {
      if (key == 'del') {
        if (top) setCrds([r - 1, c])
      } else {
        if (bottom) setCrds([r + 1, c])
      }
    } else {
      if (key == 'del') {
        if (left) setCrds([r, c - 1])
      } else {
        if (right) setCrds([r, c + 1])
      }
    }
  }

  function modalClosed() {
    setTyping(false)
    setCrds([-1, -1])
    setDown(true)
  }

  function bgColor(r, c) {
    if (done) {
      if (errors[r][c]) {
        return "bg-red-100"
      }
      return "bg-white"
    }
    if (r == crds[0] && c == crds[1]) {
      if (down) {
        return "bg-yellow-200"
      } 
      return "bg-blue-200";
    } 
    return "bg-white";
  }

  return (
    <div className="mt-8 px-4">
      <form onSubmit={handleSubmit}>
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
        <table className="w-full">
          <tbody
            className="bg-gray-100 border-2 border-gray-200 divide-y-2 divide-gray-200"
            // style={{ gridTemplateColumns: `repeat(${colCount}, minmax(0, 1fr))` }}
          >
            {board.map((row, r) => (
              <tr key={r} className="grid grid-cols-8 divide-x-2 divide-gray-200">
                {row.map((col, c) => (
                  <td key={c} className="relative pt-[100%]">
                    {labels[r][c] && (
                      <label
                        htmlFor={'d' + r + c}
                        className={`absolute top-0 left-0 px-1 font-semibold text-black/[0.2] text-sm z-10`}
                      >
                        {labels[r][c]}
                      </label>
                    )}
                    {!!col && (
                      <input 
                        id={'d' + r + c}
                        type="text"  
                        className={`absolute inset-0 text-center ${bgColor(r, c)} outline-none`}
                        readOnly={true}
                        disabled={done}
                        value={done ? result[r][c] : values[r][c]}
                        onClick={(e) => inputClicked(e, r, c)}
                      />
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

      {!done && (
        <div className="mt-8">
          <button className="px-2 py-1 bg-black text-white font-semibold rounded">
            Done
          </button>
        </div>
      )}
      </form>

      {/* Keyboard */}
      <Keyboard 
        result={result}
        typing={typing}
        keyClicked={keyClicked}
        modalClosed={modalClosed} 
      />
    </div>
  )
}