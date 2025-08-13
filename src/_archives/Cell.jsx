export default function Cell({ 
  item,
  cell, 
  done,
  labelClicked 
}) {

  function bgColor() {
    if (done) {
      if (item.value == item.correct) {
        return "bg-gray-200"
      } else {
        return "bg-red-200"
      }
    } else {
      if (cell && item.id == cell.id) {
        return "bg-blue-200"
      }
      return "bg-gray-200"
    }
  }

  return (
    <div className="pt-[75%] relative">
      {item && (
        <div className="group">
          {item.label && (
            <label 
              className={`absolute inset-0 px-2 py-1 font-semibold cursor-pointer z-10`}
              onClick={() => labelClicked(item)}
            >
              {item.label}
            </label>
          )}
          <input
            type="text"
            className={`absolute inset-0 group-hover:bg-gray-300 text-center outline-none ${bgColor(item)}`}
            value={done ? item.correct : item.value}
            readOnly
          />
        </div>
      )}
    </div>
  )
}