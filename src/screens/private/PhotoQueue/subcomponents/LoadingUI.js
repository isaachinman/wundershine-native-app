/* eslint-disable react/no-multi-comp */

import React from 'react'

import LinearGradient from 'react-native-linear-gradient'
import { PlaceholderContainer, Placeholder } from 'react-native-loading-placeholder'
import { View } from 'react-native'

import { greyAccent } from 'styles/colours'

const styles = {
  placeholderContainer: {
    backgroundColor: '#fff',
    height: 131,
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: greyAccent,
  },
  placeholder: {
    height: 8,
    marginTop: 6,
    alignSelf: 'flex-start',
    justifyContent: 'center',
    backgroundColor: '#eeeeee',
  },
  imagePlaceholder: {
    width: 100,
    height: 100,
    alignSelf: 'flex-start',
    justifyContent: 'center',
    backgroundColor: '#eeeeee',
    marginRight: 15,
  },
  textPlaceholder: {
    height: 8,
    marginTop: 6,
    alignSelf: 'flex-start',
    justifyContent: 'center',
    backgroundColor: '#eeeeee',
  },
  row: {
    flexDirection: 'row',
    width: '100%',
  },
}

class Gradient extends React.PureComponent {
  render() {
    return (
      <LinearGradient
        colors={['#eeeeee', '#dddddd', '#eeeeee']}
        start={{ x: 1.0, y: 0.0 }}
        end={{ x: 0.0, y: 0.0 }}
        style={{
          flex: 1,
          width: 120,
        }}
      />
    )
  }
}

export default class LoadingUI extends React.PureComponent {

  render() {
    return (
      <View style={styles.container}>
        {[1, 2].map(n => (
          <PlaceholderContainer
            style={styles.placeholderContainer}
            animatedComponent={<Gradient />}
            duration={600}
            delay={200}
            key={`loading-ui-placeholder-${n}`}
          >
            <View style={{ flexDirection: 'row' }}>
              <Placeholder style={styles.imagePlaceholder} />
              <View
                style={{
                  flexDirection: 'column',
                  width: '100%',
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
                <Placeholder style={[styles.textPlaceholder, { width: '90%' }]} />
                <Placeholder style={[styles.textPlaceholder, { width: '50%' }]} />
              </View>
            </View>

          </PlaceholderContainer>
        ))}
      </View>
    )
  }

}
