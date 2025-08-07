import { useEffect, useRef, useState } from "react";
import { initCells } from "./utils";

const result = [
  ['고', null, null, '주', null],
  ['양', null, '고', '민', null],
  ['이', '야', '기', null, '소'],
  [null, '구', null, '거', '리'],
  [null, '장', '식', '품', null],
];

export default function App() {

  const [cells, setCells] = useState(initCells(result))
  const inputRef = useRef(null)
  const [index, setIndex] = useState(0)

  const activeIds = cells
    .filter(cell => cell.active)
    .map(cell => cell.id)

  // console.log(cells)
  console.log(activeIds, index)

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  })

  function handleKeyup(e) {
    if (e.key != 'Backspace' && index < activeIds.length - 1) {
      setIndex(index + 1)
    }
  }

  function handleKeyDown(e) {
    if (e.key == 'Backspace' && index > 0) {
      if (e.target.value == '') {
        setIndex(index - 1)
      }
    }
  }

  function handleChange(e, id) {
  
    const updatedCells = cells.map(cell => {
      if (cell.id == id) {
        return { ...cell, value: e.target.value.trim() }
      }
      return cell;
    })

    setCells(updatedCells)
  }

  function handleClick(cell) {
    // console.log("label: " + label);

    const label = cell.label;

    const updatedCells = cells.map(cell => {
      if (cell.space[label.dir] == label.value) {
        return { ...cell, value: '', active: true }
      } 
      return { ...cell, active: false }
    })

    setCells(updatedCells)
    setIndex(0)
  }

  return (
    <div className="p-4">
      <div className="grid grid-cols-5 gap-2">
        {cells.map(cell => (
          <input 
            key={cell.id}
            type="text" 
            className={`col-start-${cell.crds[1] + 1} ${cell.active ? 'bg-blue-200' : 'bg-gray-200'}`}
            placeholder={`${cell.label ? cell.label.value : '_'} (${cell.id})`}
            value={cell.value}
            maxLength={1}
            onChange={(e) => handleChange(e, cell.id)}
            onClick={cell.label ? () => handleClick(cell) : null}
            onKeyUp={(e) => handleKeyup(e)}
            onKeyDown={(e) => handleKeyDown(e)}
            ref={activeIds[index] == cell.id ? inputRef : null}
          />
        ))}
      </div>
    </div>
  )
}