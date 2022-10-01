export const rand = (range) => range ? Math.round(Math.random() * range) : Math.random();

const coordinates = ['y', 'x', 'z']
export const randCoordinate = () => coordinates[Math.floor(rand(3))];

export const range = [-1, 1];

export const randNegPos = () => rand() * range[rand(1)];
