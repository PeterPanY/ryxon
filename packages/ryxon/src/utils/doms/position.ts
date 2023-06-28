export const getClientXY = (event: MouseEvent | TouchEvent) => {
  let clientX: number
  let clientY: number
  if (event.type === 'touchend') {
    // eslint-disable-next-line prefer-destructuring
    clientY = (event as TouchEvent).changedTouches[0].clientY
    // eslint-disable-next-line prefer-destructuring
    clientX = (event as TouchEvent).changedTouches[0].clientX
  } else if (event.type.startsWith('touch')) {
    // eslint-disable-next-line prefer-destructuring
    clientY = (event as TouchEvent).touches[0].clientY
    // eslint-disable-next-line prefer-destructuring
    clientX = (event as TouchEvent).touches[0].clientX
  } else {
    // eslint-disable-next-line prefer-destructuring
    clientY = (event as MouseEvent).clientY
    // eslint-disable-next-line prefer-destructuring
    clientX = (event as MouseEvent).clientX
  }
  return {
    clientX,
    clientY
  }
}
