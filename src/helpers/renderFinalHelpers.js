// CONSTANTS
const MIN_DRAWTIME = 2000; // time in ms

const draw = (ctx, strokeData) => {
  const { _x, _y, color, lineSize } = strokeData;
  
  ctx.lineCap = 'round';
  ctx.strokeStyle = color;
  ctx.lineWidth = lineSize;
  ctx.lineTo(_x, _y);
  ctx.stroke();
}

const renderQuad_1 = (ctx, coordinates) => {
  let delay = 0; // for replay feature

  coordinates.forEach(coordinate => {
    const { x, y, color, lineSize } = coordinate;

    // CHANGE SCREEN RATIO HERE
    const _x = (x * 0.5) * window.innerWidth;
    const _y = (y * 0.5) * window.innerHeight;

    const strokeData = {
      _x, _y, color, lineSize
    };
    
    delay += (MIN_DRAWTIME / coordinates.length) + 3;
    setTimeout(() => {
      ctx.beginPath();
      draw(ctx, strokeData);
    }, delay);
  })
};

const renderQuad_2 = (ctx, coordinates) => {

};

const renderQuad_3 = (ctx, coordinates) => {

};

const renderQuad_4 = (ctx, coordinates) => {

};



const renderQuadrants = (ctx, finalCoordinates) => {
  // loop through each quad
  const quadrants = Object.keys(finalCoordinates);

  // console.log('THIS SHOULD ONYL 1')
  // console.log(finalCoordinates)
  // console.log(quadrants)
  quadrants.forEach(quadrant => {
    const coordinates = finalCoordinates[quadrant];

    if(quadrant === 'quadrant_1') {
      renderQuad_1(ctx, coordinates);
    } else if(quadrant === 'quadrant_2') {
      
    
    } else if(quadrant === 'quadrant_3') {

    
    } else if(quadrant === 'quadrant_4') {

    }
  })

}
const renderFinalHelpers = {
  renderQuadrants
};

export default renderFinalHelpers;