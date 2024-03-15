const createNode = require( "./create-node");
function createTemplate(json) {
  const nodes = []
  const script =
    `<script>
       import {applyEvents} from './apply-events.js'
       import {applyValidations} from './apply-validations.js'
       let functions = ${JSON.stringify(json.functions)}
       let nodes = ${JSON.stringify(json.items)}
       for(let node of nodes){
         let htmlNode = document.getElementById(node.id)
         applyEvents(htmlNode,node.events)
         applyValidations(htmlNode,node.validations,functions)
       }
     </script>
    `
  for (let item of json.items) {
    nodes.push(createNode(item))
  }
  return nodes.join('\n').concat('\n').concat(script)
}

module.exports = createTemplate;