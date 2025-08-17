import { useState } from "react";
import { createKeyboard } from "../utils";

export default function Keyboard({ 
  result,
  typing,
  keyClicked,
  modalClosed
}) {
  
  const [keys, setKeys] = useState(createKeyboard(result));

  function handleClick(e) {
    if (e.target == e.currentTarget) {
      modalClosed()
    }
  }
  
  return (
    <div className={`fixed w-full h-[35vh] left-0 ${typing ? 'bottom-0' : '-bottom-[40vh]'} border-t-4 transition-all z-20`}>
      <div className="bg-gray-100 flex justify-center">
        <div className="w-xl grid grid-cols-6 gap-2 p-4">
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
      <button className="w-full h-full bg-gray-400" onClick={handleClick}></button>
    </div>
  )
}