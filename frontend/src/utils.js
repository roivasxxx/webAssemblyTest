export const alphabet = () => {
  let str = "";
  for (let i = 65; i <= 90; i++) {
    str += String.fromCharCode(`0${i}`).toLowerCase();
  }

  return str;
};
