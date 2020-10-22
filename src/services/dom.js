const el = (selector) => {
  return document.querySelector(selector);
};

const all = (selector) => {
  const query = document.querySelectorAll(selector);
  return query && query.length ? [...query] : null;
};

export default {
  html: document.documentElement,
  body: document.body,
  el,
  all,
};
