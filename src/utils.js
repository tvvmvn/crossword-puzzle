
class Cell {
  constructor(r, c, label, dir, value, correct) {
    this.id = 'cell-' + r + c
    this.r = r;
    this.c = c;
    this.label = label;
    this.dir = dir;
    this.value = value;
    this.correct = correct;
  }
}

export function isPassed(board) {
  for (let r = 0; r < board.length; r++) {
    for (let c = 0; c < board[r].length; c++) {
      let cell = board[r][c];
      
      if (cell && cell.value != cell.correct) {
        return false;
      }
    }
  }

  return true;
}

export function initBoard(result) {
  
  let labels = []
  let n = 1;
  let up, down, left, right;
  
  for (let r = 0; r < result.length; r++) {
    labels[r] = []
    for (let c = 0; c < result[r].length; c++) {
      
      labels[r][c] = null;
      up = down = left = right = false;
  
      // up
      if (r > 0 && result[r - 1][c]) {
        up = true
      }
  
      // down
      if (r < result.length - 1 && result[r + 1][c]) {
        down = true
      }
  
      // left
      if (c > 0 && result[r][c - 1]) {
        left = true
      }
      
      // right
      if (c < result[r].length - 1 && result[r][c + 1]) {
        right = true
      }
  
      if (result[r][c]) {
        // both
        if (!left && right && !up && down) {
          labels[r][c] = new Cell(r, c, n++, 2, '', result[r][c])
        // horizontal 
        } else if (!left && right) {
          labels[r][c] = new Cell(r, c, n++, 0, '', result[r][c])
        // vertical
        } else if (!up && down) {
          labels[r][c] = new Cell(r, c, n++, 1, '', result[r][c])
        } else {
          labels[r][c] = new Cell(r, c, null, null, '', result[r][c]) 
        }
      } 
    }
  }
  
  return labels;
}