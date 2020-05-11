const onMouseDownHandler = (e, state, setState) => {
  const drawing = true;

  setState({...state,
    drawing
  });
};


const onMouseUpHandler = (e, state, setState) => {
  const drawing = false;

  setState({...state,
    drawing
  });
};


const onMouseMoveHandler = (e, state, setState) => {
  const { coordinates, drawing, currentColor, currentLineSize } = state;

  if(drawing) {
    const maxWidth = e.target.offsetWidth;
    const maxHeight = e.target.offsetHeight;
    let x = e.clientX;
    let y = e.clientY;
  
    // percentage relative to screen
    // x = x / maxWidth;
    // y = y / maxHeight;
    const color = currentColor;
    const lineSize = currentLineSize;


    const coordinate = {
      x,
      y,
      color,
      lineSize
    }
  
    setState({...state, coordinates: [...coordinates, coordinate]}); 
  }

};


const draw = (ctx, coordinate) => {
  const { x, y, color, lineSize } = coordinate;
  console.log('drawing...',x,y);
  
  // const new_x = x * window.innerWidth;
  // const new_y = y * window.innerHeight;

  ctx.strokeStyle = color;
  ctx.lineWidth = lineSize;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.lineTo(x, y);
  ctx.stroke();
};

const drawHelpers = {
  onMouseDownHandler,
  onMouseUpHandler,
  onMouseMoveHandler,
  draw
}

export default drawHelpers;