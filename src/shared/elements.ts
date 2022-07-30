export default {
  body : document.querySelector('body') as HTMLBodyElement,
  getCarElem : (id: number): HTMLElement => document .getElementById(`car-${id}`) as HTMLElement,
  getFinishElem : (id: number): HTMLElement => document.getElementById(`finish-${id}`) as HTMLElement,
  getStartBtn : (id: number): HTMLButtonElement =>
    document.getElementById(`button_start-${id}`) as HTMLButtonElement,
  getStopBtn : (id: number): HTMLButtonElement =>
    document.getElementById(`button_stop-${id}`) as HTMLButtonElement,
};