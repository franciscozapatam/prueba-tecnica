function mapperAttributes(item) {
  const newItem = {...item}
  switch (newItem.element.split(':')[0]) {
    case'input':
      newItem.placeholder = item.text;
      break;
    case 'button':
      newItem.innerText = item.text;
      break;
  }
  return newItem
}


function createNode(item){
  const [element, type] = item.element.split(':')
  item = mapperAttributes(item)
  return `<${element}\n` +
    `${type ? `type="${type}"\n` : ''}` +
    `${item.id ? `id="${item.id}"\n` : ''}` +
    `${item.name ? `name="${item.name}"\n` : ''}` +
    `${item.placeholder ? `placeholder="${item.placeholder}"\n` : ''}`+
    `${item.class ? `class="${item.class}"\n` : ''}>`+
    `${item.innerText ? (item.innerText+'\n') : ''}`+
    `${element !== 'input' ? `</${element}>` : ''}`

}

module.exports = createNode
