import { useEffect, useState } from "react"
import { createLabels, createSheet } from "../utils";

const colCount = 8;
const rowCount = 6;

export default function CreateForm() {

  const [sheet, setSheet] = useState(createSheet(rowCount, colCount));
  const [desc, setDesc] = useState("")
  const [labels, setLabels] = useState(createLabels(sheet))
  const [id, setId] = useState("")

  // console.log(sheet)
  // console.log(labels)

  useEffect(() => {
    setLabels(createLabels(sheet))
  }, [sheet])

  function handleSubmit(e) {
    e.preventDefault();

    const result = sheet.map(row => row.map(col => {
      if (col == '') {
        return null;
      }
      return col;
    }))

    const data = {
      id,
      result,
      rowCount,
      colCount,
      desc,
    }

    console.log(data)
  }
  
  function handleChange(e, r, c) {
    const updatedSheet = sheet.map((row, _r) => row.map((item, _c) => {
      if (_r == r && _c == c) {
        return e.target.value.trim();
      }
      return item;
    }))
    setSheet(updatedSheet)
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <div className="my-4 flex justify-between">
        <p className="font-semibold">
          Create Puzzle
        </p>
                
        <button className="bg-gray-200 px-2 py-1 font-semibold rounded">
          Create
        </button>
      </div>

      {/* Id (Date) */}
      <div className="my-4">
        <input 
          type="text" 
          className="px-2 py-1 w-full border border-gray-300 rounded outline-none"
          placeholder="YYYY-MM-DD"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
      </div>

      {/* Sheet */}
      <div 
        className="grid border-2 divide-x divide-y divide-gray-200"
        style={{ gridTemplateColumns: `repeat(${colCount}, minmax(0, 1fr))` }}
      >
        {sheet.map((row, r) => row.map((col, c) => (
          <div 
            key={'key' + r + c}
            className="relative pt-[75%]"
          >
            {labels[r][c] && (
              <label 
                htmlFor={'c' + r + c}
                className="absolute left-0 top-0 px-1 text-gray-400 font-semibold z-10"
              >
                {labels[r][c]}
              </label>
            )}
            <input 
              id={`c` + r + c}
              type="text" 
              className="absolute inset-0 text-center outline-none"
              value={sheet[r][c]}
              onChange={(e) => handleChange(e, r, c)}
              maxLength={1}
              autoComplete="off"
            />
          </div>
        )))}
      </div>

      {/* Description */}
      <textarea 
        id="desc" 
        className="mt-8 w-full h-80 p-2 bg-gray-100 outline-none resize-none" 
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        placeholder="Describe puzzles.."
      />
    </form>
  )
}