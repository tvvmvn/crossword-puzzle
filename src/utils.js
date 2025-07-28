export function isFullfilled(input) {

  for (let r = 0; r < 5; r++) {
    for (let c = 0; c < 5; c++) {
      if (input[r][c] != null) {
        if (input[r][c] == '') {
          return false
        }
      }
    }
  }

  return true
}

export function isError(error) {

  for (let r = 0; r < 5; r++) {
    for (let c = 0; c < 5; c++) {
      if (error[r][c] == true) {
        return true;
      }
    }
  }

  return false;
}

export function generateInitialError(result) {
  
  const initialError = result.map(row => {
    return row.map(val => {
      if (val != null) {
        return false
      }
      return null;
    })
  })

  return initialError;
}

export function generateInitialInput(result) {
  
  const initialInput = result.map(row => {
    return row.map(val => {
      if (val != null) {
        return '';
      }
      return null;
    })
  })

  return initialInput;
}

export function generateLabels(result) {

  let i = 1;
  let right, down;
  let labels = []

  for (let r = 0; r < result.length; r++) {
    
    labels[r] = []
    
    for (let c = 0; c < result[r].length; c++) {
      
      right = down = false

      // right
      if (c < result[r].length - 1) {
        if (result[r][c] != null && result[r][c + 1] != null) {
          if (c == 0 || result[r][c - 1] == null) {
            right = true
          }
        }
      }

      // down
      if (r < result.length - 1) {
        if (result[r][c] != null && result[r + 1][c] != null) {
          if (r == 0 || result[r - 1][c] == null) {
            down = true
          }
        }
      }

      if (right || down) {
        labels[r][c] = i++
      } else {
        labels[r][c] = null
      }
    }
  }

  return labels;
}