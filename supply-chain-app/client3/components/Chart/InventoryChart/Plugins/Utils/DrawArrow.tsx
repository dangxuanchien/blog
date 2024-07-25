export enum ArrowDirection {
  Up, Down, Left, Right,
}

const drawArrow = (ctx: CanvasRenderingContext2D, x: number, y: number, edge: number, direction: ArrowDirection) => {
  ctx.save();
  const arrowH = edge * Math.cos(Math.PI / 6);
  const arrowHalfW = edge / 2;

  ctx.translate(x, y);
  switch (direction) {
    case ArrowDirection.Left:
      ctx.rotate(-(Math.PI / 2));
      break;
    case ArrowDirection.Right:
      ctx.rotate(Math.PI / 2);
      break;
    case ArrowDirection.Down:
      ctx.rotate(Math.PI);
      break;
    default: // UP
  }
  ctx.translate(-x, -y);

  ctx.beginPath();
  ctx.moveTo(x, y - arrowH);
  ctx.lineTo(x - arrowHalfW, y);
  ctx.lineTo(x + arrowHalfW, y);
  ctx.fill();
  ctx.restore();
};

export default drawArrow;
