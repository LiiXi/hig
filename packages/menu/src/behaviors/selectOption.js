/**
 * Returns an array of selected Option id(s)
 * @param {string} optionId - the Option's HTML id attribute
 * @param {Array} activeOptionsArray - the array of active options from MenuBehavior's state
 * @param {boolean} multiple - prop from the parent Menu or MenuGroup component
 * @returns {Array} Selected Option id(s)
 */
export default function selectOption(optionId, activeOptionsArray, multiple) {
  const selectedOptions = multiple ? activeOptionsArray : [];

  if (selectedOptions.indexOf(optionId) === -1) {
    selectedOptions.push(optionId);
  } else {
    selectedOptions.splice(selectedOptions.indexOf(optionId), 1);
  }

  return selectedOptions;
}
