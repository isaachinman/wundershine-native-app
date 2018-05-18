/*

  GraphQL just for the sake of it is absolutely the worst
  thing to happen to developer productivity. The engineers
  at Shopify are terrible people.

*/

import axios from 'axios'
import { Base64 } from 'js-base64'
import config from 'config'

import CoreDataStore from 'stores/CoreDataStore'

export default async (user, cart) => {

  if (config.isTesting) {
    return 'https://wundershine.myshopify.com/admin/products'
  }

  const lineItems = cart.items.map(item => ({
    variantId: Base64.encode(CoreDataStore.products[item.sku].shopifyData.admin_graphql_api_id),
    quantity: item.quantity,
  }))

  const res = await axios({
    method: 'POST',
    url: config.SHOPIFY_STOREFRONT_API_URL,
    headers: {
      'X-Shopify-Storefront-Access-Token': config.SHOPIFY_STOREFRONT_API_ACCESS_TOKEN,
    },
    data: {
      query: `mutation {
                checkoutCreate(input: {
                  email: "${user.email}"
                  lineItems: ${(JSON.stringify(lineItems)).replace(/"([^(")"]+)":/g, '$1:')}
                }) {
                  checkout {
                    id
                    webUrl
                    lineItems(first: 5) {
                      edges {
                        node {
                          title
                          quantity
                        }
                      }
                    }
                  }
                }
              }`,
    },
  })

  if (res.data && res.data.data && res.data.data.checkoutCreate &&
    res.data.data.checkoutCreate.checkout) {
    return res.data.data.checkoutCreate.checkout
  } else if (res.data.errors) {
    throw new Error(res.data.errors[0].message)
  }

  throw new Error('Shopify checkout creation failed unexpectedly.')

}
