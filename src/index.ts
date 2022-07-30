import './style.css';
import { renderPage } from './components/page';
import { createCar, getCar, updateCar } from './services/api';
import { renderGarage, updateGarage } from './components/garage';
import elements from './utils/elements';


let selectedCar: { name: string; color: string; id: number };

renderPage();
await updateGarage();

const onSelectBtnClick = async (target: HTMLElement) => {
  const newName = document.getElementById('input__update-name') as HTMLInputElement;
  const newColor = document.getElementById(
    'input__update-color',
  ) as HTMLInputElement;
  const updateBtn = document.getElementById('button_update') as HTMLButtonElement;

  selectedCar = await getCar(Number(target.id.split('button_select-')[1]));

  newName.value = selectedCar.name;
  newName.disabled = false;

  newColor.value = selectedCar.color;
  newColor.disabled = false;

  updateBtn.disabled = false;
  await updateGarage();
  renderPage();
};

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


(function () {
  const updateForm = document.getElementById('form__update') as HTMLFormElement;

  updateForm.addEventListener('submit', async event => {
    event.preventDefault();
  
    const updateBtn = document.getElementById('button_update') as HTMLButtonElement;
    const garage = document.querySelector('main__garage') as HTMLDivElement;
    const nameInput = document.getElementById('input__update-name') as HTMLInputElement;
    const colorInput = document.getElementById(
      'input__update-color',
    ) as HTMLInputElement;
  
    const car = { name: nameInput.value, color: colorInput.value };
  
    await updateCar(selectedCar.id, car);
    await updateGarage();
  
    garage.innerHTML = renderGarage();
    nameInput.value = '';
    updateBtn.disabled = true;
    nameInput.disabled = true;
    colorInput.disabled = true;
    colorInput.value = '';
  });
}());

elements.body.addEventListener('click', async event => {
  const target = <HTMLElement>event.target;

  if (target.classList.contains('button_select')) {
    onSelectBtnClick(target);
  }
});
