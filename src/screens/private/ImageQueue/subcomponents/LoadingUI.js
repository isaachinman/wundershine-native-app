import React from 'react'

import { Placeholder } from 'react-native-loading-placeholder'
import { View } from 'react-native'

import { greyAccent, whitePrimary } from 'styles/colours'

import { QUEUE_ITEM_HEIGHT, QUEUE_IMAGE_DIMENSION } from '../constants'

const styles = {
  placeholderContainer: {
    backgroundColor: whitePrimary,
    height: QUEUE_ITEM_HEIGHT + 1,
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  placeholder: {
    height: 8,
    marginTop: 6,
    alignSelf: 'flex-start',
    justifyContent: 'center',
    backgroundColor: greyAccent,
  },
  imagePlaceholder: {
    width: QUEUE_IMAGE_DIMENSION,
    height: QUEUE_IMAGE_DIMENSION,
    alignSelf: 'flex-start',
    justifyContent: 'center',
    backgroundColor: greyAccent,
    marginRight: 15,
  },
  textPlaceholder: {
    height: 8,
    marginTop: 6,
    alignSelf: 'flex-start',
    justifyContent: 'center',
    backgroundColor: greyAccent,
  },
  row: {
    flexDirection: 'row',
    width: '100%',
  },
}

export default class LoadingUI extends React.PureComponent {

  render() {
    return (
      <React.Fragment>
        {[1, 2, 3].map(n => (
          <View
            key={`loading-ui-placeholder-${n}`}
            style={styles.placeholderContainer}
          >
            <View style={{ flexDirection: 'row' }}>
              <Placeholder style={styles.imagePlaceholder} />
              <View
                style={{
                  flexDirection: 'column',
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Placeholder
                  style={[
                    styles.textPlaceholder,
                    {
                      width: '50%',
                      height: 10,
                    },
                  ]}
                />
                <Placeholder
                  style={[
                    styles.textPlaceholder,
                    {
                      width: '35%',
                      height: 7,
                    },
                  ]}
                />
                <Placeholder
                  style={[styles.textPlaceholder, { marginTop: 20, width: '80%' }]}
                />
                <Placeholder style={[styles.textPlaceholder, { width: '95%' }]} />
                <Placeholder style={[styles.textPlaceholder, { width: '50%' }]} />
              </View>
            </View>
          </View>
        ))}
      </React.Fragment>
    )
  }

}
