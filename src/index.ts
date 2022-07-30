import './style.css';
import { renderPage } from './components/page';
import { createCar } from './services/api';
import { renderGarage, updateGarage } from './components/garage';

renderPage();


(function () {
  const createForm = document.getElementById('form__create') as HTMLFormElement;

  createForm.addEventListener('submit', async event => {
    event.preventDefault();
  
    const garage = document.querySelector('main__garage') as HTMLDivElement;
    const nameInput = document.getElementById('input__create-name') as HTMLInputElement;
    const colorInput = document.getElementById(
      'input__create-color',
    ) as HTMLInputElement;
  
    const car = { name: nameInput.value, color: colorInput.value };
  
    await createCar(car);
    await updateGarage();
  
    garage.innerHTML = renderGarage();
    nameInput.value = '';
    colorInput.value = '';
  });
}());


