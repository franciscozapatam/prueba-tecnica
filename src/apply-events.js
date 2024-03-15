export function applyEvents(node, events) {
  if (events === undefined) return;
  for (let eventType in events) {
    const eventConfig = events[eventType];
    node.addEventListener(eventType, function () {
      const values = [];

      eventConfig.values.forEach(function (id) {
        const inputNode = document.getElementById(id);
        if (inputNode) {
          values.push(inputNode.value);
        } else {
          console.warn(`No se pudo encontrar el nodo con ID: ${id}`);
        }
      });
      const event = new CustomEvent(eventConfig.eventName, { detail: values });
      window.dispatchEvent(event);
    });
  }
}
