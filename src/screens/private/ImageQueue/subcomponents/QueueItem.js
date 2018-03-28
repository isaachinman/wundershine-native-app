import React from 'react'
import PropTypes from 'prop-types'

import { ActivityIndicator, Text, View } from 'react-native'
import { AnimatedImage, ListItem } from 'react-native-ui-lib'

import { greyAccent, whiteSecondary } from 'styles/colours'
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
  loadingImageOverlay: {
    width: 100,
    height: 100,
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.4)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageTitle: {
    ...material.titleObject,
    fontSize: 16,
    lineHeight: 20,
    marginBottom: 10,
  },
  importText: {
    ...material.captionObject,
    fontStyle: 'italic',
  },
}

export default class QueueItem extends React.Component {

  render() {

    const {
      name,
      notUploadedYet,
      origin,
      uri,
    } = this.props

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
            imageSource={{ uri }}
            loader={<ActivityIndicator color={whiteSecondary} />}
            animationDuration={200}
          />
          {notUploadedYet &&
            <View style={styles.loadingImageOverlay}>
              <ActivityIndicator color={whiteSecondary} />
            </View>
          }
        </ListItem.Part>
        <ListItem.Part middle column containerStyle={styles.textContainer}>
          <Text style={styles.imageTitle}>{name}</Text>
          {notUploadedYet ?
            <Text style={styles.importText}>Import in progress...</Text>
            :
            <Text style={material.caption}>{origin || 'Unknown'}</Text>
          }
        </ListItem.Part>
      </ListItem>
    )
  }
}

QueueItem.defaultProps = {
  notUploadedYet: false,
}

QueueItem.propTypes = {
  name: PropTypes.string.isRequired,
  notUploadedYet: PropTypes.bool,
  origin: PropTypes.string.isRequired,
  uri: PropTypes.string.isRequired,
}
