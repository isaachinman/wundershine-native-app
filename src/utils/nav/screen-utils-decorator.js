/* eslint-disable max-len */

export default (() => WrappedComponent =>
  class extends WrappedComponent {
    constructor(props) {
      super(props)

      // Add `static screenTitle` functionality
      if (WrappedComponent.screenTitle) {
        props.navigator.setTitle({
          title: WrappedComponent.screenTitle,
        })
      }
    }
  })()
