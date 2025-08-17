import { useEffect, useRef, useState } from "react";
import { 
  createBoard, 
  createErrors, 
  createKeyboard, 
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
  const [down, setDown] = useState(true)
  const [keys, setKeys] = useState(createKeyboard(result));

  // console.log(values)
  console.log(keys)

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

    console.log(crds)
    console.log(r, c)

    // keyboard boom 
    setTyping(true);

    // set direction to move
    let top = r > 0 && board[r - 1][c]
    let bottom = r < board.length - 1 && board[r + 1][c];
    let left =  c > 0 && board[r][c - 1];
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

  function modalClosed(e) {
    if (e.target == e.currentTarget) {
      setTyping(false)
      setCrds([-1, -1])
      setDown(true)
    }
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
    <>
      <form 
        onSubmit={handleSubmit}
        className="mt-8 px-2"
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
        <table className="w-full">
          <tbody
            className="bg-gray-100 border-2 border-gray-200 divide-y-2 divide-gray-200"
            // style={{ gridTemplateColumns: `repeat(${colCount}, minmax(0, 1fr))` }}
          >
            {board.map((row, r) => (
              <tr key={r} className="grid grid-cols-8 divide-x-2 divide-gray-200">
                {row.map((col, c) => (
                  <td key={c} className="h-8 relative pt-[100%]">
                    {labels[r][c] && (
                      <label
                        htmlFor={'c' + r + c}
                        className={`absolute top-0 left-0 px-1 font-semibold z-10`}
                      >
                        {labels[r][c]}
                      </label>
                    )}
                    {!!col && (
                      <input 
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

      <div className="mt-8 px-4">
        <p className="whitespace-pre-line text-base/8">
          {desc}
        </p>
      </div>

      <div 
        className={`fixed w-full h-[35vh] left-0 ${typing ? 'bottom-0' : '-bottom-[40vh]'} bg-gray-300 border-t-4 transition-all z-20`}
        onClick={modalClosed}
      >
        {/* keyboard */}
        <div 
          className="mx-auto max-w-xl grid grid-cols-6 gap-2 p-4 bg-gray-100"
        >
          {keys.map(key => (
            <button 
              key={key}
              className={`p-2 ${key == 'del' ? 'bg-red-300 text-white' : 'bg-white'} rounded-lg font-semibold`}
              onClick={() => keyClicked(key)}
            >
              {key}
            </button>
          ))}
        </div>
      </div>
    </>
  )
}