export function applyValidations(node, validations, validationFunctions) {
  if (validations === undefined) return;
  node.addEventListener("input", function () {
    node.classList.remove(validations.errorClass);
    node.classList.remove(validations.successClass);

    validations.fns.forEach((validationName) => {
      const validation = validationFunctions.find(
        (functions) => functions.name === validationName
      ).fn;
      const validationFunction = Function(`return ${validation}`)();
      if (!validationFunction(node.value)) {
        node.classList.add(validations.errorClass);
      }
    });
    if (!node.classList.contains(validations.errorClass)) {
      node.classList.add(validations.successClass);
    }
  });
}
