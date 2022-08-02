import { getCars } from '../../services/api';
import store from '../../services/store';
import { renderCar } from '../car';

export const renderGarage = (): string => `
<h2>Garage (${store.carsCount} cars)</h2>
<h3>Page #${store.carsPage}</h3>
<ul class="main__cars-list">
  ${store.cars.map((car) => `<li>${renderCar(car)}</li>`).join('')}
</ul>
`;

export const updateGarage = async (): Promise<void> => {
    const { items, count } = await getCars(store.carsPage);
    store.cars = items;
    store.carsCount = count;

    const NEXT_BTN = document.getElementById('button_next') as HTMLButtonElement;
    NEXT_BTN.disabled = store.carsPage * 7 >= Number(store.carsCount);

    const PREV_BTN = document.getElementById('button_prev') as HTMLButtonElement;
    PREV_BTN.disabled = store.carsPage <= 1;
};

/* (function () {
  const root = document.querySelector('#root') as HTMLBodyElement;

  root.addEventListener('click', async event => {
    const target = <HTMLElement>event.target;
  
    if (target.classList.contains('start-engine-btn')) {
      const id = Number(target.id.split('start-engine-car-')[1]);
      startDriving(id);
    }
  
    if (target.classList.contains('stop-engine-btn')) {
      const id = Number(target.id.split('stop-engine-car-')[1]);
      stopDriving(id);
    }
  });
  
}()); */
