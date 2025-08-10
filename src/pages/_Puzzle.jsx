import { useState } from "react"
import { Link, useParams } from "react-router";
import { initCells } from "../utils";
import db from "../db";

export default function App() {
  
  const { id } = useParams()
  const puzzle = db.find(puzzle => puzzle.id == id)
  const [cells, setCells] = useState(initCells(puzzle.result))
  const [trial, setTrial] = useState({
    done: false,
    passed: false
  })

  console.log(cells)

  function handleSubmit(e) {
    e.preventDefault();

    const invalidCells = cells.filter(cell => !cell.isCorrect())
    
    setTrial({ 
      done: true, 
      passed: invalidCells.length == 0 
    })
  }
    
  function handleChange(e, id) {

    if (e.target.value.length > 1) return;

    const updatedCells = cells.map(cell => {
      if (cell.id == id) {
        return { ...cell, value: e.target.value.trim() }
      }
      return cell;
    })

    setCells(updatedCells)
  }

  function handleFocus(id) {
    // console.log(id + " focused")

    const updatedCells = cells.map(cell => {
      if (cell.id == id) {
        return { ...cell, value: '' }
      }
      return cell;
    })

    setCells(updatedCells);
  }

  function clearForm() {
    const cleanedCells = cells.map(cell => {
      return { ...cell, value: '' }
    })
    
    setCells(cleanedCells)
    setTrial({
      done: false,
      passed: false
    })
  }

  function bgColor(cell) {
    if (trial.done && !cell.isCorrect()) {
      return "bg-red-200";
    } 
    return "bg-gray-200";
  }

  return (
    <>

      <h1 className="my-4 text-2xl font-semibold">
        Puzzle at {puzzle.createdAt} ✏️
      </h1>

      <p className="my-4">
        <Link to="/" className="text-gray-400">
          ← Back
        </Link>
      </p>

      <form onSubmit={handleSubmit} className="mt-8">
        {trial.done && (
          <>
            {trial.passed ? (
              <p className="my-4 font-semibold text-blue-500">
                You did it! 🎉
              </p>
            ) : (
              <p className="my-4">
                Oops! {" "}
                <button
                  className="font-semibold cursor-pointer text-red-400"
                  onClick={clearForm}
                >
                  Try again
                </button>
              </p>
            )}
          </>
        )}

        <div className="grid gap-1">
          {cells.map(cell => (
            <div 
              key={cell.id}
              className={`pt-[75%] relative`}
              style={{ 
                gridColumnStart: cell.crds[1] + 1,
                gridTemplateColumns: `repeat(${puzzle.columns}, minmax(0, 1fr))`
              }}
            >
              {cell.label && (
                <label 
                  htmlFor={cell.id}
                  className="absolute top-0 left-0 px-1 font-semibold z-10"
                  style={{ fontSize: 6 / puzzle.columns + "rem" }}
                >
                  {cell.label}
                </label>
              )}
              <input 
                id={cell.id}
                type="text" 
                className={`absolute inset-0 w-full h-full text-center ${bgColor(cell)} focus:bg-blue-200 outline-none caret-transparent`}
                value={trial.done ? cell.correct : cell.value}
                onChange={(e) => handleChange(e, cell.id)}
                onFocus={() => handleFocus(cell.id)}
                disabled={trial.done}
              />
            </div>
          ))}
        </div>

        {!trial.done && (
          <div className="mt-8">
            <button className="px-2 py-1 bg-black text-white font-semibold rounded cursor-pointer">
              Submit
            </button>
          </div>
        )}
      </form>

      <div className="mt-8">
        <h3 className="my-4 text-lg font-semibold">
          Description
        </h3>
      </div>

      <ul>
        {puzzle.desc.map((item, i) => (
          <li key={i} className="my-2">
            {item}
          </li>
        ))}
      </ul>
    </>
  )
}