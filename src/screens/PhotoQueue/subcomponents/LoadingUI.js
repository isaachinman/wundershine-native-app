/* eslint-disable react/no-multi-comp */

import React from 'react'

import LinearGradient from 'react-native-linear-gradient'
import { PlaceholderContainer, Placeholder } from 'react-native-loading-placeholder'
import { View } from 'react-native'

const styles = {
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    marginVertical: 20,
    marginHorizontal: 35,
  },
  placeholderContainer: {
    width: '90%',
    backgroundColor: '#fff',
    height: 160,
    paddingTop: 10,
    marginBottom: 20,
  },
  placeholder: {
    height: 8,
    marginTop: 6,
    marginLeft: 15,
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
        {[1, 2].map(id => (
          <PlaceholderContainer
            style={styles.placeholderContainer}
            animatedComponent={<Gradient />}
            duration={600}
            delay={200}
            key={`loading-ui-placeholder-${id}`}
          >
            <View style={{ flexDirection: 'row' }}>
              <Placeholder style={[styles.placeholder, { width: 50, height: 50 }]} />
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
                    styles.placeholder,
                    {
                      width: '50%',
                      height: 10,
                    },
                  ]}
                />
                <Placeholder
                  style={[
                    styles.placeholder,
                    {
                      width: '35%',
                      height: 7,
                    },
                  ]}
                />
              </View>
            </View>

            <Placeholder
              style={[styles.placeholder, { marginTop: 20, width: '80%' }]}
            />
            <Placeholder style={[styles.placeholder, { width: '90%' }]} />
            <Placeholder style={[styles.placeholder, { width: '50%' }]} />
          </PlaceholderContainer>
        ))}
      </View>
    )
  }

}
