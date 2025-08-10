export function createSheet(rowCount, colCount) {
  
  let sheet = []

  for (let r = 0; r < rowCount; r++) {
    sheet[r] = []
    for (let c = 0; c < colCount; c++) {
      sheet[r][c] = ''
    }
  }

  return sheet;
}

export function createBoard(result) {
  
  let board = []

  for (let r = 0; r < result.length; r++) {
    board[r] = []
    for (let c = 0; c < result[r].length; c++) {
      if (result[r][c]) {
        board[r][c] = 1;
      } else {
        board[r][c] = 0;
      }
    }
  }

  return board;
}

export function createValues(result) {
  
  let values = []

  for (let r = 0; r < result.length; r++) {
    values[r] = []
    for (let c = 0; c < result[r].length; c++) {
      if (result[r][c]) {
        values[r][c] = '';
      } else {
        values[r][c] = null;
      }
    }
  }

  return values;
}

export function createErrors(result) {
  
  let errors = []

  for (let r = 0; r < result.length; r++) {
    errors[r] = []
    for (let c = 0; c < result[r].length; c++) {
      if (result[r][c]) {
        errors[r][c] = false;
      } else {
        errors[r][c] = null;
      }
    }
  }

  return errors;
}

export function createLabels(result) {
  
  let labels = []
  let label = 1;
  
  for (let r = 0; r < result.length; r++) {
    labels[r] = []
    for (let c = 0; c < result[r].length; c++) {
      labels[r][c] = null;
      if (!result[r][c]) continue;

      let top = r > 0 && result[r - 1][c]
      let bottom = r < result.length - 1 && result[r + 1][c]
      let left = c > 0 && result[r][c - 1]
      let right = c < result[r].length - 1 && result[r][c + 1]
      
      let across = !left && right
      let down = !top && bottom

      if (across || down) {
        labels[r][c] = label++;
      } else {
        labels[r][c] = null;
      }
    }
  }

  return labels;
}
