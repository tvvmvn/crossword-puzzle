export default function Cell({ 
  item,
  cell, 
  done,
  handleClick 
}) {

  console.log(item?.id, cell?.id)

  return (
    <div className="pt-[75%] relative">
      {item && (
        <>
          {item.label && (
            <label 
              className="absolute inset-0 px-2 py-1 font-semibold hover:bg-blue-200 cursor-pointer z-10"
              onClick={() => handleClick(item)}
            >
              {item.label}
            </label>
          )}
          <input
            type="text"
            className={`absolute inset-0 bg-gray-200 text-center outline-none`}
            value={done ? item.correct : item.value}
            readOnly
            style={{
              backgroundColor: (done && item.value != item.correct) && "pink"
            }}
          />
        </>
      )}
    </div>
  )
}