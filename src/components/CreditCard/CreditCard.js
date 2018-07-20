import React from 'react'
import PropTypes from 'prop-types'

import { Image, Text, TouchableOpacity, View } from 'react-native'

import { blackSecondary, green } from 'styles/colours'
import { material } from 'react-native-typography'

// CC Images
import amexImage from 'images/cc/amex.png'
import dinersImage from 'images/cc/diners.png'
import discoverImage from 'images/cc/discover.png'
import jcbImage from 'images/cc/jcb.png'
import mastercardImage from 'images/cc/mastercard.png'
import unionpayImage from 'images/cc/unionpay.png'
import visaImage from 'images/cc/visa.png'

const styles = {
  cardContainer: {
    flex: 0,
    padding: 10,
    marginBottom: 5,
    backgroundColor: 'rgba(0,0,0,0.03)',
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionContainer: {
    flexDirection: 'row',
  },
  last4: {
    ...material.body2Object,
    color: blackSecondary,
    flex: 0,
    fontSize: 14,
  },
  ccImage: {
    flex: 0,
    width: 50,
    height: 30,
    marginRight: 15,
  },
  actionText: {
    flex: 0,
    fontSize: 14,
    marginRight: 10,
    paddingVertical: 10,
    paddingRight: 20,
    color: green,
  },
}

export default class CreditCard extends React.Component {
  render() {

    const {
      brand,
      deleteAction,
      editAction,
      last4,
    } = this.props

    let ccImage = null
    switch (brand) {
      case 'American Express':
        ccImage = amexImage
        break
      case 'Diners Club':
        ccImage = dinersImage
        break
      case 'Discover':
        ccImage = discoverImage
        break
      case 'JCB':
        ccImage = jcbImage
        break
      case 'MasterCard':
        ccImage = mastercardImage
        break
      case 'UnionPay':
        ccImage = unionpayImage
        break
      case 'Visa':
        ccImage = visaImage
        break
      default:
        break
    }

    return (
      <View>
        <View style={styles.cardContainer}>
          <Image
            source={ccImage}
            style={styles.ccImage}
          />
          <Text
            style={styles.last4}
          >
            •••• •••• •••• {last4}
          </Text>
        </View>
        <View style={styles.actionContainer}>
          <TouchableOpacity onPress={editAction}>
            <Text
              style={styles.actionText}
            >
              Edit
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={deleteAction}>
            <Text
              style={styles.actionText}
            >
              Delete
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

CreditCard.propTypes = {
  brand: PropTypes.string.isRequired,
  deleteAction: PropTypes.func.isRequired,
  editAction: PropTypes.func.isRequired,
  last4: PropTypes.string.isRequired,
}
