const drawText = (ctx: CanvasRenderingContext2D, x: number, y: number, option: any) => {
  ctx.save();

  ctx.font = option.labelFont || '12px Arial';
  ctx.fillStyle = option.labelColor;
  ctx.textAlign = option.labelAlign;
  ctx.fillText(`${option.label}`, x, y);

  ctx.restore();
};

export default drawText;
