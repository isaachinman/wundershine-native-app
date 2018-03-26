import React from 'react'

import { ActivityIndicator, Text } from 'react-native'
import { AnimatedImage, ListItem } from 'react-native-ui-lib'

import { greyAccent } from 'styles/colours'
import { material } from 'react-native-typography'

const styles = {
  container: {
    padding: 15,
    minHeight: 130,
    borderBottomWidth: 1,
    borderBottomColor: greyAccent,
  },
  textContainer: {
    paddingHorizontal: 15,
    maxWidth: 180,
  },
  imageTitle: {
    ...material.titleObject,
    fontSize: 16,
    lineHeight: 20,
    marginBottom: 10,
  },
}

export default class QueueItem extends React.Component {

  render() {
    return (
      <ListItem
        activeBackgroundColor={greyAccent}
        height={100}
        onPress={() => { }}
        containerStyle={styles.container}
      >
        <ListItem.Part left>
          <AnimatedImage
            containerStyle={{ width: 100, height: 100, backgroundColor: greyAccent }}
            imageStyle={{ resizeMode: 'cover', height: 100 }}
            imageSource={{ uri: 'https://static.pexels.com/photos/50721/pencils-crayons-colourful-rainbow-50721.jpeg' }}
            loader={<ActivityIndicator />}
            animationDuration={200}
          />
        </ListItem.Part>
        <ListItem.Part middle column containerStyle={styles.textContainer}>
          <Text style={styles.imageTitle}>IMG_20162203_18818.jpg</Text>
          <Text style={material.caption}>Sony RX1</Text>
        </ListItem.Part>
      </ListItem>
    )
  }
}
