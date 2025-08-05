import { useState } from "react"
import { Link, useParams } from "react-router";
import { initBoard, isPassed } from "../utils"
import Modal from "../components/Modal"
import Cell from "../components/Cell"
import db from "../db";

export default function Puzzle() {
  
  const { id } = useParams();
  const data = db.find(item => item.id == id)
  const [board, setBoard] = useState(initBoard(data.result))
  const [done, setDone] = useState(false)
  const [inputActive, setInputActive] = useState(false)
  const [cell, setCell] = useState(null)

  // console.log(board)

  function handleSubmit(e) {
    e.preventDefault()

    setDone(true)
  }

  function clearForm() {
    setDone(false)
    setBoard(initBoard(result))
  }

  function labelClicked(item) {
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

    // console.log(updatedBoard)
    setBoard(updatedBoard)
    setInputActive(false)
    setCell(null)
  }

  function handleCancel() {
    setInputActive(false)
    setCell(null)
  }

  const boardCells = board.map(row => row.map(item => (
    <Cell   
      key={Math.random()}
      item={item} 
      cell={cell}
      done={done}
      labelClicked={labelClicked} 
    />
  )))

  return (
    <>
      <p className="my-4">
        <Link to="/">← Back</Link>
      </p>
      
      <h1 className="my-4 text-2xl font-semibold">
        Puzzle published at {data.createdAt} 📃
      </h1>

      {/* Puzzle Board */}
      <form onSubmit={handleSubmit}>
        {(done && isPassed(board)) && (
          <p className="my-4 text-lg font-semibold text-blue-500">
            You did it! 🎉
          </p>
        )}

        {(done && !isPassed(board)) && (
          <div className="my-4">
            <span className="font-semibold text-gray-400">
              Oops!
            </span> {" "}
            <button 
              className="cursor-pointer font-semibold text-blue-500" 
              onClick={clearForm}
            >
              Try Again
            </button>
          </div>
        )}

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
        </div>
      </form>

      {/* Description for puzzle */}
      <div className="mt-8">
        <h3 className="my-4 text-lg font-semibold">
          Description
        </h3>
        <ul>
          {[1,2,3,4,5,6,7,8,9,10].map((item, i) => (
            <li key={i} className="my-4">
              {++i}. {data.desc}
            </li>
          ))}
        </ul>
      </div>

      {/* Input modal */}
      {inputActive && (
        <Modal
          cell={cell}
          updateBoard={updateBoard}
          handleCancel={handleCancel}
        />
      )}
    </>
  )
}