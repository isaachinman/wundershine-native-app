import * as components from './*/*.js'

Object.keys(components).forEach((component) => {
  const componentName = component.split('$')[1]
  if (!componentName.includes('Styles')) {
    module.exports[componentName] = components[component]
  }
})
