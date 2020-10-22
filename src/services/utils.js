import $config from "./config";
import $dom from "./dom";

export const applyDrag = (arr, dragResult) => {
  const { removedIndex, addedIndex, payload } = dragResult;
  if (removedIndex === null && addedIndex === null) return arr;

  const result = [...arr];
  let itemToAdd = payload;

  if (removedIndex !== null) {
    itemToAdd = result.splice(removedIndex, 1)[0];
  }

  if (addedIndex !== null) {
    result.splice(addedIndex, 0, itemToAdd);
  }

  return result;
};

const checkIfDragging = () => {
  return $dom.body.classList.contains($config.isDraggingClass);
};

export const isDragging = checkIfDragging();
