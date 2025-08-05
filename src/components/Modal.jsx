import { useEffect, useState } from "react"

export default function Input({
  cell,
  updateBoard,
  setInputActive
}) {
  
  const [value, setValue] = useState("")
  const [vertical, setVertical] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    console.log("cell changed")

    if (cell.dir == 1) {
      setVertical(true)
    } else {
      setVertical(false)
    }
  }, [cell])
  
  function handleEnter() {
    try {
      updateBoard(value, vertical)
      setValue("")
      setVertical(false)
      setInputActive(false)
    } catch (ex) {
      // console.error(ex)
      setError(ex)
    }
  }

  function handleOverlay(e) {
    if (e.target == e.currentTarget) {
      setInputActive(false)
    }
  }

  function handleClose() {
    setInputActive(false)
  }

  return (
    <div 
      id="overlay" 
      className="fixed inset-0 flex justify-center items-end transition-all z-20"
      onClick={handleOverlay}
    >
      <div 
        className="w-md px-6 pb-6 mb-8 bg-white relative rounded"
        style={{ boxShadow: "0 0 10px 2px #ddd" }}
      >
        <h3 className="my-4 text-lg font-semibold">
          Question {cell.label}
        </h3>

        {/* Choose button - Horizontal or Vertical */}
        {cell.dir == 2 && (
          <div className="flex">
            <label>
              <input 
                type="radio" 
                id="horizontal" 
                checked={!vertical}
                className="hidden peer/vertical"
                onChange={() => setVertical(false)}
              />
              <span className="block p-2 peer-checked/vertical:border-b-2  cursor-pointer">
                Horizontal
              </span>
            </label> 
            <label>
              <input 
                type="radio" 
                id="vertical" 
                checked={vertical}
                className="hidden peer/horizontal"
                onChange={() => setVertical(true)}
              />
              <span className="block p-2 peer-checked/horizontal:border-b-2 cursor-pointer">
                Vertical
              </span>
            </label>
          </div>
        )}

        {/* Input and Buttons */}
        <div className="mt-4 flex">
          <input
            id="words"
            type="text"
            className="grow-1 border border-gray-400 px-4 rounded"
            value={value}
            onChange={(e) => setValue(e.target.value.trim())}
          />
          <button
            className="ml-2 px-4 py-2 bg-gray-700 hover:bg-gray-800 text-white font-semibold rounded cursor-pointer"
            onClick={handleEnter}
          >
            Enter
          </button>
        </div>

        {/* Close button */}
        <button 
          className="absolute top-0 right-0 px-4 py-2 text-2xl cursor-pointer"
          onClick={handleClose}
        >
          &times;
        </button> 

        {/* Error messages */}
        {error && (
          <p className="text-red-500">
            Invalid length of words
          </p>
        )}
      </div>
    </div>
  )
}