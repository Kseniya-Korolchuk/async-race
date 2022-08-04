import { driveStatus, startEngine, stopEngine } from '../services/api';
import store from '../services/store';
import { animation, getDistance } from './animation';
import elements from './elements';
import { DrivingStatus, Engine } from './types';

export const start = async (id: number): Promise<DrivingStatus> => {
    const startBtn = elements.getStartBtn(id);
    startBtn.classList.toggle('enabling', true);
    startBtn.disabled = true;

    const stopBtn = elements.getStopBtn(id);
    startBtn.classList.toggle('enabling', false);
    stopBtn.disabled = false;

    const { velocity, distance }: Engine = await startEngine(id);
    const time = Math.round(distance / velocity);

    const car = elements.getCarElem(id);
    const finish = elements.getFinishElem(id);
    const distanceBtwElem = Math.floor(getDistance(car, finish)) + 100;

    store.animation[id] = animation(car, distanceBtwElem, time);

    const { success } = await driveStatus(id);
    if (!success) window.cancelAnimationFrame(store.animation[id].id);

    return { success, id, time };
};

export const stop = async (id: number): Promise<void> => {
    const stopBtn = elements.getStopBtn(id);
    stopBtn.disabled = true;
    stopBtn.classList.toggle('enabling', true);

    await stopEngine(id);

    stopBtn.classList.toggle('enabling', false);

    const startBtn = elements.getStartBtn(id);
    startBtn.disabled = false;

    const car = elements.getCarElem(id);
    car.style.transform = 'translateX(0) translateY(0px)';
    if (store.animation[id]) window.cancelAnimationFrame(store.animation[id].id);
};
