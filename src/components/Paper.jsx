import { useState } from "react"
import { initBoard, isPassed } from "../utils"
import Modal from "./Modal"
import Cell from "./Cell"

export default function Paper({ result, desc }) {

  const [board, setBoard] = useState(initBoard(result))
  const [done, setDone] = useState(false)
  const [inputActive, setInputActive] = useState(false)
  const [cell, setCell] = useState(null)

  console.log(board)

  function handleSubmit(e) {
    e.preventDefault()

    setDone(true)
  }

  function clearForm() {
    setDone(false)
    setBoard(initBoard(result))
  }

  function handleClick(item) {
    if (!item.label) return;

    setCell(item)
    setInputActive(true)
  }

  function updateBoard(value, vertical) {

    let i = 0;
    let stop = false;

    const updatedBoard = board.map((row, r) => row.map((item, c) => {

      let q = vertical ? (c == cell.c && r >= cell.r) : (r == cell.r && c >= cell.c)
      
      if (q && item != null && !stop) {
        return {...item, value: value[i++]};
      } else if (q && item == null) {
        stop = true;
        return item;
      }
      return item;
    }))

    if (value.length != i) {
      throw new Error("wrong length")
    }

    console.log(updatedBoard)
    setBoard(updatedBoard)
  }

  const boardCells = board.map(row => row.map(item => (
    <Cell   
      key={Math.random()}
      item={item} 
      cell={cell}
      done={done}
      handleClick={handleClick} 
    />
  )))

  return (
    <>
      <div className="mt-4 max-w-5xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8">
          
          {/* Puzzle Board */}
          <div id="grid-left" className="">
            {/* Result messages */}
            {(done && isPassed(board)) && (
              <p className="my-4 text-lg font-semibold text-blue-500">
                You did it! 🎉
              </p>
            )}

            {(done && !isPassed(board)) && (
              <p className="my-4 text-lg font-semibold text-blue-500">
                Try Later!
              </p>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit}>
              <div className="relative">
                {done && (
                  <div className="absolute inset-0 z-20"></div>
                )}
                <div className="grid grid-cols-6 gap-2">
                  {boardCells}
                </div>
              </div>
              <div className="mt-4">
                {!done && (
                  <button 
                    type="submit" 
                    className="px-4 py-2 border bg-gray-700 hover:bg-gray-800 text-white font-semibold rounded cursor-pointer"
                  >
                    Submit
                  </button>
                )}
                {done && (
                  <button
                    type="button"
                    className="px-4 py-2 border bg-gray-700 hover:bg-gray-800 text-white font-semibold rounded cursor-pointer"
                    onClick={clearForm}
                  >
                    Try Again
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Description for puzzle */}
          <div id="grid-right" className="">
            <h3 className="my-4 text-lg font-semibold">
              Description
            </h3>
            {desc}
          </div>
        </div>
      </div>

      {/* Input modal */}
      {inputActive && (
        <Modal
          cell={cell}
          updateBoard={updateBoard}
          setInputActive={setInputActive}
        />
      )}

      {/* Advertise */}

      {/* Footer */}
      <footer className="p-16"></footer>
    </>
  )
}