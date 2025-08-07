export function initCells(result) {

  let board = [];

  for (let r = 0; r < result.length; r++) {
    board[r] = []
    for (let c = 0; c < result[r].length; c++) {
      if (result[r][c]) {
        board[r][c] = { 
          id: 'c' + r + c, 
          crds: [r, c],
          label: null, 
          space: [0, 0],
          value: '',
          correct: result[r][c],
          isCorrect: function () {
            return this.value == this.correct;
          },
          active: false,
        }
      } else {
        board[r][c] = null;
      }
    }
  }

  let label = 1;
  
  for (let r = 0; r < board.length; r++) {
    for (let c = 0; c < board[r].length; c++) {

      if (!board[r][c]) continue;

      let up = r > 0 && board[r - 1][c]
      let down = r < board.length - 1 && board[r + 1][c]
      let left = c > 0 && board[r][c - 1]
      let right = c < board[r].length - 1 && board[r][c + 1]
      
      let x = !left && right
      let y = !up && down

      if (x || y) {
        let dir;
        
        if (x) {
          dir = 0;
          let i = c;
          while(i < board[r].length && board[r][i] != null) {
            board[r][i++].space[0] = label;
          }
        }
    
        if (y) {
          dir = 1;
          let i = r;
          while(i < board.length && board[i][c] != null) {
            board[i++][c].space[1] = label;
          }
        }

        board[r][c].label = label++;
      } 
    }
  }

  let cells = []

  for (let r = 0; r < board.length; r++) {
    for (let c = 0; c < board[r].length; c++) {
      if (board[r][c]) {
        cells.push(board[r][c])
      }
    }
  }

  return cells
}