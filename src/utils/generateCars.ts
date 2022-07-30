import { SimpleCar } from './types';

const hex = '0123456789abcdef';
const brands = [
  'Ford',
  'Tesla',
  'Audi',
  'Peugeot',
  'Alfa-Romeo',
  'Volkswagen',
  'Honda',
  'BMW',
  'Volvo',
  'Toyota',
];
const models = [
  'Mustang',
  'Model S',
  'Q7',
  '3008',
  'GTV6',
  'Golf GTI',
  'CV-R',
  'x1',
  'XC90',
  'Venza',
];

const getRandomName = () => {
  const brand = brands[Math.floor(Math.random() * brands.length)];
  const model = models[Math.floor(Math.random() * models.length)];

  return `${brand} ${model}`;
};

const getRandomColor = () => {
  let color = '#';

  for (let i = 0; i < 6; i += 1) {
    color += hex[Math.floor(Math.random() * 16)];
  }

  return color;
};

export const generateCars = (count = 100): Array<SimpleCar> =>
  new Array(count)
    .fill(1)
    .map(() => ({ name: getRandomName(), color: getRandomColor() }));