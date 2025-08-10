import { useEffect, useState } from "react"
import { createLabels, createSheet } from "../utils";

const colCount = 6;
const rowCount = 5;

export default function CreateForm() {

  const [sheet, setSheet] = useState(createSheet(rowCount, colCount));
  const [text, setText] = useState("")
  const [labels, setLabels] = useState(createLabels(sheet))

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
      result,
      rowCount: sheet.length,
      colCount: sheet[0].length,
      desc: text,
      createdAt: new Date()
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
    <>
      <p className="my-4 font-semibold">
        Create Puzzle
      </p>

      <form onSubmit={handleSubmit}>
        <div 
          className="grid border-2 divide-x divide-y divide-gray-200"
          style={{ gridTemplateColumns: `repeat(${colCount}, minmax(0, 1fr))` }}
        >
          {sheet.map((row, r) => row.map((col, c) => (
            <div 
              key={'key' + r + c}
              className="relative pt-[50%]"
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
        
        <div className="my-4">
          <button className="bg-gray-200 px-2 py-1 font-semibold rounded">
            Create
          </button>
        </div>

        <p className="my-4 font-semibold">
          Description
        </p>
        <textarea 
          name="" 
          id="" 
          className="w-full h-60 p-2 bg-gray-100 outline-none resize-none" 
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </form>
    </>
  )
}