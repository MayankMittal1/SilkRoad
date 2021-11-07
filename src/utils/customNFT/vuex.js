export const set = (property) => (state, payload) => (state[property] = payload);

export const toggle = (property) => (state) => (state[property] = !state[property]);

export const arrayToggle = (property) => (state, item) => {
  const array = JSON.parse(JSON.stringify(state[property]));
  const itemIndex = array.indexOf(item);
  if (itemIndex === -1) {
    array.push(item);
  } else {
    array.splice(itemIndex, 1);
  }
  state[property] = array;
};
