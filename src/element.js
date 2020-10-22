const get = (selector) => {
  return document.querySelector(selector);
};

// const getAll = (selector) => {
//   const query = document.querySelectorAll(selector);
//   return query && query.length ? [...query] : null;
// };

export default get;
