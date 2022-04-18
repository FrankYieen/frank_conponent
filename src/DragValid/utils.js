export const RandomNumBoth = (min, max, width) => {
  const scopeErrorStr = 'scope is error';
  if (min > max) throw new Error(`${scopeErrorStr};Min is bigger than the Max!`);
  if (min < 0) throw new Error(`${scopeErrorStr};Min is smaller than the 0!`);
  if (max > 1) throw new Error(`${scopeErrorStr};Max is bigger than the 1!`);

  const Range = max * width - min * width;
  const Rand = Math.random();
  const num = min * width + Math.round(Rand * Range); //四舍五入
  return num;
};
