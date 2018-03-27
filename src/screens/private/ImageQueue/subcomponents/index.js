import * as components from './*.js'

Object.keys(components).forEach((component) => {
  if (!component.includes('index')) {
    module.exports[component] = components[component]
  }
})
