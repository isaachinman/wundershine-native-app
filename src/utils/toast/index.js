import stores from 'stores'

export default (options) => {

  const transformedOptions = Object.assign({}, options)

  if (typeof options.autoDismiss === 'undefined') {
    transformedOptions.autoDismiss = true
  }

  if (typeof options.type === 'undefined') {
    transformedOptions.type = 'normal'
  }

  stores.ui.triggerToast(transformedOptions)

}
